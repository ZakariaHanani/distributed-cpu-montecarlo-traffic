package com.grid.common.model;

import java.io.Serializable;

public class TrafficLight implements Serializable {
    private LightState state;
    private int timeRemaining; // Temps avant changement de couleur
    private int greenDuration;
    private int redDuration;

    public TrafficLight(int greenDuration, int redDuration) {
        this.greenDuration = greenDuration;
        this.redDuration = redDuration;
        this.state = LightState.RED; // Commence rouge par défaut
        this.timeRemaining = redDuration;
    }

    // Logique pour changer de couleur (sera appelée par ta simulation)
    public void update() {
        timeRemaining--;
        if (timeRemaining <= 0) {
            switch (state) {
                case RED -> { state = LightState.GREEN; timeRemaining = greenDuration; }
                case GREEN -> { state = LightState.YELLOW; timeRemaining = 5; } // Jaune fixe 5s
                case YELLOW -> { state = LightState.RED; timeRemaining = redDuration; }
            }
        }
    }

    public LightState getState() { return state; }
}