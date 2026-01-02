package com.trafficjam1.authservice.simulation;

public record SimulationCreateResponse(
        Long simulationId,
        String jobId,
        String message
) {}

