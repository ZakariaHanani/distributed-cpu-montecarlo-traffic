package com.grid.common.model;

import java.io.Serializable;

public class Road implements Serializable {
    private String id;          // Ex: "R01"
    private String fromId;      // ID Intersection départ
    private String toId;        // ID Intersection arrivée
    private double length;      // En mètres (ex: 200m)
    private double speedLimit;  // km/h (ex: 50)
    private int capacity;       // Combien de voitures max

    public Road(String id, String fromId, String toId, double length, double speedLimit) {
        this.id = id;
        this.fromId = fromId;
        this.toId = toId;
        this.length = length;
        this.speedLimit = speedLimit;
        this.capacity = (int) (length / 5); // Une voiture prend ~5m
    }

    // Getters
    public String getId() { return id; }
    public double getLength() { return length; }
    public double getSpeedLimit() { return speedLimit; }
}