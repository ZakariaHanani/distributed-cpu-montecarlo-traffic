package com.grid.common.model;

import java.io.Serializable;

public class Intersection implements Serializable {
    private String id; // Ex: "I00", "I01"
    private TrafficLight trafficLight; // Peut être null s'il n'y a pas de feu

    public Intersection(String id) {
        this.id = id;
    }

    // Getters/Setters
    public String getId() { return id; }
    public TrafficLight getTrafficLight() { return trafficLight; }
    public void setTrafficLight(TrafficLight trafficLight) { this.trafficLight = trafficLight; }
}