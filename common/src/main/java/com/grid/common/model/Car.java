package com.grid.common.model;

import java.io.Serializable;

public class Car implements Serializable {
    private int id;
    private String currentRoadId;
    private double position;      // Position en mètres sur la route (0 -> length)
    private double speed;         // Vitesse actuelle
    private DriverType driverType; // Comportement

    public Car(int id, String currentRoadId, DriverType driverType) {
        this.id = id;
        this.currentRoadId = currentRoadId;
        this.driverType = driverType;
        this.position = 0;
        this.speed = 0;
    }

    // Getters et Setters nécessaires pour la simulation
    public int getId() { return id; }
    public String getCurrentRoadId() { return currentRoadId; }
    public void setCurrentRoadId(String currentRoadId) { this.currentRoadId = currentRoadId; }
    public double getPosition() { return position; }
    public void setPosition(double position) { this.position = position; }
    public double getSpeed() { return speed; }
    public void setSpeed(double speed) { this.speed = speed; }
    public DriverType getDriverType() { return driverType; }
}