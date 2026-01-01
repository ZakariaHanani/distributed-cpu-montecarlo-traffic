package com.trafficjam1.authservice.oauth;

public class OAuthLoginException extends RuntimeException {
    public OAuthLoginException() {
        super("OAuth login failed");
    }
}

