package com.trafficjam1.authservice.auth;
import com.fasterxml.jackson.annotation.JsonAlias;

public class LoginRequest {
    @JsonAlias({"username", "email"})
    private String usernameOrEmail;

    private String password;

    public String getUsernameOrEmail() { return usernameOrEmail; }
    public void setUsernameOrEmail(String usernameOrEmail) { this.usernameOrEmail = usernameOrEmail; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

