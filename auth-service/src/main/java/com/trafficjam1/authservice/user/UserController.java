package com.trafficjam1.authservice.user;

import com.trafficjam1.authservice.simulation.SimulationEntity;
import com.trafficjam1.authservice.simulation.SimulationRepository;
import com.trafficjam1.authservice.simulation.SimulationResultRepository;
import com.trafficjam1.authservice.simulation.SimulationStatus;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users/me")
public class UserController {

    private final UserRepository userRepository;
    private final SimulationRepository simulationRepository;
    private final SimulationResultRepository simulationResultRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, SimulationRepository simulationRepository, SimulationResultRepository simulationResultRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.simulationRepository = simulationRepository;
        this.simulationResultRepository = simulationResultRepository;
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

        if (!newPassword.equals(request.getConfirmNewPassword())) {
            return ResponseEntity.badRequest().body(error("Passwords do not match"));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setMustChangePassword(false);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Password updated"));
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(404).build();

        List<SimulationEntity> sims = simulationRepository.findAllByUser_IdOrderByCreatedAtDesc(user.getId());

        int totalSimulations = sims.size();
        int completed = 0;
        int failed = 0;
        int pending = 0;
        long totalExecutionTime = 0;
        Instant lastRunAt = sims.isEmpty() ? null : sims.get(0).getCreatedAt();

        for (SimulationEntity sim : sims) {
            if (sim.getStatus() == SimulationStatus.COMPLETED) {
                completed++;
                Duration duration = Duration.between(sim.getCreatedAt(), sim.getUpdatedAt());
                totalExecutionTime += duration.toMillis();
            } else if (sim.getStatus() == SimulationStatus.FAILED) {
                failed++;
            } else {
                pending++;
            }
        }

        double successRate = totalSimulations == 0 ? 0.0 : (double) completed / totalSimulations;
        long avgExecutionMs = completed == 0 ? 0 : totalExecutionTime / completed;

        return ResponseEntity.ok(new UserStatsResponse(
                totalSimulations,
                avgExecutionMs,
                successRate,
                lastRunAt,
                pending,
                failed
        ));
    }

    @DeleteMapping("/history")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<?> deleteHistory() {
        User user = getCurrentUserOrNull();
        if (user == null) return ResponseEntity.status(404).build();
        
        simulationResultRepository.deleteByUserId(user.getId());
        simulationRepository.deleteByUser_Id(user.getId());
        
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

    private Map<String, String> error(String message) {
        Map<String, String> map = new HashMap<>();
        map.put("error", message);
        return map;
    }
}
