package com.grid.master;

import com.grid.common.MasterCallback;
import com.grid.common.Result;
import com.grid.common.Task;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
import com.grid.common.model.Weather;
import com.grid.master.assignment.WorkerAssignmentService;
import com.grid.master.assignment.WorkerRegistry;
import com.grid.master.results.ResultAggregator;
import com.grid.master.results.ResultCollector;
import com.grid.master.splitting.TaskSplitter;

import java.rmi.RemoteException;
import java.util.*;

public class MasterAsyncTest {

    // Fake worker to simulate async RMI execution
    static class FakeAsyncWorker implements com.grid.common.IWorker {

        private final String id;

        public FakeAsyncWorker(String id) {
            this.id = id;
        }

        @Override
        public Result execute(Task task) throws RemoteException {
            // blocking version (not used here)
            return simulateResult();
        }

        @Override
        public void executeAsync(UUID jobId, Task task, MasterCallback callback) throws RemoteException {
            // simulate async delay
            new Thread(() -> {
                try {
                    Thread.sleep(new Random().nextInt(500)); // simulate work
                    SimulationResult result = simulateResult();
                    System.out.printf("[Worker-%s] Task done, called callback%n", id);
                    callback.onTaskCompleted(jobId, List.of(result));

                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (RemoteException e) {
                    throw new RuntimeException(e);
                }
            }).start();
        }

        private SimulationResult simulateResult() {
            Map<String, Double> congestion = Map.of("R01", Math.random());
            return new SimulationResult(
                    new Random().nextInt(5),   // total jams
                    50 + Math.random() * 10,   // avg speed
                    congestion
            );
        }

    }

    public static void main(String[] args) throws Exception {
        // ------------------------- Setup Master -------------------------
        WorkerRegistry registry = new WorkerRegistry();
        TaskSplitter splitter = new TaskSplitter();
        ResultCollector collector = new ResultCollector();
        ResultAggregator aggregator = new ResultAggregator();
        WorkerAssignmentService assignmentService = new WorkerAssignmentService(registry);

        // Fake MasterCallback
        MasterCallback callback = new MasterCallbackImpl(collector);
        MasterImpl master = new MasterImpl();

       // manually register fake workers for testing
        master.getWorkerRegistry().registerWorker("worker-1", new FakeAsyncWorker("worker-1"));
        master.getWorkerRegistry().registerWorker("worker-2", new FakeAsyncWorker("worker-2"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-3"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-4"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-5"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-3"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-4"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-5"));

        // prepare simulation parameters
        SimulationParams params = new SimulationParams(
                10,       // number of cars
                10000,      // iterations
                Weather.SUNNY,
                true,     // traffic lights
                42L       // seed
        );

        // run async
        System.out.println("------------------------------Start the Async Submiting------------------------");
        UUID jobId = master.submitTaskAsync(params);


        // wait for completion (polling for testing)
        while (master.getFinalResult(jobId) == null) {
            Thread.sleep(100);
        }

        SimulationResult res = master.getFinalResult(jobId);
        System.out.println("[Test] Final result: ");
        System.out.println("Total jams: " + res.getTotalJamsDetected());
        System.out.println("Average speed: " + res.getAverageSpeed());
        System.out.println("Congestion map: " + res.getCongestionMap());

    }
}
