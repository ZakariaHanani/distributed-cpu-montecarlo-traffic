package com.trafficjam1.authservice.security;

import com.trafficjam1.authservice.oauth.GitHubEmailClient;
import com.trafficjam1.authservice.oauth.OAuthLoginException;
import com.trafficjam1.authservice.oauth.OAuthUserProvisioningService;
import com.trafficjam1.authservice.user.AuthProvider;
import com.trafficjam1.authservice.user.User;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtService jwtService;
    private final OAuthUserProvisioningService oAuthUserProvisioningService;
    private final GitHubEmailClient gitHubEmailClient;
    private final OAuth2AuthorizedClientService authorizedClientService;

    @Value("${app.cors.allowed-origins:http://localhost:5173,http://localhost:3000}")
    private String allowedOrigins;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            JwtService jwtService,
            OAuthUserProvisioningService oAuthUserProvisioningService,
            GitHubEmailClient gitHubEmailClient,
            ObjectProvider<OAuth2AuthorizedClientService> authorizedClientService
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.jwtService = jwtService;
        this.oAuthUserProvisioningService = oAuthUserProvisioningService;
        this.gitHubEmailClient = gitHubEmailClient;
        this.authorizedClientService = authorizedClientService.getIfAvailable();
    }

    @Bean
    @Order(1)
    public SecurityFilterChain oauth2SecurityFilterChain(
            HttpSecurity http,
            ObjectProvider<ClientRegistrationRepository> clientRegistrationRepository
    ) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .securityMatcher("/oauth2/**", "/login/oauth2/**")
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

        if (clientRegistrationRepository.getIfAvailable() != null) {
            http.oauth2Login(oauth2 -> oauth2
                    .successHandler(oauth2SuccessHandler())
                    .failureHandler(oauth2FailureHandler())
            );
        }

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain apiSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .securityMatcher("/api/**")
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/simulations/**").authenticated()
                        .requestMatchers("/api/admins/**").hasRole("ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler oauth2SuccessHandler() {
        return (request, response, authentication) -> {
            String redirect = buildFrontendRedirect("/login?error=oauth_failed");
            try {
                if (!(authentication instanceof org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken token)) {
                    throw new OAuthLoginException();
                }

                String registrationId = token.getAuthorizedClientRegistrationId();
                AuthProvider provider = mapProvider(registrationId);
                Map<String, Object> attributes = token.getPrincipal().getAttributes();

                String providerId = readProviderId(provider, attributes);
                String email = readEmail(provider, attributes, token);
                String name = readName(provider, attributes);
                String avatarUrl = readAvatarUrl(provider, attributes);
                String usernameHint = readUsernameHint(provider, attributes);

                User user = oAuthUserProvisioningService.upsertUser(
                        provider,
                        providerId,
                        email,
                        name,
                        avatarUrl,
                        usernameHint
                );

                if (!user.isActive()) {
                    throw new OAuthLoginException();
                }

                Map<String, Object> claims = new HashMap<>();
                claims.put("uid", user.getId());
                claims.put("name", (user.getFirstName() + " " + user.getLastName()).trim());
                claims.put("role", user.getRole().name());
                claims.put("mustChangePassword", user.isMustChangePassword());

                String jwt = jwtService.generateToken(user.getUsername(), claims);
                redirect = buildFrontendRedirect("/auth/callback?token=" + urlEncode(jwt));
            } catch (Exception ignored) {
            }
            response.sendRedirect(redirect);
        };
    }

    @Bean
    public AuthenticationFailureHandler oauth2FailureHandler() {
        return (request, response, exception) -> response.sendRedirect(buildFrontendRedirect("/login?error=oauth_failed"));
    }

    @Bean
    public UserDetailsPasswordService userDetailsPasswordService(com.trafficjam1.authservice.user.UserRepository userRepository) {
        return (UserDetails user, String newPassword) -> {
            userRepository.findByUsername(user.getUsername()).ifPresent(found -> {
                found.setPassword(newPassword);
                userRepository.save(found);
            });
            return user;
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder,
            UserDetailsPasswordService userDetailsPasswordService
    ) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsPasswordService(userDetailsPasswordService);
        return new ProviderManager(provider);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        List<String> origins = List.of(allowedOrigins.split(","));
        configuration.setAllowedOrigins(origins);
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    @Order(3)
    public SecurityFilterChain permitAllFallbackSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }

    private String buildFrontendRedirect(String path) {
        String base = frontendUrl == null ? "http://localhost:3000" : frontendUrl.trim();
        if (base.endsWith("/")) base = base.substring(0, base.length() - 1);
        if (!path.startsWith("/")) path = "/" + path;
        return base + path;
    }

    private static String urlEncode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    private AuthProvider mapProvider(String registrationId) {
        if (registrationId == null) throw new OAuthLoginException();
        String normalized = registrationId.trim().toLowerCase();
        return switch (normalized) {
            case "google" -> AuthProvider.GOOGLE;
            case "github" -> AuthProvider.GITHUB;
            default -> throw new OAuthLoginException();
        };
    }

    private static String readProviderId(AuthProvider provider, Map<String, Object> attributes) {
        if (attributes == null) throw new OAuthLoginException();
        Object raw = switch (provider) {
            case GOOGLE -> attributes.get("sub");
            case GITHUB -> attributes.get("id");
            default -> null;
        };
        if (raw == null) throw new OAuthLoginException();
        String value = raw.toString().trim();
        if (value.isEmpty()) throw new OAuthLoginException();
        return value;
    }

    private String readEmail(AuthProvider provider, Map<String, Object> attributes, Authentication authentication) {
        if (attributes == null) throw new OAuthLoginException();
        Object raw = attributes.get("email");
        String email = raw == null ? null : raw.toString().trim();
        if (email != null && !email.isBlank()) return email;
        if (provider != AuthProvider.GITHUB) throw new OAuthLoginException();
        if (authorizedClientService == null) throw new OAuthLoginException();

        String accessToken = null;
        if (authentication instanceof org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken token) {
            OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                    token.getAuthorizedClientRegistrationId(),
                    token.getName()
            );
            if (client != null && client.getAccessToken() != null) {
                accessToken = client.getAccessToken().getTokenValue();
            }
        }

        email = gitHubEmailClient.fetchPrimaryEmail(accessToken);
        if (email == null || email.isBlank()) throw new OAuthLoginException();
        return email;
    }

    private static String readName(AuthProvider provider, Map<String, Object> attributes) {
        if (attributes == null) return null;
        Object raw = attributes.get("name");
        String name = raw == null ? null : raw.toString().trim();
        if (name != null && !name.isBlank()) return name;
        if (provider == AuthProvider.GITHUB) {
            Object login = attributes.get("login");
            String loginStr = login == null ? null : login.toString().trim();
            if (loginStr != null && !loginStr.isBlank()) return loginStr;
        }
        return null;
    }

    private static String readAvatarUrl(AuthProvider provider, Map<String, Object> attributes) {
        if (attributes == null) return null;
        Object raw = switch (provider) {
            case GOOGLE -> attributes.get("picture");
            case GITHUB -> attributes.get("avatar_url");
            default -> null;
        };
        String url = raw == null ? null : raw.toString().trim();
        return url != null && !url.isBlank() ? url : null;
    }

    private static String readUsernameHint(AuthProvider provider, Map<String, Object> attributes) {
        if (attributes == null) return null;
        if (provider == AuthProvider.GITHUB) {
            Object raw = attributes.get("login");
            String login = raw == null ? null : raw.toString().trim();
            return login != null && !login.isBlank() ? login : null;
        }
        return null;
    }
}
