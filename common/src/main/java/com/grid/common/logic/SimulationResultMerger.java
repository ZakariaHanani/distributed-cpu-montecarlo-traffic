package com.grid.common.logic;

import com.grid.common.model.SimulationResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Utility responsible for merging multiple partial SimulationResult objects
 * (one per worker / chunk) into a single aggregated SimulationResult.
 *
 *     Aggregation rules:
 *  - totalJamsDetected  -> SUM over all partial results
 *  - averageSpeed       -> arithmetic MEAN of all partial averageSpeed values
 *  - congestionMap      -> for each roadId, arithmetic MEAN of all congestion
 *                          values that contain this roadId
 *
 * This class is pure and stateless: it does not store anything.
 * It simply merges what you pass in.
 */
public class SimulationResultMerger {

    /**
     * Merge a non-empty list of SimulationResult into a single aggregated result.
     *
     * @param partialResults list of partial SimulationResult objects (one per worker / chunk)
     * @return a new SimulationResult containing the aggregated statistics
     * @throws IllegalArgumentException if partialResults is null or empty
     */
    public SimulationResult merge(List<SimulationResult> partialResults) {
        if (partialResults == null || partialResults.isEmpty()) {
            throw new IllegalArgumentException("partialResults must not be null or empty");
        }

        // 1) Sum of jams
        int totalJams = 0;

        // 2) Average of speeds
        double sumAverageSpeeds = 0.0;

        // 3) Per-road congestion aggregation
        Map<String, Double> congestionSum = new HashMap<>();
        Map<String, Integer> congestionCount = new HashMap<>();

        for (SimulationResult partial : partialResults) {
            if (partial == null) continue; // defensive – ignore null entries

            // 1) sum jams
            totalJams += partial.getTotalJamsDetected();

            // 2) sum of average speeds
            sumAverageSpeeds += partial.getAverageSpeed();

            // 3) merge congestion maps
            Map<String, Double> partialCongestion = partial.getCongestionMap();
            if (partialCongestion != null) {
                for (Map.Entry<String, Double> entry : partialCongestion.entrySet()) {
                    String roadId = entry.getKey();
                    Double value = entry.getValue();
                    if (value == null) continue;

                    congestionSum.merge(roadId, value, Double::sum);
                    congestionCount.merge(roadId, 1, Integer::sum);
                }
            }
        }

        int count = partialResults.size();
        double globalAverageSpeed = (count == 0) ? 0.0 : (sumAverageSpeeds / count);

        // Final congestion averages per road
        Map<String, Double> mergedCongestion = new HashMap<>();
        for (Map.Entry<String, Double> entry : congestionSum.entrySet()) {
            String roadId = entry.getKey();
            double sum = entry.getValue();
            int c = congestionCount.getOrDefault(roadId, 1);
            mergedCongestion.put(roadId, sum / c);
        }

        // NOTE:
        // Your SimulationResult currently has fields:
        //   - totalJamsDetected
        //   - averageSpeed
        //   - averageTravelTime
        //   - congestionMap
        // but the constructor you showed uses:
        //   SimulationResult(int totalJams, double avgSpeed, Map<String, Double> congestionMap)
        //
        // So here we fill those three. You can extend it later if you add more metrics.
        return new SimulationResult(totalJams, globalAverageSpeed, mergedCongestion);
    }
}
