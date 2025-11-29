package com.grid.worker;

import com.grid.common.Worker;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.UUID;

public class WorkerImpl extends UnicastRemoteObject implements Worker {

    private final String workerId;

    public WorkerImpl() throws RemoteException {
        this.workerId = "Worker-" + UUID.randomUUID().toString().substring(0, 8);
        System.out.printf("Worker implementation created with ID: %s\n", this.workerId);
    }

    @Override
    public String getId() throws RemoteException {
        return this.workerId;
    }
}