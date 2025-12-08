package com.grid.master;


import com.grid.common.IMaster;
import com.grid.common.Result;
import com.grid.common.Task;
import com.grid.common.model.SimulationChunkTask;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
import com.grid.master.assignment.WorkerAssignmentService;
import com.grid.master.assignment.WorkerRegistry;
import com.grid.master.results.ResultAggregator;
import com.grid.master.results.ResultCollector;
import com.grid.master.splitting.TaskSplitter;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.List;
import java.util.UUID;


public class MasterImpl extends UnicastRemoteObject implements IMaster {

    private final WorkerRegistry workerRegistry;
    private final TaskSplitter splitter;
    private final WorkerAssignmentService assignmentService;
    private final ResultCollector collector;
    private final ResultAggregator aggregator;

    protected MasterImpl() throws RemoteException {
        super();
        this.workerRegistry = new WorkerRegistry();
        this.splitter = new TaskSplitter();
        this.assignmentService = new WorkerAssignmentService(workerRegistry);
        this.collector = new ResultCollector();
        this.aggregator = new ResultAggregator();
    }


    @Override
    public Result submitTask(SimulationParams params) throws RemoteException {
        System.out.println("[Master] Received simulation request.");
       return submitSimulationSync(params) ;
    }

    @Override
    public Result getFinalResult(UUID taskId) throws RemoteException {
        return null;
    }

    private Result submitSimulationSync(SimulationParams params) throws  RemoteException{

        // ------------------------- STEP 1: Prepare job --------------------------------
        UUID jobId = UUID.randomUUID();

        // Get number of available workers
        int workerCount = workerRegistry.size();
        if (workerCount == 0) {
            throw new IllegalStateException("[Master] No workers registered!");
        }

        // ------------------------- STEP 2: Split task -----------------------------------
        List<SimulationChunkTask> chunks =
                splitter.splitForWorkers(params, workerCount);

        System.out.printf("[Master] Created %d chunks.\n", chunks.size());

        // ------------------------- STEP 3: Register job ---------------------------------
        collector.registerJob(jobId, chunks.size());
        collector.markJobRunning(jobId);

        // ------------------------- STEP 4: Dispatch tasks to workers --------------------
        List<Result> partialResults;
        try {
            partialResults = assignmentService.dispatchTasksRoundRobin(chunks);
        } catch (RemoteException e) {
            collector.markJobFailed(jobId, "[Master] Worker communication error.");
            throw e;
        }

        // ------------------------- STEP 5: Collect results ------------------------------
        collector.addResults(jobId, partialResults);

        // ------------------------- STEP 6: Check completeness ---------------------------
        if (!collector.isCompleted(jobId)) {
            // This should not happen in a synchronous design
            System.err.println("[Master] ERROR: Not all results were received!");
            collector.markJobFailed(jobId, "Incomplete results.");
            return null;
        }

        // ------------------------- STEP 7: Merge results (4.7) --------------------------
        List<SimulationResult> allParts = collector.getResults(jobId);
        Result finalResult = aggregator.merge(allParts);

        System.out.println("[Master] Aggregation complete. Sending final result.");
        return finalResult;
    }


}





