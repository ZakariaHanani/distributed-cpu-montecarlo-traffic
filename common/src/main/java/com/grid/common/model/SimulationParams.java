package com.grid.common.model;

import java.io.Serializable;

public class SimulationParams implements Serializable {
    private int numberOfCars;
    private int iterations;
    private Weather weather;
    private boolean trafficLightsEnabled;
    private long seed;
    private int gridSize;

    // Constructeur mis à jour
    public SimulationParams(int numberOfCars, int iterations, Weather weather, boolean trafficLightsEnabled, long seed, int gridSize) {
        this.numberOfCars = numberOfCars;
        this.iterations = iterations;
        this.weather = weather;
        this.trafficLightsEnabled = trafficLightsEnabled;
        this.seed = seed;
        this.gridSize = gridSize;
    }

    // Getters
    public int getNumberOfCars() { return numberOfCars; }
    public int getIterations() { return iterations; }
    public Weather getWeather() { return weather; }
    public int getGridSize() { return gridSize; }
    public boolean isTrafficLightsEnabled() { return trafficLightsEnabled; }

    // <--- LA MÉTHODE MANQUANTE
    public long getSeed() { return seed; }
}