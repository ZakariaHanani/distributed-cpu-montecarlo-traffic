package com.grid.common;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.UUID;

/**
 * Master orchestrates the distributed execution of tasks.
 */
public interface IMaster extends Remote {
    /**
     * Accept a task from a Client, split it, and assign chunks to Workers.
     */
    UUID submitTask(Task task) throws RemoteException;

    /**
     * Return the final aggregated result for a task.
     */
    Result getFinalResult(UUID taskId) throws RemoteException;
}
