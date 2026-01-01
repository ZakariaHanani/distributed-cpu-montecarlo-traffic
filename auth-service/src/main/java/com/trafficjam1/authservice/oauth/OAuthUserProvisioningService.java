package com.trafficjam1.authservice.oauth;

import com.trafficjam1.authservice.user.AuthProvider;
import com.trafficjam1.authservice.user.Role;
import com.trafficjam1.authservice.user.User;
import com.trafficjam1.authservice.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Service
public class OAuthUserProvisioningService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public OAuthUserProvisioningService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User upsertUser(
            AuthProvider provider,
            String providerId,
            String email,
            String name,
            String avatarUrl,
            String usernameHint
    ) {
        if (provider == null) throw new OAuthLoginException();
        String normalizedProviderId = normalize(providerId);
        String normalizedEmail = normalizeEmail(email);
        if (normalizedProviderId == null || normalizedEmail == null) throw new OAuthLoginException();

        Optional<User> existing = userRepository.findByProviderAndProviderId(provider, normalizedProviderId);
        if (existing.isPresent()) {
            return touchAndUpdate(existing.get(), provider, normalizedProviderId, normalizedEmail, name, avatarUrl);
        }

        Optional<User> byEmail = userRepository.findByEmail(normalizedEmail);
        if (byEmail.isPresent()) {
            User user = byEmail.get();
            AuthProvider currentProvider = user.getProvider() == null ? AuthProvider.LOCAL : user.getProvider();
            if (currentProvider == AuthProvider.LOCAL) {
                throw new OAuthLoginException();
            }
            if (currentProvider != provider) {
                throw new OAuthLoginException();
            }
            if (user.getProviderId() != null && !user.getProviderId().equals(normalizedProviderId)) {
                throw new OAuthLoginException();
            }
            user.setProvider(provider);
            user.setProviderId(normalizedProviderId);
            return touchAndUpdate(user, provider, normalizedProviderId, normalizedEmail, name, avatarUrl);
        }

        User user = new User();
        user.setProvider(provider);
        user.setProviderId(normalizedProviderId);
        user.setEmail(normalizedEmail);

        String fallbackName = normalize(usernameHint);
        String resolvedName = normalize(name);
        NameParts parts = splitName(resolvedName != null ? resolvedName : fallbackName);
        user.setFirstName(parts.firstName());
        user.setLastName(parts.lastName());

        String username = generateUniqueUsername(normalizedEmail);
        user.setUsername(username);

        user.setRole(Role.USER);
        user.setActive(true);
        user.setMustChangePassword(false);
        user.setAvatarUrl(normalize(avatarUrl));

        String placeholderPassword = UUID.randomUUID() + "-" + UUID.randomUUID();
        user.setPassword(passwordEncoder.encode(placeholderPassword));

        Instant now = Instant.now();
        user.setLastLoginAt(now);
        user.setLastActivityAt(now);

        return userRepository.save(user);
    }

    private User touchAndUpdate(
            User user,
            AuthProvider provider,
            String providerId,
            String email,
            String name,
            String avatarUrl
    ) {
        if (user.getProvider() == null) user.setProvider(provider);
        if (user.getProviderId() == null) user.setProviderId(providerId);

        if (user.getRole() == null) user.setRole(Role.USER);

        if (avatarUrl != null && !avatarUrl.isBlank()) {
            user.setAvatarUrl(avatarUrl);
        }

        if (name != null && !name.isBlank()) {
            NameParts parts = splitName(name);
            if (user.getFirstName() == null || user.getFirstName().isBlank()) {
                user.setFirstName(parts.firstName());
            }
            if (user.getLastName() == null || user.getLastName().isBlank()) {
                user.setLastName(parts.lastName());
            }
        }

        if (email != null && !email.isBlank()) {
            String currentEmail = user.getEmail() == null ? "" : user.getEmail().trim().toLowerCase(Locale.ROOT);
            if (!email.equals(currentEmail)) {
                Optional<User> other = userRepository.findByEmail(email);
                if (other.isEmpty() || other.get().getId().equals(user.getId())) {
                    user.setEmail(email);
                }
            }
        }

        Instant now = Instant.now();
        user.setLastLoginAt(now);
        user.setLastActivityAt(now);

        return userRepository.save(user);
    }

    private String generateUniqueUsername(String normalizedEmail) {
        String base = normalizedEmail.split("@", 2)[0];
        base = base.replaceAll("[^a-zA-Z0-9._-]", "");
        if (base.isBlank()) base = "user";
        if (base.length() > 24) base = base.substring(0, 24);

        String candidate = base;
        int attempts = 0;
        while (userRepository.existsByUsername(candidate) && attempts < 20) {
            attempts++;
            String suffix = UUID.randomUUID().toString().substring(0, 6);
            String prefix = base;
            int maxPrefix = 24;
            if (prefix.length() > maxPrefix) prefix = prefix.substring(0, maxPrefix);
            candidate = prefix + "-" + suffix;
        }
        if (userRepository.existsByUsername(candidate)) {
            candidate = "user-" + UUID.randomUUID().toString().substring(0, 10);
        }
        return candidate;
    }

    private static String normalize(String value) {
        if (value == null) return null;
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private static String normalizeEmail(String value) {
        String normalized = normalize(value);
        if (normalized == null) return null;
        return normalized.toLowerCase(Locale.ROOT);
    }

    private static NameParts splitName(String raw) {
        if (raw == null || raw.isBlank()) {
            return new NameParts("", "");
        }
        String cleaned = raw.trim().replaceAll("\\s+", " ");
        int idx = cleaned.indexOf(' ');
        if (idx < 0) {
            return new NameParts(cleaned, "");
        }
        String first = cleaned.substring(0, idx).trim();
        String last = cleaned.substring(idx + 1).trim();
        return new NameParts(first.isEmpty() ? "" : first, last.isEmpty() ? "" : last);
    }

    private record NameParts(String firstName, String lastName) {}
}

