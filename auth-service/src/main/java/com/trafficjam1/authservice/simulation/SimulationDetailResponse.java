package com.trafficjam1.authservice.simulation;

import java.time.Instant;

public record SimulationDetailResponse(
        Long id,
        Long userId,
        String jobId,
        SimulationStatus status,
        int gridSize,
        int numberOfCars,
        int iterations,
        String weather,
        boolean trafficLightsEnabled,
        long seed,
        Instant createdAt,
        Instant updatedAt,
        SimulationResultData result
) {
    public record SimulationResultData(
            Integer totalJamsDetected,
            Double averageSpeed,
            Double minSpeedObserved,
            Double maxSpeedObserved,
            Double accidentProbability,
            String congestionJson,
            String metricsJson,
            Long executionTimeMs,
            String resultJson,
            Instant createdAt,
            Instant updatedAt
    ) {}
}

