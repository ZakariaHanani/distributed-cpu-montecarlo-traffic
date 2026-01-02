package com.trafficjam1.authservice.oauth;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
public class GitHubEmailClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public String fetchPrimaryEmail(String accessToken) {
        if (accessToken == null || accessToken.isBlank()) return null;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.set("X-GitHub-Api-Version", "2022-11-28");

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<List<Map<String, Object>>> res = restTemplate.exchange(
                    "https://api.github.com/user/emails",
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<>() {}
            );

            List<Map<String, Object>> body = res.getBody();
            if (body == null || body.isEmpty()) return null;

            String primaryVerified = body.stream()
                    .filter(item -> Boolean.TRUE.equals(item.get("primary")))
                    .filter(item -> Boolean.TRUE.equals(item.get("verified")))
                    .map(item -> item.get("email"))
                    .filter(Objects::nonNull)
                    .map(Object::toString)
                    .findFirst()
                    .orElse(null);

            if (primaryVerified != null && !primaryVerified.isBlank()) return primaryVerified;

            return body.stream()
                    .filter(item -> Boolean.TRUE.equals(item.get("verified")))
                    .map(item -> item.get("email"))
                    .filter(Objects::nonNull)
                    .map(Object::toString)
                    .findFirst()
                    .orElse(null);
        } catch (RestClientException ex) {
            return null;
        }
    }
}

