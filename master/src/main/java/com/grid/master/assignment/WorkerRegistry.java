package com.grid.master.assignment;

import com.grid.common.IWorker;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class WorkerRegistry {

    private final List<WorkerInfo> workers = new ArrayList<>();
    private int nextIndex = 0;

    /** Register a new worker stub in memory. */
    public synchronized void registerWorker(String id, IWorker stub) {
        workers.add(new WorkerInfo(id, stub));
    }

    public synchronized boolean hasWorkers() {
        return !workers.isEmpty();
    }

    /**
     * Round-robin: returns the next AVAILABLE worker.
     * If none are available, returns Optional.empty().
     */
    public synchronized Optional<WorkerInfo> nextAvailableWorkerRoundRobin() {
        if (workers.isEmpty()) {
            return Optional.empty();
        }

        int scanned = 0;

        while (scanned < workers.size()) {
            WorkerInfo candidate = workers.get(nextIndex);
            nextIndex = (nextIndex + 1) % workers.size();
            scanned++;

            if (candidate.getStatus() == WorkerStatus.AVAILABLE) {
                return Optional.of(candidate);
            }
        }

        return Optional.empty(); // all workers OFFLINE/BUSY
    }

    /** For debugging / monitoring later if needed. */
    public synchronized List<WorkerInfo> snapshot() {
        return List.copyOf(workers);
    }
}
//all workers will usually be AVAILABLE, but this design is ready for future “busy/offline” logic