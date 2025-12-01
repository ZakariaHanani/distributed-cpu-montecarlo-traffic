package com.grid.common.logic;

import com.grid.common.model.SimulationResult;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class SimulationResultMergerTest {

    @Test
    void merge_sumsJamsAndAveragesSpeedAndCongestion() {
        SimulationResultMerger merger = new SimulationResultMerger();

        // Partial result #1
        SimulationResult r1 = new SimulationResult(
                3,                                  // total jams
                40.0,                               // avg speed
                Map.of(
                        "R01", 0.8,                 // 80% congestion
                        "R02", 0.4                  // 40%
                )
        );

        // Partial result #2
        SimulationResult r2 = new SimulationResult(
                5,
                60.0,
                Map.of(
                        "R01", 0.6,                 // 60%
                        "R03", 0.9                  // 90%
                )
        );

        SimulationResult merged = merger.merge(List.of(r1, r2));

        // Total jams => 3 + 5 = 8
        assertEquals(8, merged.getTotalJamsDetected());

        // Avg speed => (40 + 60) / 2 = 50
        assertEquals(50.0, merged.getAverageSpeed(), 0.0001);

        // Congestion:
        // R01 => (0.8 + 0.6) / 2 = 0.7
        // R02 => only in r1 => stays 0.4
        // R03 => only in r2 => stays 0.9
        Map<String, Double> congestion = merged.getCongestionMap();
        assertEquals(3, congestion.size());

        assertEquals(0.7, congestion.get("R01"), 0.0001);
        assertEquals(0.4, congestion.get("R02"), 0.0001);
        assertEquals(0.9, congestion.get("R03"), 0.0001);
    }

    @Test
    void merge_throwsOnEmptyList() {
        SimulationResultMerger merger = new SimulationResultMerger();

        assertThrows(IllegalArgumentException.class, () ->
                merger.merge(List.of())
        );
    }
}
