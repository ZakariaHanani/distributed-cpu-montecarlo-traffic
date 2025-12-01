package com.grid.master.results;

import com.grid.common.Result;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class ResultCollectorTest {

    // Simple Result implementation for tests
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

    @Test
    void registerJob_and_addResults_marksCompletedWhenAllReceived() {
        ResultCollector collector = new ResultCollector();
        UUID jobId = UUID.randomUUID();

        collector.registerJob(jobId, 3);

        // Before any result
        var snapshot0 = collector.getSnapshot(jobId);
        assertEquals(JobStatus.PENDING, snapshot0.status());
        assertEquals(0, snapshot0.receivedChunks());

        // Add first batch (1 result)
        collector.addResults(jobId, List.of(new TestResult(UUID.randomUUID(), "W1")));

        var snapshot1 = collector.getSnapshot(jobId);
        assertEquals(JobStatus.RUNNING, snapshot1.status());
        assertEquals(1, snapshot1.receivedChunks());

        // Add second batch (2 results) -> total 3, job completes
        collector.addResults(jobId, List.of(
                new TestResult(UUID.randomUUID(), "W1"),
                new TestResult(UUID.randomUUID(), "W2")
        ));

        var snapshot2 = collector.getSnapshot(jobId);
        assertEquals(JobStatus.COMPLETED, snapshot2.status());
        assertEquals(3, snapshot2.receivedChunks());
        assertTrue(collector.isCompleted(jobId));

        // Check stored results count
        assertEquals(3, collector.getResults(jobId).size());
    }

    @Test
    void addResults_unknownJob_throwsException() {
        ResultCollector collector = new ResultCollector();
        UUID unknownJob = UUID.randomUUID();

        assertThrows(IllegalArgumentException.class, () ->
                collector.addResults(unknownJob, List.of(new TestResult(UUID.randomUUID(), "W1")))
        );
    }

    @Test
    void markJobFailed_setsStatusFailedAndMessage() {
        ResultCollector collector = new ResultCollector();
        UUID jobId = UUID.randomUUID();

        collector.registerJob(jobId, 2);
        collector.markJobFailed(jobId, "Worker timeout");

        var snapshot = collector.getSnapshot(jobId);
        assertEquals(JobStatus.FAILED, snapshot.status());
        assertEquals("Worker timeout", snapshot.errorMessage());
        assertFalse(collector.isCompleted(jobId));
    }
}
