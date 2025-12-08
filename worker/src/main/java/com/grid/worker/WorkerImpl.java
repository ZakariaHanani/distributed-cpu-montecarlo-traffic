package com.grid.worker;

import com.grid.common.IWorker;
import com.grid.common.Task;
import com.grid.common.Worker;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

public class WorkerImpl extends UnicastRemoteObject implements IWorker, Runnable, Worker {

    private final String workerId;
    @Override
    public void execute(Task task) throws RemoteException {
        synchronized (taskQueue) {
            taskQueue.add(task);
            System.out.println("LOG: Task received and added to queue at: " + System.currentTimeMillis());

            taskQueue.notifyAll();
        }
    }
    public WorkerImpl() throws RemoteException {
        this.workerId = "Worker-" + UUID.randomUUID().toString().substring(0, 8);
        System.out.printf("Worker implementation created with ID: %s\n", this.workerId);
    }

    @Override
    public String getId() throws RemoteException {
        return this.workerId;
    }

    private volatile boolean running = true;

    private final List<Task> taskQueue = new LinkedList<>();

    public void stopWorker() {
        this.running = false;
        synchronized (taskQueue) {
            taskQueue.notifyAll();
        }
    }

    @Override
    public void run() {
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
                System.out.println("LOG: Executing Task: " + taskToExecute.getTaskId()
                        + " at " + System.currentTimeMillis());

                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        System.out.println("LOG: Worker task loop finished execution gracefully.");
    }
}