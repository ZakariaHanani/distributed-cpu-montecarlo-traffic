package com.grid.master.assignment;

import com.grid.common.IWorker;
import com.grid.common.Result;
import com.grid.common.Task;
import com.grid.common.model.SimulationChunkTask;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.Weather;
import org.junit.jupiter.api.Test;

import java.rmi.RemoteException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class WorkerAssignmentServiceTest {

    // Simple Result implementation only for tests
    static class TestResult implements Result {
        private final UUID taskId;
        private final String workerId;
        private final Map<String, Object> metrics;
        private final long execTimeMs;

        TestResult(UUID taskId, String workerId) {
            this.taskId = taskId;
            this.workerId = workerId;
            this.metrics = Map.of();
            this.execTimeMs = 0L;
        }

        @Override public UUID getTaskId() { return taskId; }
        @Override public String getWorkerId() { return workerId; }
        @Override public Map<String, Object> getMetrics() { return metrics; }
        @Override public long getExecutionTimeMs() { return execTimeMs; }
    }

    // Fake worker that just remembers which tasks it executed
    static class RecordingWorker implements IWorker {
        private final String id;
        private final List<Task> receivedTasks = new ArrayList<>();

        RecordingWorker(String id) {
            this.id = id;
        }

        @Override
        public Result execute(Task task) throws RemoteException {
            receivedTasks.add(task);
            return new TestResult(task.getTaskId(), id);
        }

        public List<Task> getReceivedTasks() {
            return receivedTasks;
        }

        public String getId() {
            return id;
        }
    }

    private SimulationChunkTask createChunkTask(SimulationParams baseParams) {
        // For this test we don’t care about exact iterations,
        // just need a valid SimulationChunkTask with a UUID.
        return new SimulationChunkTask(UUID.randomUUID(), baseParams);
    }

    @Test
    void dispatchTasksRoundRobin_distributesTasksEvenly() throws Exception {
        // Given: base simulation params
        SimulationParams params = new SimulationParams(
                50,          // numberOfCars
                100,         // iterations
                Weather.SUNNY,
                true,
                1234L        // seed
        );

        // And: 4 chunk tasks
        List<SimulationChunkTask> chunks = List.of(
                createChunkTask(params),
                createChunkTask(params),
                createChunkTask(params),
                createChunkTask(params)
        );

        // And: 2 workers registered in the registry
        RecordingWorker w1 = new RecordingWorker("Worker-1");
        RecordingWorker w2 = new RecordingWorker("Worker-2");

        WorkerRegistry registry = new WorkerRegistry();
        registry.registerWorker("Worker-1", w1);
        registry.registerWorker("Worker-2", w2);

        WorkerAssignmentService service = new WorkerAssignmentService(registry);

        // When: we dispatch tasks
        List<Result> results = service.dispatchTasksRoundRobin(chunks);

        // Then: we get one Result per task
        assertEquals(4, results.size(), "We should get 4 results (one per chunk)");

        // And: round-robin assignment → W1 gets 2, W2 gets 2
        assertEquals(2, w1.getReceivedTasks().size(), "Worker-1 should get 2 tasks");
        assertEquals(2, w2.getReceivedTasks().size(), "Worker-2 should get 2 tasks");
    }

    @Test
    void dispatchTasksRoundRobin_throwsIfNoWorkers() {
        SimulationParams params = new SimulationParams(
                10, 20, Weather.SUNNY, true, 1L
        );

        List<SimulationChunkTask> chunks = List.of(
                createChunkTask(params)
        );

        WorkerRegistry registry = new WorkerRegistry(); // no workers
        WorkerAssignmentService service = new WorkerAssignmentService(registry);

        assertThrows(IllegalStateException.class,
                () -> service.dispatchTasksRoundRobin(chunks),
                "Should fail if there are no registered workers");
    }
}
