package com.grid.common;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * Worker executes a task chunk sent by Master.
 */
public interface IWorker extends Remote {
    /**
     * Execute a task chunk and return the Result.
     */
    Result execute(Task task) throws RemoteException;
}
