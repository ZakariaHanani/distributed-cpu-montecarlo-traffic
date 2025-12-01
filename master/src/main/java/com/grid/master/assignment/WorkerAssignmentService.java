package com.grid.master.assignment;

import com.grid.common.IWorker;
import com.grid.common.Result;
import com.grid.common.Task;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

public class WorkerAssignmentService {

    private final WorkerRegistry workerRegistry;

    public WorkerAssignmentService(WorkerRegistry workerRegistry) {
        this.workerRegistry = workerRegistry;
    }

    /**
     * Dispatch tasks to workers using round-robin.
     * One task -> one worker.execute(task) RMI call.
     */
    public List<Result> dispatchTasksRoundRobin(List<? extends Task> tasks) throws RemoteException {
        if (!workerRegistry.hasWorkers()) {
            throw new IllegalStateException("No workers are registered in the Master.");
        }

        List<Result> results = new ArrayList<>();

        for (Task task : tasks) {
            WorkerInfo chosen = workerRegistry
                    .nextAvailableWorkerRoundRobin()
                    .orElseThrow(() -> new IllegalStateException("No AVAILABLE workers to assign task."));

            IWorker workerStub = chosen.getStub();

            try {
                Result result = workerStub.execute(task);   // RMI call
                results.add(result);
            } catch (RemoteException e) {
                System.err.printf(
                        "[Master] RMI error when executing task %s on worker %s: %s%n",
                        task.getTaskId(),
                        chosen.getId(),
                        e.getMessage()
                );
                /*
                 TODO: re-queue task or try another worker
                 keep behaviour the same: let the caller handle it
                */
                throw e;
            }
        }


        return results;
    }
}