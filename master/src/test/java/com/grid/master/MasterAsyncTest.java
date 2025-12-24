package com.grid.master;

import com.grid.common.Interfaces.IWorker;
import com.grid.common.Interfaces.MasterCallback;
import com.grid.common.Interfaces.Task;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
import com.grid.common.model.Weather;
import com.grid.master.assignment.WorkerAssignmentService;
import com.grid.master.assignment.WorkerRegistry;
import com.grid.master.results.JobStatus;
import com.grid.master.results.ResultAggregator;
import com.grid.master.results.ResultCollector;
import com.grid.master.splitting.TaskSplitter;

import java.rmi.RemoteException;
import java.util.*;

public class MasterAsyncTest {

    // Fake worker to simulate async RMI execution
    static class FakeAsyncWorker implements IWorker {

        private final String id;
        private final Random random = new Random();

        public FakeAsyncWorker(String id) {
            this.id = id;
        }

        @Override
        public void execute(UUID jobId, Task task, MasterCallback callback) throws RemoteException {
            new Thread(() -> {
                try {
                    Thread.sleep(random.nextInt(500));

                    SimulationResult result = simulateResult();
                    System.out.printf("[Worker-%s] Task done → callback%n", id);

                    callback.onTaskCompleted(jobId, result);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();
        }

        private SimulationResult simulateResult() {
            Map<String, Double> congestion = Map.of(
                    "R01", random.nextDouble(),
                    "R02", random.nextDouble()
            );

            double minSpeed = 30 + random.nextDouble() * 10;
            double maxSpeed = 80 + random.nextDouble() * 20;
            double avgSpeed = (minSpeed + maxSpeed) / 2;

            return new SimulationResult(
                    random.nextInt(5),       // total jams
                    avgSpeed,                // average speed
                    congestion,              // congestion map
                    minSpeed,                // min speed
                    maxSpeed,                // max speed
                    random.nextDouble()      // accident probability
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
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-6"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-7"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-8"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-9"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-10"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-11"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-12"));
        master.getWorkerRegistry().registerWorker("worker-3", new FakeAsyncWorker("worker-13"));

        // prepare simulation parameters


        // run async
        System.out.println("------------------------------Start the Async Submiting------------------------");
        UUID jobId = master.submitTaskAsync(new SimulationParams(10,
                10000,
                Weather.SUNNY,
                true,
                45L,
                4)
        );


        // wait for completion (polling for testing)
        ResultCollector.JobResult jr;

        while (true) {
            jr = master.getFinalResultInternal(jobId);

            if (jr.status() == JobStatus.COMPLETED) break;

            System.out.println("Job still running...");
            Thread.sleep(100);
        }
        SimulationResult res = jr.result();
        System.out.println("[Test] Final result: ");
        System.out.println("Total jams: " + res.getTotalJamsDetected());
        System.out.println("Average speed: " + res.getAverageSpeed());
        System.out.println("Congestion map: " + res.getCongestionMap());



    }
}
