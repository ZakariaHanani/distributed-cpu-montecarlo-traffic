package com.grid.common.Interfaces;

import com.grid.common.dto.JobResult;
import com.grid.common.model.SimulationParams;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.UUID;

/**
 * Master orchestrates the distributed execution of tasks.
 */
public interface IMaster extends Remote {

    /* ================= CLIENT API ================= */

    /**
     * Accept a task from a Client, split it, and assign chunks to Workers.
     */
    UUID submitTaskAsync(SimulationParams params) throws RemoteException;
//    Result submitTaskSync(SimulationParams params) throws RemoteException;

    // API for client ; depends only on common.
    JobResult getJobResult(UUID jobId) throws RemoteException;
    /**
     * Return the final aggregated result for a task.
     */


}
