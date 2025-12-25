package com.grid.master.results;

import com.grid.common.model.SimulationResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Step 4.7 - Aggregates partial chunk results into one final result.
 */
public class ResultAggregator {

    public SimulationResult merge(List<SimulationResult> partialResults) {
        if (partialResults == null || partialResults.isEmpty()) {
            throw new IllegalArgumentException("partialResults must not be null or empty");
        }

        int totalJams = 0;

        double sumAverageSpeed = 0.0;
        double sumAccidentProbability = 0.0;

        double globalMinSpeed = Double.MAX_VALUE;
        double globalMaxSpeed = Double.MIN_VALUE;

        // Congestion aggregation
        Map<String, Double> congestionSum = new HashMap<>();
        Map<String, Integer> congestionCount = new HashMap<>();

        int validCount = 0;

        for (SimulationResult partial : partialResults) {
            if (partial == null) continue;

            validCount++;

            // 1️⃣ Jams → SUM
            totalJams += partial.getTotalJamsDetected();

            // 2️⃣ Average speed → AVERAGE
            sumAverageSpeed += partial.getAverageSpeed();

            // 3️⃣ Accident probability → AVERAGE
            sumAccidentProbability += partial.getAccidentProbability();

            // 4️⃣ Min / Max speed
            globalMinSpeed = Math.min(globalMinSpeed, partial.getMinSpeedObserved());
            globalMaxSpeed = Math.max(globalMaxSpeed, partial.getMaxSpeedObserved());

            // 5️⃣ Congestion heatmap
            Map<String, Double> partialCongestion = partial.getCongestionMap();
            if (partialCongestion != null) {
                for (Map.Entry<String, Double> entry : partialCongestion.entrySet()) {
                    if (entry.getValue() == null) continue;

                    congestionSum.merge(entry.getKey(), entry.getValue(), Double::sum);
                    congestionCount.merge(entry.getKey(), 1, Integer::sum);
                }
            }
        }

        double globalAverageSpeed =
                validCount == 0 ? 0.0 : sumAverageSpeed / validCount;

        double globalAccidentProbability =
                validCount == 0 ? 0.0 : sumAccidentProbability / validCount;

        // Final congestion averages per road
        Map<String, Double> mergedCongestion = new HashMap<>();
        for (Map.Entry<String, Double> entry : congestionSum.entrySet()) {
            String roadId = entry.getKey();
            double sum = entry.getValue();
            int count = congestionCount.getOrDefault(roadId, 1);
            mergedCongestion.put(roadId, sum / count);
        }

        return new SimulationResult(
                totalJams,
                globalAverageSpeed,
                mergedCongestion,
                globalMinSpeed == Double.MAX_VALUE ? 0.0 : globalMinSpeed,
                globalMaxSpeed == Double.MIN_VALUE ? 0.0 : globalMaxSpeed,
                globalAccidentProbability
        );
    }
}
