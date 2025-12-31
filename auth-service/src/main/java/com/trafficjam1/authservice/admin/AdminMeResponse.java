package com.trafficjam1.authservice.admin;

import com.trafficjam1.authservice.user.Role;

public record AdminMeResponse(
        Long id,
        String firstName,
        String lastName,
        String username,
        String email,
        String city,
        Role role
) {}

