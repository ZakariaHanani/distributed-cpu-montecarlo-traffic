package com.grid.common;

import com.grid.common.model.SimulationParams;

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

    UUID submitTaskAsync(SimulationParams params) throws RemoteException;
    Result submitTaskSync(SimulationParams params) throws RemoteException;
    /**
     * Return the final aggregated result for a task.
     */
     Record getFinalResult(UUID taskId) throws RemoteException;
}
