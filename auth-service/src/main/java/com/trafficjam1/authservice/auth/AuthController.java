package com.trafficjam1.authservice.auth;

import com.trafficjam1.authservice.security.JwtService;
import com.trafficjam1.authservice.user.User;
import com.trafficjam1.authservice.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.trafficjam1.authservice.mail.MailService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService,
                          AuthenticationManager authenticationManager,
                          MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.mailService = mailService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        log.debug("Signup request received for username={} email={} city={}", request.getUsername(), request.getEmail(), request.getCity());
        if (isBlank(request.getFirstName()) || isBlank(request.getLastName()) ||
                isBlank(request.getUsername()) || isBlank(request.getEmail()) ||
                isBlank(request.getCity()) || isBlank(request.getPassword())) {
            log.warn("Signup validation failed: missing fields for username={} email={}", request.getUsername(), request.getEmail());
            return ResponseEntity.badRequest().body(error("All fields are required"));
        }
        if (!isValidEmail(request.getEmail())) {
            log.warn("Signup validation failed: invalid email format for email={}", request.getEmail());
            return ResponseEntity.badRequest().body(error("Invalid email format"));
        }
        if (!isValidPassword(request.getPassword())) {
            log.warn("Signup validation failed: weak password for username={} email={}", request.getUsername(), request.getEmail());
            return ResponseEntity.badRequest().body(error("Password must be at least 8 characters, contain one lowercase letter and one digit"));
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            log.warn("Signup validation failed: passwords do not match for username={} email={}", request.getUsername(), request.getEmail());
            return ResponseEntity.badRequest().body(error("Passwords do not match"));
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            log.warn("Signup validation failed: username already taken username={}", request.getUsername());
            return ResponseEntity.badRequest().body(error("Username is already taken"));
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Signup validation failed: email already registered email={}", request.getEmail());
            return ResponseEntity.badRequest().body(error("Email is already registered"));
        }
        try {
            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setCity(request.getCity());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            userRepository.save(user);

            log.info("Signup succeeded for userId={} username={} email={}", user.getId(), user.getUsername(), user.getEmail());
            Map<String, Object> claims = new HashMap<>();
            claims.put("uid", user.getId());
            claims.put("name", user.getFirstName() + " " + user.getLastName());
            String token = jwtService.generateToken(user.getUsername(), claims);
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception ex) {
            log.error("Signup failed for username={} email={} cause={}", request.getUsername(), request.getEmail(), ex.getMessage(), ex);
            return ResponseEntity.internalServerError().body(error("Registration failed"));
        }
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgot(@Valid @RequestBody ForgotRequest request) {
        String email = request.getEmail();
        log.debug("Forgot password request email={} sendEnabled={} exposeCode={}", email, mailService.isSendEnabled(), mailService.isExposeCode());
        if (isBlank(email) || !isValidEmail(email)) {
            return ResponseEntity.badRequest().body(error("Invalid email format"));
        }
        return userRepository.findByEmail(email)
                .map(user -> {
                    String code = String.format("%06d", (int) (Math.random() * 1_000_000));
                    user.setResetCode(code);
                    user.setResetCodeExpiresAt(java.time.Instant.now().plusSeconds(10 * 60));
                    userRepository.save(user);
                    boolean ok = mailService.sendVerificationCode(email, code);
                    if (ok) {
                        log.info("Sent verification code to email={}", email);
                        if (mailService.isExposeCode()) {
                            return ResponseEntity.ok(Map.of("message", "Verification code sent", "code", code));
                        }
                        return ResponseEntity.ok(Map.of("message", "Verification code sent"));
                    } else {
                        log.error("Failed to send email to {} cause={}", email, mailService.getLastError());
                        return ResponseEntity.internalServerError().body(error("Failed to send verification code"));
                    }
                })
                .orElseGet(() -> {
                    log.warn("Forgot password: email not found {}", email);
                    return ResponseEntity.badRequest().body(error("Email not found"));
                });
    }

    @PostMapping("/reset")
    public ResponseEntity<?> reset(@Valid @RequestBody ResetRequest request) {
        String email = request.getEmail();
        String code = request.getCode();
        log.debug("Reset password request email={}", email);
        if (isBlank(email) || !isValidEmail(email) || isBlank(code)) {
            return ResponseEntity.badRequest().body(error("Invalid request"));
        }
        return userRepository.findByEmail(email)
                .map(user -> {
                    if (user.getResetCode() == null || user.getResetCodeExpiresAt() == null) {
                        return ResponseEntity.badRequest().body(error("No reset request found"));
                    }
                    if (!code.equals(user.getResetCode())) {
                        return ResponseEntity.badRequest().body(error("Invalid verification code"));
                    }
                    if (java.time.Instant.now().isAfter(user.getResetCodeExpiresAt())) {
                        return ResponseEntity.badRequest().body(error("Verification code expired"));
                    }
                    if (!isValidPassword(request.getNewPassword())) {
                        return ResponseEntity.badRequest().body(error("Password must be at least 8 characters, contain one lowercase letter and one digit"));
                    }
                    if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                        return ResponseEntity.badRequest().body(error("Passwords do not match"));
                    }
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    user.setResetCode(null);
                    user.setResetCodeExpiresAt(null);
                    userRepository.save(user);
                    log.info("Password reset succeeded for email={}", email);
                    return ResponseEntity.ok(Map.of("message", "Password updated"));
                })
                .orElseGet(() -> ResponseEntity.badRequest().body(error("Email not found")));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        String principal = request.getUsernameOrEmail();
        log.debug("Login attempt principal={}", principal);
        if (isBlank(principal) || isBlank(request.getPassword())) {
            log.warn("Login validation failed: missing credentials principal={}", principal);
            return ResponseEntity.badRequest().body(error("Username/Email and password are required"));
        }
        if (principal.contains("@") && !isValidEmail(principal)) {
            log.warn("Login validation failed: invalid email format principal={}", principal);
            return ResponseEntity.badRequest().body(error("Invalid email format"));
        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(principal, request.getPassword())
            );
            String subject = authentication.getName();
            Map<String, Object> claims = new HashMap<>();
            claims.put("auth", "user");
            String token = jwtService.generateToken(subject, claims);
            log.info("Login succeeded principal={}", principal);
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (BadCredentialsException ex) {
            log.warn("Login failed: invalid credentials principal={}", principal);
            return ResponseEntity.status(401).body(error("Invalid credentials"));
        } catch (Exception ex) {
            log.error("Login failed: unexpected error principal={} cause={}", principal, ex.getMessage(), ex);
            return ResponseEntity.internalServerError().body(error("Login failed"));
        }
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    private boolean isValidEmail(String email) {
        String regex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        return Pattern.compile(regex).matcher(email).matches();
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) return false;
        boolean hasLower = password.chars().anyMatch(Character::isLowerCase);
        boolean hasDigit = password.chars().anyMatch(Character::isDigit);
        return hasLower && hasDigit;
    }

    private Map<String, String> error(String message) {
        Map<String, String> map = new HashMap<>();
        map.put("error", message);
        return map;
    }
}
