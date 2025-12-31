package com.trafficjam1.authservice.admin;

import com.trafficjam1.authservice.user.Role;

import java.time.Instant;

public record AdminUserListItemResponse(
        Long id,
        String fullName,
        String email,
        String username,
        Role role,
        Instant lastSeen
) {}

