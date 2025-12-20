package com.grid.common.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class SimulationParams implements Serializable {

    private int numberOfCars;
    private int iterations;
    private Weather weather;
    private boolean trafficLightsEnabled;
    private long seed;
    private int gridSize;

}