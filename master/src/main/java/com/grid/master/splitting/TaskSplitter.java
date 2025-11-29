package com.grid.master.splitting;

import com.grid.common.model.SimulationChunkTask;
import com.grid.common.model.SimulationParams;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Responsibility:
 *  - Take a global SimulationParams (N total iterations)
 *  - Take a number of workers
 *  - Split into K SimulationChunkTask objects

 * Each chunk will be executed by ONE worker.
 */
public class TaskSplitter {

    /**
     * Split a global simulation into chunks for each worker.
     *
     * @param globalParams   the original simulation parameters (N iterations)
     * @param numberOfWorkers how many workers are available
     * @return list of SimulationChunkTask, one per chunk
     */
    public List<SimulationChunkTask> splitForWorkers(SimulationParams globalParams, int numberOfWorkers) {
        if (numberOfWorkers <= 0) {
            throw new IllegalArgumentException("numberOfWorkers must be > 0");
        }

        int totalIterations = globalParams.getIterations();
        if (totalIterations <= 0) {
            throw new IllegalArgumentException("total iterations must be > 0");
        }

        // Basic fair-split:
        // Example: 1000 iterations, 3 workers =>
        //  334, 333, 333
        int baseChunkSize = totalIterations / numberOfWorkers;
        int remainder = totalIterations % numberOfWorkers;

        List<SimulationChunkTask> chunks = new ArrayList<>();
        long baseSeed = globalParams.getSeed();

        for (int i = 0; i < numberOfWorkers; i++) {
            int iterationsForThisWorker = baseChunkSize + (i < remainder ? 1 : 0);
            if (iterationsForThisWorker <= 0) {
                // If there are more workers than iterations, some workers get nothing
                continue;
            }

            long chunkSeed = baseSeed + i;

            // Create a NEW SimulationParams for this chunk, with fewer iterations + new seed
            SimulationParams chunkParams = new SimulationParams(
                    globalParams.getNumberOfCars(),
                    iterationsForThisWorker,
                    globalParams.getWeather(),
                    globalParams.isTrafficLightsEnabled(),
                    chunkSeed
            );

            SimulationChunkTask chunkTask = new SimulationChunkTask(
                    UUID.randomUUID(),
                    chunkParams
            );

            chunks.add(chunkTask);
        }

        return chunks;
    }
}
