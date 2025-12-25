package com.grid.master.results;

import com.grid.common.Interfaces.Result;
import com.grid.common.model.SimulationResult;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Collects partial Results for each job (taskId) on the Master node.
 * Stores them in memory and tracks completion status.
 *
 * 4.6 – Result Collector:
 *  - register a new job with expected number of chunks
 *  - add results as they come back from workers
 *  - know when a job is complete or failed
 *  - expose data so 4.7 can merge the results
 */
public class ResultCollector {

    private final ConcurrentMap<UUID, SimulationResult> finalResults = new ConcurrentHashMap<>();


    public void storeFinalResult(UUID jobId, SimulationResult finalResult) {
        if (finalResult == null) {
            throw new IllegalArgumentException("finalResult cannot be null");
        }
        finalResults.put(jobId, finalResult);
    }
/*
    public SimulationResult getFinalResult(UUID jobId) {
        SimulationResult res = finalResults.get(jobId);
        if (res == null) {
            System.out.println("job still running");
            //throw new IllegalStateException("Final result not yet available for job: " + jobId);
        }
        return res;
    }
    public JobResult getFinalResult(UUID jobId) {
        SimulationResult res = finalResults.get(jobId);

        if (res == null) {
            return new JobResult(JobStatus.RUNNING, null);
        }
        return new JobResult(JobStatus.COMPLETED, res);
    }
*/
public JobResult getFinalResult(UUID jobId) {
    JobState state = jobs.get(jobId);

    // If job not registered yet
    if (state == null) {
        return new JobResult(JobStatus.PENDING, null);
    }

    synchronized (state) {
        // If failed, return FAILED immediately (no final result)
        if (state.status == JobStatus.FAILED) {
            return new JobResult(JobStatus.FAILED, null);
        }
    }

    // Otherwise, check finalResults map
    SimulationResult res = finalResults.get(jobId);

    if (res == null) {
        return new JobResult(JobStatus.RUNNING, null);
    }
    return new JobResult(JobStatus.COMPLETED, res);
}




    /**
     * Internal mutable state for one job.
     * Not exposed directly outside this class.
     */
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

    /**
     * Immutable snapshot for external use (e.g., MasterImpl, future Aggregator).
     */
    public record JobSnapshot(
            UUID jobId,
            int expectedChunks,
            int receivedChunks,
            JobStatus status,
            String errorMessage
    ) {}

    private final ConcurrentMap<UUID, JobState> jobs = new ConcurrentHashMap<>();

    /**
     * Register a new job that will produce `expectedChunks` partial results.
     * Must be called once when Master starts processing a new task.
     */
    public void registerJob(UUID jobId, int expectedChunks) {
        if (expectedChunks <= 0) {
            throw new IllegalArgumentException("expectedChunks must be > 0");
        }

        JobState newState = new JobState(jobId, expectedChunks);
        JobState previous = jobs.putIfAbsent(jobId, newState);

        if (previous != null) {
            throw new IllegalStateException("Job already registered: " + jobId);
        }
    }

    /**
     * Optionally mark a job as RUNNING when we start dispatching chunks.
     */
    public void markJobRunning(UUID jobId) {
        JobState state = getStateOrThrow(jobId);
        synchronized (state) {
            if (state.status == JobStatus.PENDING) {
                state.status = JobStatus.RUNNING;
            }
        }
    }

    /**
     * Add a batch of results for the given job.
     * Called typically after WorkerAssignmentService finishes dispatching all chunks.
     *
     * If after adding, receivedChunks == expectedChunks => status becomes COMPLETED.
     */
    public void addResults(UUID jobId, List<? extends Result> partialResults) {
        if (partialResults == null || partialResults.isEmpty()) {
            return;
        }

        JobState state = getStateOrThrow(jobId);

        synchronized (state) {
            if (state.status == JobStatus.FAILED) {
                // If job already marked failed, we ignore late results.
                return;
            }

            if (state.status == JobStatus.PENDING) {
                state.status = JobStatus.RUNNING;
            }

            state.results.addAll((Collection<? extends SimulationResult>) partialResults);
            state.receivedChunks += partialResults.size();

            if (state.receivedChunks >= state.expectedChunks) {
                state.status = JobStatus.COMPLETED;
                // Merge results once
                SimulationResult finalResult = new ResultAggregator().merge(state.results);
                finalResults.put(state.jobId, finalResult);
                System.out.println("[Master] Job " + state.jobId + " completed.");
            }
        }
    }

    /**
     * Mark a job as FAILED and store a human-readable error.
     */
    public void markJobFailed(UUID jobId, String errorMessage) {
        JobState state = getStateOrThrow(jobId);
        synchronized (state) {
            state.status = JobStatus.FAILED;
            state.errorMessage = errorMessage;
        }
    }

    /**
     * Returns a lightweight, immutable snapshot of the job's current state.
     */
    public JobSnapshot getSnapshot(UUID jobId) {
        JobState state = getStateOrThrow(jobId);
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

    /**
     * Returns true if job exists and is completed.
     */
    public boolean isCompleted(UUID jobId) {
        JobState state = getStateOrThrow(jobId);
        synchronized (state) {
            return state.status == JobStatus.COMPLETED;
        }
    }

    /**
     * Get all partial Results for this job.
     * Used later in 4.7 to merge them into a final aggregated Result.
     */
    public List<SimulationResult> getResults(UUID jobId) {
        JobState state = getStateOrThrow(jobId);
        synchronized (state) {
            return List.copyOf(state.results); // defensive copy
        }
    }

    /**
     * Internal helper: get state or throw a clear exception.
     */
    private JobState getStateOrThrow(UUID jobId) {
        JobState state = jobs.get(jobId);
        if (state == null) {
            throw new IllegalArgumentException("No job registered with id: " + jobId);
        }
        return state;
    }

    public record JobResult(
            JobStatus status,
            SimulationResult result
    ) {}

}
