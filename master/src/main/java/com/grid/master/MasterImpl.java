package com.grid.master;

import com.grid.common.*;
import com.grid.common.Interfaces.IMaster;
import com.grid.common.Interfaces.IWorker;
import com.grid.common.Interfaces.MasterCallback;
import com.grid.common.model.SimulationChunkTask;
import com.grid.common.model.SimulationParams;

import com.grid.common.dto.JobResult;
import com.grid.common.dto.JobStatus;

import com.grid.master.assignment.WorkerAssignmentService;
import com.grid.master.assignment.WorkerRegistry;
import com.grid.master.results.ResultAggregator;
import com.grid.master.results.ResultCollector;
import com.grid.master.splitting.TaskSplitter;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class MasterImpl implements IMaster {

    private final WorkerRegistry workerRegistry;
    private final TaskSplitter splitter;
    private final WorkerAssignmentService assignmentService;
    private final ResultCollector collector;
    private final ResultAggregator aggregator;

    // Callback that workers will use in async mode
    private final MasterCallback callback;

    public MasterImpl() throws RemoteException {
        this.workerRegistry = new WorkerRegistry();
        discoverWorkers();
        this.splitter = new TaskSplitter();
        this.assignmentService = new WorkerAssignmentService(workerRegistry);
        this.collector = new ResultCollector();
        this.aggregator = new ResultAggregator();

        // Callback implementation for async tasks
        this.callback = new MasterCallbackImpl(collector);

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
        System.out.println("Workers size "+workers);
        if (workers == 0) throw new IllegalStateException("No workers registered!"+workers);

        //------------------------ Split the simulation into chunks --------------------------------
        List<SimulationChunkTask> chunks = splitter.splitForWorkers(params, workers);

        // -----------------------Register the job in collector (count how many chunks) -------------------------------
        collector.registerJob(jobId, chunks.size());
        System.out.println("The job is registred");
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
     * Client asks for the final result (async mode)
     * Master returns it if ready, or null if still running.
     */

    @Override
    public Record /* ResultCollector.JobResult */ getFinalResult(UUID jobId) throws RemoteException {
        return collector.getFinalResult(jobId);     // must match IMaster signature exactly.
    }
    public ResultCollector.JobResult getFinalResultInternal(UUID jobId) {
        return collector.getFinalResult(jobId);
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
        if (mapped == JobStatus.COMPLETED) {
            // Now safe: final result exists
            ResultCollector.JobResult jr = collector.getFinalResult(jobId);
            result = jr.result();
        }

        // Use snapshot error message when FAILED
        String error = (mapped == JobStatus.FAILED) ? snap.errorMessage() : null;

        return new JobResult(mapped, result, error);
    }
    /**
     * explicit mapping
     */
    private static JobStatus mapStatus(com.grid.master.results.JobStatus s) {
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

    private void discoverWorkers() {
        try {
            String host = configLoader.get("registry.host");
            int port = configLoader.getInt("registry.port");
            Registry registry = LocateRegistry.getRegistry(host, port);

            String[] names = registry.list();
            System.out.println("[Master] RMI registry contains: " + Arrays.toString(names));

            for (String name : names) {
                if (name.startsWith("Worker-")) {

                    IWorker workerStub = (IWorker) registry.lookup(name);

                    workerRegistry.registerWorker(name, workerStub);

                    System.out.println("[Master] Registered worker: " + name);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
