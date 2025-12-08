package com.grid.common.model;

import com.grid.common.Result;

import java.io.Serializable;
import java.util.Map;

public class SimulationResult implements Result {
    private int totalJamsDetected;
    private double averageSpeed;
    private double averageTravelTime;

    // Map pour la Heatmap : "R01" -> 0.85 (85% de congestion)
    private Map<String, Double> congestionMap;

    public SimulationResult(int totalJams, double avgSpeed, Map<String, Double> congestionMap) {
        this.totalJamsDetected = totalJams;
        this.averageSpeed = avgSpeed;
        this.congestionMap = congestionMap;
    }

    // Getters pour que le Master puisse faire l'agrégation
    public int getTotalJamsDetected() { return totalJamsDetected; }
    public double getAverageSpeed() { return averageSpeed; }
    public Map<String, Double> getCongestionMap() { return congestionMap; }
}