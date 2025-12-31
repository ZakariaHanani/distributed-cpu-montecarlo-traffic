package com.trafficjam1.authservice.admin;

import com.trafficjam1.authservice.user.Role;
import com.trafficjam1.authservice.user.User;
import com.trafficjam1.authservice.user.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getCurrentAdminOrThrow() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("Not authenticated");
        }
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalStateException("User not found"));
        if (user.getRole() != Role.ADMIN) {
            throw new IllegalStateException("Forbidden");
        }
        return user;
    }

    public AdminMeResponse getMe() {
        User user = getCurrentAdminOrThrow();
        return new AdminMeResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getCity(),
                user.getRole()
        );
    }

    public AdminMeResponse updateMe(UpdateAdminMeRequest request) {
        User user = getCurrentAdminOrThrow();
        String first = request.getFirstName() == null ? null : request.getFirstName().trim();
        String last = request.getLastName() == null ? null : request.getLastName().trim();
        if (isBlank(first) || isBlank(last)) {
            throw new IllegalArgumentException("First name and last name are required");
        }
        String city = request.getCity();
        if (city != null) city = city.trim();
        user.setFirstName(first);
        user.setLastName(last);
        user.setCity(isBlank(city) ? null : city);
        userRepository.save(user);
        return getMe();
    }

    public void changePassword(ChangeAdminPasswordRequest request) {
        User user = getCurrentAdminOrThrow();
        if (isBlank(request.getCurrentPassword()) || isBlank(request.getNewPassword()) || isBlank(request.getConfirmPassword())) {
            throw new IllegalArgumentException("All fields are required");
        }
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public List<AdminUserListItemResponse> listAdmins() {
        List<User> users = userRepository.findAllByRole(Role.ADMIN);
        return users.stream()
                .map(user -> new AdminUserListItemResponse(
                        user.getId(),
                        (user.getFirstName() + " " + user.getLastName()).trim(),
                        user.getEmail(),
                        user.getUsername(),
                        user.getRole(),
                        user.getLastLoginAt()
                ))
                .toList();
    }

    public List<AdminListItemResponse> listAdminRows() {
        Instant now = Instant.now();
        Instant onlineThreshold = now.minusSeconds(5 * 60);
        List<User> users = userRepository.findAllByRole(Role.ADMIN);
        return users.stream()
                .map(user -> {
                    Instant lastActivity = user.getLastActivityAt() != null ? user.getLastActivityAt() : user.getLastLoginAt();
                    boolean isOnline = lastActivity != null && lastActivity.isAfter(onlineThreshold);
                    return new AdminListItemResponse(
                            user.getId(),
                            user.getFirstName(),
                            user.getLastName(),
                            user.getEmail(),
                            user.getUsername(),
                            user.getRole(),
                            lastActivity,
                            isOnline ? "Online" : "Offline"
                    );
                })
                .toList();
    }

    public AdminUserListItemResponse createAdmin(CreateAdminUserRequest request) {
        String first = request.getFirstName() == null ? null : request.getFirstName().trim();
        String last = request.getLastName() == null ? null : request.getLastName().trim();
        String email = request.getEmail() == null ? null : request.getEmail().trim();
        String username = request.getUsername() == null ? null : request.getUsername().trim();
        String password = request.getPassword();
        Role role = request.getRole();

        if (isBlank(first) || isBlank(last) || isBlank(email) || isBlank(username) || isBlank(password)) {
            throw new IllegalArgumentException("Invalid request");
        }
        if (role != Role.ADMIN) {
            throw new IllegalArgumentException("Invalid request");
        }

        User user = new User();
        user.setRole(Role.ADMIN);
        user.setFirstName(first);
        user.setLastName(last);
        user.setEmail(email);
        user.setUsername(username);
        user.setCity(null);
        user.setPassword(passwordEncoder.encode(password));
        user.setLastLoginAt(null);

        try {
            User saved = userRepository.save(user);
            return new AdminUserListItemResponse(
                    saved.getId(),
                    (saved.getFirstName() + " " + saved.getLastName()).trim(),
                    saved.getEmail(),
                    saved.getUsername(),
                    saved.getRole(),
                    saved.getLastLoginAt()
            );
        } catch (DataIntegrityViolationException ex) {
            throw new IllegalStateException("Could not create admin");
        }
    }

    public AdminListItemResponse createAdminWithTemporaryPassword(AdminCreateRequest request) {
        String first = request.getFirstName() == null ? null : request.getFirstName().trim();
        String last = request.getLastName() == null ? null : request.getLastName().trim();
        String email = request.getEmail() == null ? null : request.getEmail().trim();
        String username = request.getUsername() == null ? null : request.getUsername().trim();
        String temporaryPassword = request.getTemporaryPassword();

        if (isBlank(first) || isBlank(last) || isBlank(email) || isBlank(username) || isBlank(temporaryPassword)) {
            throw new IllegalArgumentException("Invalid request");
        }

        if (userRepository.existsByUsername(username) || userRepository.existsByEmail(email)) {
            throw new IllegalStateException("Username/email already exists");
        }

        User user = new User();
        user.setRole(Role.ADMIN);
        user.setFirstName(first);
        user.setLastName(last);
        user.setEmail(email);
        user.setUsername(username);
        user.setCity("UNKNOWN");
        user.setActive(true);
        user.setMustChangePassword(true);
        user.setPassword(passwordEncoder.encode(temporaryPassword));
        user.setLastLoginAt(null);
        user.setLastActivityAt(null);

        try {
            User saved = userRepository.save(user);
            return new AdminListItemResponse(
                    saved.getId(),
                    saved.getFirstName(),
                    saved.getLastName(),
                    saved.getEmail(),
                    saved.getUsername(),
                    saved.getRole(),
                    saved.getLastLoginAt(),
                    "Offline"
            );
        } catch (DataIntegrityViolationException ex) {
            throw new IllegalStateException("Username/email already exists");
        }
    }

    public AdminListItemResponse updateAdmin(Long id, AdminUpdateRequest request) {
        User target = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Admin not found"));
        if (target.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Admin not found");
        }

        String first = request.getFirstName() == null ? null : request.getFirstName().trim();
        String last = request.getLastName() == null ? null : request.getLastName().trim();
        String email = request.getEmail() == null ? null : request.getEmail().trim();
        String username = request.getUsername() == null ? null : request.getUsername().trim();
        String city = request.getCity();
        if (city != null) city = city.trim();

        if (isBlank(first) || isBlank(last) || isBlank(email) || isBlank(username)) {
            throw new IllegalArgumentException("Invalid request");
        }

        if (userRepository.existsByUsernameAndIdNot(username, target.getId())) {
            throw new IllegalStateException("Username is already taken");
        }
        if (userRepository.existsByEmailAndIdNot(email, target.getId())) {
            throw new IllegalStateException("Email is already registered");
        }

        target.setFirstName(first);
        target.setLastName(last);
        target.setEmail(email);
        target.setUsername(username);
        if (city != null) {
            target.setCity(isBlank(city) ? "UNKNOWN" : city);
        }

        try {
            User saved = userRepository.save(target);
            Instant now = Instant.now();
            Instant onlineThreshold = now.minusSeconds(5 * 60);
            Instant lastActivity = saved.getLastActivityAt() != null ? saved.getLastActivityAt() : saved.getLastLoginAt();
            boolean isOnline = lastActivity != null && lastActivity.isAfter(onlineThreshold);
            return new AdminListItemResponse(
                    saved.getId(),
                    saved.getFirstName(),
                    saved.getLastName(),
                    saved.getEmail(),
                    saved.getUsername(),
                    saved.getRole(),
                    lastActivity,
                    isOnline ? "Online" : "Offline"
            );
        } catch (DataIntegrityViolationException ex) {
            throw new IllegalStateException("Username/email already exists");
        }
    }

    public void deleteAdmin(Long id) {
        User target = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Admin not found"));
        if (target.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Admin not found");
        }

        if (userRepository.countByRole(Role.ADMIN) <= 1) {
            throw new IllegalStateException("Cannot delete the last remaining admin");
        }
        userRepository.delete(target);
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }
}
