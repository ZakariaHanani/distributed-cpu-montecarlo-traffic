package com.trafficjam1.authservice.me;

import com.trafficjam1.authservice.security.JwtService;
import com.trafficjam1.authservice.user.ChangePasswordRequest;
import com.trafficjam1.authservice.user.Role;
import com.trafficjam1.authservice.user.UpdateMeRequest;
import com.trafficjam1.authservice.user.User;
import com.trafficjam1.authservice.user.UserMeResponse;
import com.trafficjam1.authservice.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/me")
public class MeController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public MeController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<?> getMe() {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        return ResponseEntity.ok(toMeResponse(user));
    }

    @PutMapping
    public ResponseEntity<?> updateMe(@Valid @RequestBody UpdateMeRequest request) {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));

        String firstName = request.getFirstName() == null ? null : request.getFirstName().trim();
        String lastName = request.getLastName() == null ? null : request.getLastName().trim();
        if (isBlank(firstName) || isBlank(lastName)) {
            return ResponseEntity.badRequest().body(Map.of("error", "First name and last name are required"));
        }

        String city = request.getCity();
        if (city != null) city = city.trim();

        String email = request.getEmail();
        if (email != null) email = email.trim();

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setCity(isBlank(city) ? "UNKNOWN" : city);

        if (!isBlank(email) && !email.equalsIgnoreCase(user.getEmail())) {
            if (userRepository.existsByEmailAndIdNot(email, user.getId())) {
                return ResponseEntity.status(409).body(Map.of("error", "Email is already registered"));
            }
            user.setEmail(email);
        }

        try {
            userRepository.save(user);
            return ResponseEntity.ok(toMeResponse(user));
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(409).body(Map.of("error", "Username/email already exists"));
        }
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Current password is incorrect"));
        }

        String newPassword = request.getNewPassword();
        if (!isValidPassword(newPassword)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 8 characters, contain one lowercase letter and one digit"));
        }

        if (!newPassword.equals(request.getConfirmNewPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Passwords do not match"));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setMustChangePassword(false);
        userRepository.save(user);

        Map<String, Object> claims = new HashMap<>();
        claims.put("uid", user.getId());
        claims.put("name", (user.getFirstName() + " " + user.getLastName()).trim());
        claims.put("role", user.getRole() == null ? Role.USER.name() : user.getRole().name());
        claims.put("mustChangePassword", user.isMustChangePassword());
        String token = jwtService.generateToken(user.getUsername(), claims);

        return ResponseEntity.ok(Map.of("message", "Password updated", "token", token));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMe(@Valid @RequestBody DeleteMeRequest request) {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));

        String confirm = request.getConfirmText() == null ? null : request.getConfirmText().trim();
        if (!"DELETE".equalsIgnoreCase(confirm)) {
            return ResponseEntity.badRequest().body(Map.of("error", "confirmText must be DELETE"));
        }

        String password = request.getPassword();
        if (password != null && !password.trim().isEmpty()) {
            if (!passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Password is incorrect"));
            }
        }

        if (user.getRole() == Role.ADMIN && userRepository.countByRole(Role.ADMIN) <= 1) {
            return ResponseEntity.status(409).body(Map.of("error", "Cannot delete the last remaining admin"));
        }

        userRepository.delete(user);
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Account deleted"));
    }

    private User getCurrentUserOrNull() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) return null;
        Object principal = authentication.getPrincipal();
        if (principal == null) return null;
        if (principal instanceof String && "anonymousUser".equals(principal)) return null;
        String username = authentication.getName();
        if (isBlank(username) || "anonymousUser".equals(username)) return null;
        return userRepository.findByUsername(username).orElse(null);
    }

    private UserMeResponse toMeResponse(User user) {
        return UserMeResponse.from(user);
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    private boolean isValidPassword(String password) {
        if (password == null) return false;
        if (password.length() < 8) return false;
        boolean hasLower = password.chars().anyMatch(Character::isLowerCase);
        boolean hasDigit = password.chars().anyMatch(Character::isDigit);
        return hasLower && hasDigit;
    }
}
