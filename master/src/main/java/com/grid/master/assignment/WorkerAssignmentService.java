package com.grid.master.assignment;

import com.grid.common.Interfaces.MasterCallback;
import com.grid.common.Interfaces.Task;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.List;
import java.util.UUID;

public class WorkerAssignmentService implements Remote {

    private final WorkerRegistry workerRegistry;

    public WorkerAssignmentService(WorkerRegistry workerRegistry) {
        this.workerRegistry = workerRegistry;
    }

    /**
     * Asynchronous dispatch:
     * Master sends jobs to workers and finishes immediately.
     * Workers will later call back MasterCallback.receivePartialResult(...)
     *
     * This is the "pro" distributed async workflow.
     */
    public void dispatchAsync(UUID jobId, List<? extends Task> tasks, MasterCallback callback)
            throws RemoteException {

        if (!workerRegistry.hasWorkers()) {
            throw new IllegalStateException("No workers are registered in the Master.");
        }

        for (Task task : tasks) {

            // Pick next worker
            WorkerInfo worker = workerRegistry
                    .nextAvailableWorkerRoundRobin()
                    .orElseThrow(() -> new IllegalStateException("No workers available"));

            // Call the async method in the worker
            // Worker will compute, then call callback.receivePartialResult(jobId, result)
            try {
            worker.getStub().execute(jobId, task, callback);
            }catch (RemoteException e){
                System.err.println("[Master] have problem in calling the [Worker]"+e);
            }
        }
    }
}
