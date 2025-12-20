package com.grid.common;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.UUID;

/**
 * Worker executes a task chunk sent by Master.
 */
public interface IWorker extends Remote {
    /**
     * Execute a task chunk and return the Result.
     */
    void execute(UUID jobId, Task task, MasterCallback callback) throws RemoteException;
}
