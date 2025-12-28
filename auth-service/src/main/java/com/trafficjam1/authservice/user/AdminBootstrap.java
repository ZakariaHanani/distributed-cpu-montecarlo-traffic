package com.trafficjam1.authservice.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AdminBootstrap implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrap.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.bootstrap.admin.email:}")
    private String adminEmail;

    @Value("${app.bootstrap.admin.username:}")
    private String adminUsername;

    @Value("${app.bootstrap.admin.password:}")
    private String adminPassword;

    public AdminBootstrap(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        try {
            List<User> usersMissingRole = userRepository.findByRoleIsNull();
            if (!usersMissingRole.isEmpty()) {
                for (User user : usersMissingRole) {
                    user.setRole(Role.USER);
                }
                userRepository.saveAll(usersMissingRole);
            }

            if (userRepository.existsByRole(Role.ADMIN)) {
                return;
            }

            String email = normalize(adminEmail);
            String username = normalize(adminUsername);
            String password = adminPassword == null ? null : adminPassword;

            if (isBlank(email) || isBlank(username) || isBlank(password)) {
                log.warn("Admin bootstrap skipped: missing env vars");
                return;
            }

            Optional<User> existingByUsername = userRepository.findByUsername(username);
            Optional<User> existingByEmail = userRepository.findByEmail(email);
            if (existingByUsername.isPresent() || existingByEmail.isPresent()) {
                log.warn("Admin bootstrap skipped: username/email already exists");
                return;
            }

            User admin = new User();
            admin.setRole(Role.ADMIN);
            admin.setFirstName("System");
            admin.setLastName("Admin");
            admin.setCity("UNKNOWN");
            admin.setEmail(email);
            admin.setUsername(username);
            admin.setPassword(passwordEncoder.encode(password));
            userRepository.save(admin);
            log.info("Bootstrapped admin user username={} email={}", username, email);
        } catch (Exception ex) {
            log.error("Admin bootstrap failed cause={}", ex.getMessage(), ex);
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private String normalize(String value) {
        return value == null ? null : value.trim();
    }
}
