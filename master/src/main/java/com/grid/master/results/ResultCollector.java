package com.grid.master.results;

import com.grid.common.dto.JobStatus;
import com.grid.common.model.SimulationResult;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Collects partial SimulationResults for distributed jobs.
 * Tracks job lifecycle and progress, but does NOT merge results.
 */
public class ResultCollector {

    /* ================= INTERNAL STATE ================= */

    private final ConcurrentMap<UUID, JobState> jobs = new ConcurrentHashMap<>();

    private static class JobState {
        final UUID jobId;
        final int expectedChunks;
        final List<SimulationResult> results = new ArrayList<>();

        int receivedChunks = 0;
        JobStatus status = JobStatus.PENDING;
        String errorMessage = null;

        JobState(UUID jobId, int expectedChunks) {
            this.jobId = jobId;
            this.expectedChunks = expectedChunks;
        }
    }

    /* ================= PUBLIC API ================= */

    /** Register a new distributed job. */
    public void registerJob(UUID jobId, int expectedChunks) {
        if (expectedChunks <= 0) {
            throw new IllegalArgumentException("expectedChunks must be > 0");
        }

        JobState state = new JobState(jobId, expectedChunks);
        JobState previous = jobs.putIfAbsent(jobId, state);

        if (previous != null) {
            throw new IllegalStateException("Job already registered: " + jobId);
        }
    }

    /** Mark job as running when dispatch starts. */
    public void markJobRunning(UUID jobId) {
        JobState state = getState(jobId);
        synchronized (state) {
            if (state.status == JobStatus.PENDING) {
                state.status = JobStatus.RUNNING;
            }
        }
    }

    /** Add partial results returned by workers. */
    public void addResults(UUID jobId, List<SimulationResult> partialResults) {
        if (partialResults == null || partialResults.isEmpty()) {
            return;
        }

        JobState state = getState(jobId);

        synchronized (state) {
            if (state.status == JobStatus.FAILED) {
                return; // ignore late results
            }

            if (state.status == JobStatus.PENDING) {
                state.status = JobStatus.RUNNING;
            }

            state.results.addAll(partialResults);
            state.receivedChunks += partialResults.size();

            if (state.receivedChunks >= state.expectedChunks) {
                state.status = JobStatus.COMPLETED;
            }
        }
    }

    /** Mark job as failed (e.g. worker crash, timeout). */
    public void markFailed(UUID jobId, String reason) {
        JobState state = getState(jobId);
        synchronized (state) {
            state.status = JobStatus.FAILED;
            state.errorMessage = reason;
        }
    }

    /** Check if job is completed. */
    public boolean isCompleted(UUID jobId) {
        JobState state = getState(jobId);
        synchronized (state) {
            return state.status == JobStatus.COMPLETED;
        }
    }

    /** Get immutable snapshot for monitoring or client polling. */
    public JobSnapshot getSnapshot(UUID jobId) {
        JobState state = getState(jobId);
        synchronized (state) {
            return new JobSnapshot(
                    state.jobId,
                    state.expectedChunks,
                    state.receivedChunks,
                    state.status,
                    state.errorMessage
            );
        }
    }

    /** Get collected partial results (used by ResultAggregator). */
    public List<SimulationResult> getResults(UUID jobId) {
        JobState state = getState(jobId);
        synchronized (state) {
            return List.copyOf(state.results);
        }
    }

    /* ================= IMMUTABLE VIEW ================= */

    public record JobSnapshot(
            UUID jobId,
            int expectedChunks,
            int receivedChunks,
            JobStatus status,
            String errorMessage
    ) {}

    /* ================= INTERNAL HELPERS ================= */

    private JobState getState(UUID jobId) {
        JobState state = jobs.get(jobId);
        if (state == null) {
            throw new IllegalArgumentException("Unknown job: " + jobId);
        }
        return state;
    }
}
