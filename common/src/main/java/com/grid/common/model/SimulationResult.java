package com.grid.common.model;

import com.grid.common.Interfaces.Result;

import java.util.Map;
import java.util.UUID;

public class SimulationResult implements Result {
    private int totalJamsDetected;
    private double averageSpeed;
    private double minSpeedObserved;      // Pire scénario
    private double maxSpeedObserved;      // Meilleur scénario
    private double accidentProbability;   // % de risque d'accident global

    // Map pour la Heatmap : "R01" -> 0.85 (85% de congestion)
    private Map<String, Double> congestionMap;

    public SimulationResult
            (int totalJams, double avgSpeed, Map<String, Double> congestionMap,
             double minSpeedObserved, double maxSpeedObserved, double accidentProbability
             ) {
        this.totalJamsDetected = totalJams;
        this.averageSpeed = avgSpeed;
        this.congestionMap = congestionMap;
        this.minSpeedObserved = minSpeedObserved;
        this.maxSpeedObserved = maxSpeedObserved;
        this.accidentProbability = accidentProbability;
    }

    // Getters pour que le Master puisse faire l'agrégation
    public int getTotalJamsDetected() { return totalJamsDetected; }
    public double getAverageSpeed() { return averageSpeed; }
    public Map<String, Double> getCongestionMap() { return congestionMap; }
    public double getMinSpeedObserved() { return minSpeedObserved; }
    public double getMaxSpeedObserved() { return maxSpeedObserved; }
    public double getAccidentProbability() { return accidentProbability; }

    @Override
    public UUID getTaskId() {
        return null;
    }

    @Override
    public String getWorkerId() {
        return "";
    }

    @Override
    public Map<String, Object> getMetrics() {
        return Map.of();
    }

    @Override
    public long getExecutionTimeMs() {
        return 0;
    }
}