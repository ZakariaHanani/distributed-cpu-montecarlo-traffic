package com.trafficjam1.authservice.simulation;

import java.time.Instant;

public record SimulationListItemResponse(
        Long id,
        String jobId,
        SimulationStatus status,
        int gridSize,
        int numberOfCars,
        int iterations,
        String weather,
        boolean trafficLightsEnabled,
        long seed,
        Instant createdAt,
        Instant updatedAt
) {}

