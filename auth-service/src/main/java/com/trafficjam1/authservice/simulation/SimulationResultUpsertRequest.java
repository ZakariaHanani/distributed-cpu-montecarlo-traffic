package com.trafficjam1.authservice.simulation;

public record SimulationResultUpsertRequest(
        Integer totalJamsDetected,
        Double averageSpeed,
        Double minSpeedObserved,
        Double maxSpeedObserved,
        Double accidentProbability,
        Object congestionMap,
        Object metrics,
        Long executionTimeMs
) {}

