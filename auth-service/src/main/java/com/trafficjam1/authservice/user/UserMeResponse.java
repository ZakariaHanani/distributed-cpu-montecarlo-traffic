package com.trafficjam1.authservice.user;

import java.time.Instant;

public class UserMeResponse {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String city;
    private Role role;
    private boolean active;
    private Instant lastLoginAt;
    private Instant createdAt;
    private Instant updatedAt;
    private boolean mustChangePassword;

    public UserMeResponse() {
    }

    public static UserMeResponse from(User user) {
        String city = user.getCity();
        String cityOrNull = "UNKNOWN".equalsIgnoreCase(city) ? null : city;
        Role role = user.getRole() == null ? Role.USER : user.getRole();
        return new UserMeResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                cityOrNull,
                role,
                user.isActive(),
                user.getLastLoginAt(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.isMustChangePassword()
        );
    }

    public UserMeResponse(
            Long id,
            String username,
            String email,
            String firstName,
            String lastName,
            String city,
            Role role,
            boolean active,
            Instant lastLoginAt,
            Instant createdAt,
            Instant updatedAt,
            boolean mustChangePassword
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.role = role;
        this.active = active;
        this.lastLoginAt = lastLoginAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.mustChangePassword = mustChangePassword;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Instant getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(Instant lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isMustChangePassword() {
        return mustChangePassword;
    }

    public void setMustChangePassword(boolean mustChangePassword) {
        this.mustChangePassword = mustChangePassword;
    }
}
