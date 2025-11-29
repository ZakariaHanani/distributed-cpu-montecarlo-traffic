package com.grid.common.model;

import java.io.Serializable;

public class SimulationParams implements Serializable {
    private int numberOfCars;
    private int iterations;
    private Weather weather;
    private boolean trafficLightsEnabled;
    private long seed; // <--- LE CHAMP MANQUANT

    // Constructeur mis à jour
    public SimulationParams(int numberOfCars, int iterations, Weather weather, boolean trafficLightsEnabled, long seed) {
        this.numberOfCars = numberOfCars;
        this.iterations = iterations;
        this.weather = weather;
        this.trafficLightsEnabled = trafficLightsEnabled;
        this.seed = seed;
    }

    // Getters
    public int getNumberOfCars() { return numberOfCars; }
    public int getIterations() { return iterations; }
    public Weather getWeather() { return weather; }
    public boolean isTrafficLightsEnabled() { return trafficLightsEnabled; }

    // <--- LA MÉTHODE MANQUANTE
    public long getSeed() { return seed; }
}