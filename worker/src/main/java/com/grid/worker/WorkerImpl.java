package com.grid.worker;

import com.grid.common.Interfaces.*;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.rmi.registry.Registry;

public class WorkerImpl extends UnicastRemoteObject implements IWorker, Runnable, Worker {

    private final String workerId;
    private volatile boolean running = true;
    private final List<Task> taskQueue = new LinkedList<>();
    private final Registry registry;

    @Override
    public void execute(UUID jobId, Task task, MasterCallback callback) throws RemoteException{
        task.setJobId(jobId);
        task.setMasterCallback(callback);
        synchronized (taskQueue) {
            taskQueue.add(task);
            System.out.println("LOG: Task received and added to queue at: " + System.currentTimeMillis());
            taskQueue.notifyAll();
        }
    }

    public WorkerImpl(Registry registry) throws RemoteException {
        this.registry = registry;
        this.workerId = "Worker-" + UUID.randomUUID().toString().substring(0, 8);
        System.out.printf("Worker implementation created with ID: %s\n", this.workerId);
    }

    @Override
    public String getId() throws RemoteException {
        return this.workerId;
    }

    public void stopWorker() {
        this.running = false;
        synchronized (taskQueue) {
            taskQueue.notifyAll();
        }
    }

    public void sendResultWithRetry(UUID jobId, Result result, MasterCallback callback, Exception executionException) {

        if (executionException != null) {
            try {
                callback.onTaskFailed(jobId, "Execution failed: " + executionException.getMessage());
            } catch (RemoteException e) {
                System.err.println("FATAL: Failed to report execution failure to Master: " + e.getMessage());
            }
            return;
        }

        final int MAX_RETRIES = 3;
        final long RETRY_DELAY_MS = 1000;

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                callback.onTaskCompleted(jobId, result);
                System.out.println("LOG: Result for " + jobId + " sent successfully on attempt " + attempt);
                return;
            } catch (RemoteException e) {
                System.err.println("WARNING: Communication failed. Attempt " + attempt + "/" + MAX_RETRIES);
                if (attempt == MAX_RETRIES) {
                    try {
                        callback.onTaskFailed(jobId, "Communication failure after " + MAX_RETRIES + " retries.");
                    } catch (RemoteException ignored) {}
                } else {
                    try {
                        Thread.sleep(RETRY_DELAY_MS);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        return;
                    }
                }
            }
        }
    }

    @Override
    public void run() {
        try{
            while (running) {
            Task taskToExecute = null;

            synchronized (taskQueue) {
                while (taskQueue.isEmpty() && running) {
                    try {
                        taskQueue.wait();
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        this.running = false;
                        break;
                    }
                }

                if (!taskQueue.isEmpty()) {
                    taskToExecute = taskQueue.remove(0);
                }
            }

            if (taskToExecute != null) {
                Result result = null;
                Exception executionException = null;
                long startTimeMs = System.currentTimeMillis();
                try {
                    result = taskToExecute.execute();
                    System.out.println("LOG: Task " + taskToExecute.getTaskId() + " completed.");
                } catch (Exception e) {
                    executionException = e;
                    System.err.println("CRITICAL: Error during task execution: " + e.getMessage());
                }
                long elapsedMs = System.currentTimeMillis() - startTimeMs;
                if (result instanceof com.grid.common.model.SimulationResult simRes) {
                    simRes.setWorkerId(this.workerId);
                    simRes.setTaskId(taskToExecute.getTaskId());
                    simRes.setExecutionTimeMs(elapsedMs);
                }
                MasterCallback masterCallback = taskToExecute.getMasterCallback();
                UUID job_Id = taskToExecute.getJobId();
                if (masterCallback != null && job_Id != null) {
                    sendResultWithRetry(job_Id, result, masterCallback,executionException);
                }
            }
        }
        } catch (Exception fatalError) {
            System.err.println("FATAL ERROR in Worker run loop: " + fatalError.getMessage());
        } finally {
            try {
                if (registry != null) {
                    registry.unbind(this.workerId);
                    System.out.println("LOG: Worker " + this.workerId + " unbound from registry.");
                }

                UnicastRemoteObject.unexportObject(this, true);
                System.out.println("LOG: Worker unexported.");
            } catch (RemoteException | NotBoundException re) {
                System.err.println("ERROR during RMI unexport: " + re.getMessage());
            }
        }
        System.out.println("LOG: Worker task loop finished execution gracefully.");
    }
}
