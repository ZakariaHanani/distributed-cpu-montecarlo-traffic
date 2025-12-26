package com.grid.master;

import com.grid.common.*;
import com.grid.common.Interfaces.Heartbeat;
import com.grid.common.Interfaces.IMaster;
import com.grid.common.Interfaces.IWorker;
import com.grid.common.Interfaces.MasterCallback;
import com.grid.common.model.SimulationChunkTask;
import com.grid.common.model.SimulationParams;

import com.grid.common.dto.JobResult;
import com.grid.common.dto.JobStatus;

import com.grid.common.model.SimulationResult;
import com.grid.master.assignment.WorkerAssignmentService;
import com.grid.master.assignment.WorkerRegistry;
import com.grid.master.results.ResultAggregator;
import com.grid.master.results.ResultCollector;
import com.grid.master.splitting.TaskSplitter;

import java.io.Serializable;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class MasterImpl implements IMaster, Heartbeat {

    private final WorkerRegistry workerRegistry;
    private final TaskSplitter splitter;
    private final WorkerAssignmentService assignmentService;
    private final ResultCollector collector;
    private final ResultAggregator aggregator;

    // Callback that workers will use in async mode
    private final MasterCallback callback;

    public MasterImpl() throws RemoteException {
        this.workerRegistry = new WorkerRegistry();
        //discoverWorkers();
        this.splitter = new TaskSplitter();
        this.assignmentService = new WorkerAssignmentService(workerRegistry);
        this.collector = new ResultCollector();
        this.aggregator = new ResultAggregator();
        // Callback implementation for async tasks
        this.callback = new MasterCallbackImpl(collector);


        ScheduledExecutorService scheduler =
                Executors.newSingleThreadScheduledExecutor();

        scheduler.scheduleAtFixedRate(() -> {
            workerRegistry.cleanupDeadWorkers();
        }, 5, 5, TimeUnit.SECONDS);
    }

    /**
     * Submit a task asynchronously.
     * Master returns immediately with jobId.
     * Workers will call callback when they finish.
     */
    @Override
    public UUID submitTaskAsync(SimulationParams params) throws RemoteException {

        UUID jobId = UUID.randomUUID();

        int workers = workerRegistry.size();
        if (workers == 0) throw new IllegalStateException("No workers registered!"+workers);

        //------------------------ Split the simulation into chunks --------------------------------
        List<SimulationChunkTask> chunks = splitter.splitForWorkers(params, workers);

        // -----------------------Register the job in collector (count how many chunks) -------------------------------
        collector.registerJob(jobId, chunks.size());
        collector.markJobRunning(jobId);

        //---------------------- Async dispatch — Master does !!!!****not*****!!!!!! wait --------------------------------
        try{
            assignmentService.dispatchAsync(jobId, chunks, callback);
        }catch(RemoteException e){
             e.printStackTrace();
        }

        //---------------------------- Master returns immediately -------------------------------
        return jobId;
    }

    /**
     * API for client depends only on common.
     */
    @Override
    public JobResult getJobResult(UUID jobId) throws RemoteException {

        ResultCollector.JobSnapshot snap;

        // If jobId not registered, treat as PENDING or 'return FAILED'
        try {
            snap = collector.getSnapshot(jobId);
        } catch (IllegalArgumentException e) {
            return new JobResult(JobStatus.PENDING, null, null);
        }

        JobStatus mapped = mapStatus(snap.status());

         // Only fetch result if completed
        com.grid.common.model.SimulationResult result = null;
        if (collector.isCompleted(jobId)) {
            // Now safe: final result exists
           result = aggregator.merge(collector.getResults(jobId));

        }

        // Use snapshot error message when FAILED
        String error = (mapped == JobStatus.FAILED) ? snap.errorMessage() : null;

        return new JobResult(mapped, result, error);
    }
    /**
     * explicit mapping
     */
    private static JobStatus mapStatus(JobStatus s) {
        return switch (s) {
            case PENDING -> JobStatus.PENDING;
            case RUNNING -> JobStatus.RUNNING;
            case COMPLETED -> JobStatus.COMPLETED;
            case FAILED -> JobStatus.FAILED;
        };
    }



    public WorkerRegistry getWorkerRegistry() {
        return workerRegistry;
    }


    @Override
    public synchronized void registerWorker(String workerId, IWorker worker)
            throws RemoteException {

        workerRegistry.registerWorker(workerId, worker);
        System.out.println("[Master] Worker registered: " + workerId);
    }


    @Override
    public synchronized void heartbeat(String workerId) throws RemoteException {
        workerRegistry.heartbeat(workerId);
    }

    @Override
    public synchronized void unregisterWorker(String workerId)
            throws RemoteException {

        workerRegistry.removeWorker(workerId);
        System.out.println("[Master] Worker unregistered: " + workerId);
    }
}
