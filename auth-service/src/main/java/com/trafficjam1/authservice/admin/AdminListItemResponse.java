package com.trafficjam1.authservice.admin;

import com.trafficjam1.authservice.user.Role;

import java.time.Instant;

public record AdminListItemResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String username,
        Role role,
        Instant lastSeen,
        String status
) {}

