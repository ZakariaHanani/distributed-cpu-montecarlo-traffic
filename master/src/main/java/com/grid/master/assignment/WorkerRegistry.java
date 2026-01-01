package com.grid.master.assignment;

import com.grid.common.Interfaces.IWorker;

import java.util.*;

public class WorkerRegistry {

    private final List<WorkerInfo> workers = new ArrayList<>();
    private final Map<String, WorkerInfo> byId = new HashMap<>();
    private int nextIndex = 0;


    /** Register a new worker stub in memory. */
    public synchronized void registerWorker(String id, IWorker stub) {
        if (byId.containsKey(id)) {
            return; // avoid duplicates
        }

        WorkerInfo info = new WorkerInfo(id, stub);
        workers.add(info);
        byId.put(id, info);

        System.out.println("[Registry] Worker registered: " + id);
    }

    public synchronized boolean hasWorkers() {
        return !workers.isEmpty();
    }

    /**
     * Round-robin: returns the next AVAILABLE worker.
     * If none are available, returns Optional.empty().
     */
    public synchronized Optional<WorkerInfo> nextAvailableWorkerRoundRobin() {
        if (workers.isEmpty()) return Optional.empty();

        int scanned = 0;

        while (scanned < workers.size()) {
            WorkerInfo candidate = workers.get(nextIndex);
            nextIndex = (nextIndex + 1) % workers.size();
            scanned++;

            if (candidate.getStatus() == WorkerStatus.AVAILABLE) {
                return Optional.of(candidate);
            }
        }
        return Optional.empty();
    }



    public int size(){
        return workers.size() ;
    }

    /** For debugging / monitoring later if needed. */
    public synchronized List<WorkerInfo> snapshot() {
        return List.copyOf(workers);
    }

    public synchronized void heartbeat(String workerId) {
        WorkerInfo worker = byId.get(workerId);
        if (worker != null) {
            worker.heartbeat();
        }
    }
    public synchronized void removeWorker(String workerId) {
        WorkerInfo worker = byId.remove(workerId);
        if (worker != null) {
            workers.remove(worker);
            System.out.println("[Registry] Worker removed: " + workerId);
        }
    }

    private static final long TIMEOUT_MS = 30_000;

    public synchronized void cleanupDeadWorkers() {
        long now = System.currentTimeMillis();

        workers.removeIf(worker -> {
            boolean dead = now - worker.lastSeen() > TIMEOUT_MS;
            if (dead) {
                byId.remove(worker.getId());
                System.out.println("[Registry] Worker timed out: " + worker.getId());
            }
            return dead;
        });

        // Fix round-robin index
        if (nextIndex >= workers.size()) {
            nextIndex = 0;
        }
    }



}
