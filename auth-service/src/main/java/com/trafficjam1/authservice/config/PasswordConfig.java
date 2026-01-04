package com.trafficjam1.authservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new LegacyAwarePasswordEncoder(new BCryptPasswordEncoder());
    }

    static final class LegacyAwarePasswordEncoder implements PasswordEncoder {
        private final BCryptPasswordEncoder bcrypt;

        LegacyAwarePasswordEncoder(BCryptPasswordEncoder bcrypt) {
            this.bcrypt = bcrypt;
        }

        @Override
        public String encode(CharSequence rawPassword) {
            return bcrypt.encode(rawPassword);
        }

        @Override
        public boolean matches(CharSequence rawPassword, String encodedPassword) {
            if (rawPassword == null || encodedPassword == null) return false;

            String stored = encodedPassword.trim();
            if (stored.isEmpty()) return false;

            if (stored.startsWith("{bcrypt}")) {
                stored = stored.substring("{bcrypt}".length());
            } else if (stored.startsWith("{noop}")) {
                stored = stored.substring("{noop}".length());
                return constantTimeEquals(rawPassword.toString(), stored);
            }

            if (looksLikeBcrypt(stored)) {
                if (stored.startsWith("$2y$")) {
                    stored = "$2a$" + stored.substring(4);
                }
                return bcrypt.matches(rawPassword, stored);
            }

            return constantTimeEquals(rawPassword.toString(), stored);
        }

        @Override
        public boolean upgradeEncoding(String encodedPassword) {
            if (encodedPassword == null) return false;
            String stored = encodedPassword.trim();
            if (stored.startsWith("{bcrypt}")) return true;
            if (stored.startsWith("{noop}")) return true;
            return !looksLikeBcrypt(stored);
        }

        private static boolean looksLikeBcrypt(String encodedPassword) {
            return encodedPassword.startsWith("$2a$") ||
                    encodedPassword.startsWith("$2b$") ||
                    encodedPassword.startsWith("$2y$");
        }

        private static boolean constantTimeEquals(String a, String b) {
            if (a == null || b == null) return false;
            return java.security.MessageDigest.isEqual(a.getBytes(java.nio.charset.StandardCharsets.UTF_8),
                    b.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        }
    }
}
