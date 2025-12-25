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
     * Dispatch tasks synchronously using round-robin.
     * Each task is executed immediately (blocking) by calling worker.execute(task).
     *
     * This is the "simple" synchronous flow.
     */
//    public List<Result> dispatchTasksRoundRobin(List<? extends Task> tasks) throws RemoteException {
//        if (!workerRegistry.hasWorkers()) {
//            throw new IllegalStateException("No workers are registered in the Master.");
//        }
//
//        List<Result> results = new ArrayList<>();
//
//        for (Task task : tasks) {
//            WorkerInfo chosen = workerRegistry
//                    .nextAvailableWorkerRoundRobin()
//                    .orElseThrow(() -> new IllegalStateException("No AVAILABLE workers to assign task."));
//            IWorker workerStub = chosen.getStub();
//
//            try {
//                // This is a blocking RMI call
//                // Master waits for worker to finish
//                Result result = workerStub.execute(task);
//                results.add(result);
//
//            } catch (RemoteException e) {
//                System.err.printf(
//                        "[Master] RMI error when executing task %s on worker %s: %s%n",
//                        task.getTaskId(),
//                        chosen.getId(),
//                        e.getMessage()
//                );
//
//                /*
//                 TODO: re-try logic or requeue the task
//                 For now, we rethrow so the caller (MasterImpl) handles it.
//                 */
//                throw e;
//            }
//        }
//
//        return results;
//    }

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
