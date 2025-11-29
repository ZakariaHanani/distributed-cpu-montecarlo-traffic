package com.grid.common.model;

import com.grid.common.AbstractTask;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Represents a single chunk of the global Monte Carlo simulation
 * that will be sent to ONE worker.
 *
 * This wraps SimulationParams so workers can run the TrafficSimulationEngine
 * for a subset of iterations.
 */
public class SimulationChunkTask extends AbstractTask {

    private final SimulationParams params;

    public SimulationChunkTask(UUID taskId, SimulationParams params) {
        super(taskId, buildParametersMap(params), params.getSeed());
        this.params = params;
    }

    /**
     * Expose the full simulation parameters for this chunk.
     * Workers will use this to configure the TrafficSimulationEngine.
     */
    public SimulationParams getParams() {
        return params;
    }

    /**
     * Convenience: how many iterations this chunk must execute.
     */
    public int getIterationsForThisChunk() {
        return params.getIterations();
    }

    /**
     * Build a generic parameter map so the Task interface stays useful
     * for logging / debugging, even if code uses SimulationParams directly.
     */
    private static Map<String, Object> buildParametersMap(SimulationParams params) {
        Map<String, Object> map = new HashMap<>();
        map.put("iterations", params.getIterations());
        map.put("numberOfCars", params.getNumberOfCars());
        map.put("weather", params.getWeather().name());
        map.put("trafficLightsEnabled", params.isTrafficLightsEnabled());
        map.put("seed", params.getSeed());
        return map;
    }
}
