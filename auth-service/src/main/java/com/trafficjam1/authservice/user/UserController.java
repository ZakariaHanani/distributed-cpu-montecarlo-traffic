package com.trafficjam1.authservice.user;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users/me")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<?> getMe() {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(toMeResponse(user));
    }

    @PutMapping
    public ResponseEntity<?> updateMe(@Valid @RequestBody UpdateMeRequest request) {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(404).build();

        String firstName = request.getFirstName() == null ? null : request.getFirstName().trim();
        String lastName = request.getLastName() == null ? null : request.getLastName().trim();
        if (isBlank(firstName) || isBlank(lastName)) {
            return ResponseEntity.badRequest().body(error("First name and last name are required"));
        }

        user.setFirstName(firstName);
        user.setLastName(lastName);

        String city = request.getCity();
        if (city != null) city = city.trim();
        user.setCity(isBlank(city) ? "UNKNOWN" : city);

        userRepository.save(user);
        return ResponseEntity.ok(toMeResponse(user));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(404).build();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(error("Current password is incorrect"));
        }

        String newPassword = request.getNewPassword();
        if (!isValidPassword(newPassword)) {
            return ResponseEntity.badRequest().body(error("Password must be at least 8 characters, contain one lowercase letter and one digit"));
        }

        if (!newPassword.equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(error("Passwords do not match"));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Password updated"));
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(new UserStatsResponse(0, 0, 0.0, null));
    }

    @DeleteMapping("/history")
    public ResponseEntity<?> deleteHistory() {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(Map.of("message", "History deleted"));
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
        String city = user.getCity();
        String cityOrNull = "UNKNOWN".equalsIgnoreCase(city) ? null : city;
        return new UserMeResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                cityOrNull
        );
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

    private Map<String, String> error(String message) {
        Map<String, String> map = new HashMap<>();
        map.put("error", message);
        return map;
    }
}
