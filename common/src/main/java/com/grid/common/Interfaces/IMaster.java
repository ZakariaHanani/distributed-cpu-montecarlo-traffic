package com.grid.common.Interfaces;

import com.grid.common.dto.JobResult;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;
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
     * Get the number of registered workers.
     */
    int getWorkerCount() throws RemoteException;

    /**
     * Return partial results computed by workers for a given job.
     */
    List<SimulationResult> getJobPartials(UUID jobId) throws RemoteException;


}
