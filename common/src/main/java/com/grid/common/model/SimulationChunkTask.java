package com.grid.common.model;

import com.grid.common.AbstractTask;
import com.grid.common.Interfaces.MasterCallback;
import com.grid.common.Interfaces.Result;
import com.grid.common.logic.TrafficSimulationEngine;
import lombok.Getter;

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
@Getter
public class SimulationChunkTask extends AbstractTask {

    /**
     * -- GETTER --
     *  Expose the full simulation parameters for this chunk.
     *  Workers will use this to configure the TrafficSimulationEngine.
     */
    private final SimulationParams params;
    private UUID jobId ;
    private MasterCallback masterCallback ;

    public SimulationChunkTask(UUID taskId, SimulationParams params) {
        super(taskId, buildParametersMap(params), params.getSeed());
        this.params = params;
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

    @Override
    public Result execute() {
        long startTime = System.currentTimeMillis();
        TrafficSimulationEngine engine = new TrafficSimulationEngine();
        SimulationResult chunkResult = null;

        try {
            System.out.println("Initialisation...");
            engine.initializeSimulation(params);

            System.out.println("Lancement de " + params.getIterations() + " itérations...");

            for (int i = 0; i < params.getIterations(); i++) {
                engine.updateIteration();
            }

            chunkResult = engine.getFinalResult();

        } catch (Exception e) {
            System.err.println("!!!Erreur critique lors de l'exécution de la Task " + getTaskId() + ": " + e.getMessage());
            e.printStackTrace();
            chunkResult = null;

        } finally {
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            System.out.println("Temps de calcul : " + duration + " ms");
        }

        System.out.println("Résultats finaux :");

        return chunkResult;
    }

    @Override
    public UUID getJobId() {
        return jobId;
    }

    @Override
    public void setJobId(UUID jobId) {
      this.jobId =jobId ;
    }

    @Override
    public MasterCallback getMasterCallback() {
        return masterCallback;
    }

    @Override
    public void setMasterCallback(MasterCallback masterCallback) {
        this.masterCallback =masterCallback ;
    }
}
