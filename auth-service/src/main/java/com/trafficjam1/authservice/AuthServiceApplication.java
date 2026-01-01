package com.trafficjam1.authservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

@SpringBootApplication
public class AuthServiceApplication {
    private static final Logger log = LoggerFactory.getLogger(AuthServiceApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }

    @Bean
    ApplicationRunner logOauthClientRegistrations(ClientRegistrationRepository clientRegistrationRepository) {
        return args -> {
            if (!(clientRegistrationRepository instanceof InMemoryClientRegistrationRepository repo)) {
                log.info("OAuth2 client registrations repository type={}", clientRegistrationRepository.getClass().getName());
                return;
            }

            for (ClientRegistration reg : repo) {
                String clientId = reg.getClientId();
                String maskedClientId = clientId == null ? "<null>"
                        : (clientId.length() <= 6 ? "***" : (clientId.substring(0, 3) + "…" + clientId.substring(clientId.length() - 3)));

                log.info(
                        "OAuth2 registration id={} clientId={} secretPresent={} redirectUri={} scopes={} authUri={} tokenUri={}",
                        reg.getRegistrationId(),
                        maskedClientId,
                        reg.getClientSecret() != null && !reg.getClientSecret().isBlank(),
                        reg.getRedirectUri(),
                        reg.getScopes(),
                        reg.getProviderDetails().getAuthorizationUri(),
                        reg.getProviderDetails().getTokenUri()
                );
            }
        };
    }
}
