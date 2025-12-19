package com.grid.master;

import com.grid.common.*;
import com.grid.common.model.SimulationChunkTask;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
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

public class MasterImpl extends UnicastRemoteObject implements IMaster {

    private final WorkerRegistry workerRegistry;
    private final TaskSplitter splitter;
    private final WorkerAssignmentService assignmentService;
    private final ResultCollector collector;
    private final ResultAggregator aggregator;

    // Callback that workers will use in async mode
    private final MasterCallback callback;

    public MasterImpl() throws RemoteException {
        this.workerRegistry = new WorkerRegistry();
        this.splitter = new TaskSplitter();
        this.assignmentService = new WorkerAssignmentService(workerRegistry);
        this.collector = new ResultCollector();
        this.aggregator = new ResultAggregator();

        // Callback implementation for async tasks
        this.callback = new MasterCallbackImpl(collector);

         //discoverWorkers();
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
        if (workers == 0) throw new IllegalStateException("No workers registered!");

        //------------------------ Split the simulation into chunks --------------------------------
        List<SimulationChunkTask> chunks = splitter.splitForWorkers(params, workers);

        // -----------------------Register the job in collector (count how many chunks) -------------------------------
        collector.registerJob(jobId, chunks.size());
        collector.markJobRunning(jobId);

        //---------------------- Async dispatch — Master does !!!!****not*****!!!!!! wait --------------------------------
        assignmentService.dispatchAsync(jobId, chunks, callback);

        //---------------------------- Master returns immediately -------------------------------
        return jobId;
    }

    /**
     * Client asks for the final result (async mode)
     * Master returns it if ready, or null if still running.
     */
    @Override
    public ResultCollector.JobResult getFinalResult(UUID jobId) throws RemoteException {
        return collector.getFinalResult(jobId);
    }

    /**
     * Synchronous version:
     * Master waits until *all* workers finish, then merges and returns.
     */
    @Override
    public Result submitTaskSync(SimulationParams params) throws RemoteException {

        System.out.println("[Master] Received simulation request. <<<<Synchronized Mode>>>>");

        UUID jobId = UUID.randomUUID();

        int workerCount = workerRegistry.size();
        if (workerCount == 0) {
            throw new IllegalStateException("[Master] No workers registered!");
        }

        //------------------------ Step 1: Split simulation into chunks --------------------------------
        List<SimulationChunkTask> chunks =
                splitter.splitForWorkers(params, workerCount);

        System.out.printf("[Master] Created %d chunks.\n", chunks.size());

        collector.registerJob(jobId, chunks.size());
        collector.markJobRunning(jobId);

        //------------------------ Step 2: Dispatch tasks (blocking) ------------------------------
        List<Result> partialResults;
        try {
            partialResults = assignmentService.dispatchTasksRoundRobin(chunks);

        } catch (RemoteException e) {
            collector.markJobFailed(jobId, "[Master] Worker communication error.");
            throw e;
        }

        // --------------------------- Step 3: Store partial  -----------------------------------
        collector.addResults(jobId, partialResults); //What is the purpos of the collector if will add the results at once(Fhamtini assat)

        // -----------------------Step 4: Validate everything is received --------------------------
        if (!collector.isCompleted(jobId)) {
            System.err.println("[Master] ERROR: Not all results were received!");
            collector.markJobFailed(jobId, "Incomplete results.");
            return null;
        }

        // ---------------------------- Step 5: Merge (aggregation 4.7) -------------------------------------------
        List<SimulationResult> allParts = collector.getResults(jobId);
        Result finalResult = aggregator.merge(allParts);

        System.out.println("[Master] Aggregation complete. Returning final result.");

        return finalResult;
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
                if (name.startsWith("worker-")) {

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
