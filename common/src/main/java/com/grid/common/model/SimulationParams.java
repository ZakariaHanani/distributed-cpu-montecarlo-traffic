package com.grid.common.model;

import java.io.Serializable;

public class SimulationParams implements Serializable {
    private int numberOfCars;
    private int iterations;     // Combien de "ticks" de temps
    private Weather weather;    // Météo choisie par l'utilisateur
    private boolean trafficLightsEnabled;

    // Constructeur complet
    public SimulationParams(int numberOfCars, int iterations, Weather weather, boolean trafficLightsEnabled) {
        this.numberOfCars = numberOfCars;
        this.iterations = iterations;
        this.weather = weather;
        this.trafficLightsEnabled = trafficLightsEnabled;
    }

    // Getters
    public int getNumberOfCars() { return numberOfCars; }
    public int getIterations() { return iterations; }
    public Weather getWeather() { return weather; }
}