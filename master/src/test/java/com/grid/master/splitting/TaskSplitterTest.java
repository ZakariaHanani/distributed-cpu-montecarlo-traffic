package com.grid.master.splitting;

import com.grid.common.model.SimulationChunkTask;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.Weather;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TaskSplitterTest {

    @Test
    void splitForWorkers_distributesIterationsFairly_whenDivisible() {
        // 100 iterations, 4 workers => 25,25,25,25
        SimulationParams globalParams = new SimulationParams(
                50,          // numberOfCars
                100,         // iterations
                Weather.SUNNY,
                true,        // trafficLightsEnabled
                12345L       // seed
        );

        TaskSplitter splitter = new TaskSplitter();

        List<SimulationChunkTask> chunks = splitter.splitForWorkers(globalParams, 4);

        assertEquals(4, chunks.size(), "Should create one chunk per worker");

        // Each chunk should have 25 iterations and same other params
        for (SimulationChunkTask chunk : chunks) {
            SimulationParams p = chunk.getParams();
            assertEquals(25, p.getIterations());
            assertEquals(globalParams.getNumberOfCars(), p.getNumberOfCars());
            assertEquals(globalParams.getWeather(), p.getWeather());
            assertEquals(globalParams.isTrafficLightsEnabled(), p.isTrafficLightsEnabled());
        }
    }

    @Test
    void splitForWorkers_distributesIterationsFairly_withRemainder() {
        // 10 iterations, 3 workers => 4,3,3 (or 3,4,3 etc.)
        SimulationParams globalParams = new SimulationParams(
                20,
                10,
                Weather.RAINY,
                false,
                999L
        );

        TaskSplitter splitter = new TaskSplitter();

        List<SimulationChunkTask> chunks = splitter.splitForWorkers(globalParams, 3);

        assertEquals(3, chunks.size(), "Should create at most one chunk per worker");

        int totalIterations = chunks.stream()
                .mapToInt(c -> c.getParams().getIterations())
                .sum();

        assertEquals(10, totalIterations, "Total iterations of chunks must equal global iterations");

        long count4 = chunks.stream()
                .filter(c -> c.getParams().getIterations() == 4)
                .count();

        long count3 = chunks.stream()
                .filter(c -> c.getParams().getIterations() == 3)
                .count();

        assertEquals(1, count4, "Exactly one chunk should have 4 iterations");
        assertEquals(2, count3, "Two chunks should have 3 iterations");
    }

    @Test
    void splitForWorkers_throwsWhenWorkersZeroOrNegative() {
        SimulationParams params = new SimulationParams(
                10,
                100,
                Weather.SUNNY,
                true,
                1L
        );

        TaskSplitter splitter = new TaskSplitter();

        assertThrows(IllegalArgumentException.class,
                () -> splitter.splitForWorkers(params, 0));

        assertThrows(IllegalArgumentException.class,
                () -> splitter.splitForWorkers(params, -1));
    }

    @Test
    void splitForWorkers_throwsWhenIterationsNotPositive() {
        SimulationParams paramsZero = new SimulationParams(
                10,
                0,
                Weather.SUNNY,
                true,
                1L
        );

        SimulationParams paramsNegative = new SimulationParams(
                10,
                -5,
                Weather.SUNNY,
                true,
                1L
        );

        TaskSplitter splitter = new TaskSplitter();

        assertThrows(IllegalArgumentException.class,
                () -> splitter.splitForWorkers(paramsZero, 3));

        assertThrows(IllegalArgumentException.class,
                () -> splitter.splitForWorkers(paramsNegative, 3));
    }
}
