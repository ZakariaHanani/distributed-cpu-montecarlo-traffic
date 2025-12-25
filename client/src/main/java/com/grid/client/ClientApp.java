package com.grid.client;

import com.grid.common.Interfaces.IMaster;
import com.grid.common.configLoader;
import com.grid.common.model.SimulationJobTask;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
import com.grid.common.model.Weather;
//import com.grid.master.results.ResultCollector;
import com.grid.common.dto.JobResult;
import com.grid.common.dto.JobStatus;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;
import java.util.UUID;

public class ClientApp {


    public static void main(String[] args) {
        final String registryHost = configLoader.get("registry.host");
        final int registryPort = configLoader.getInt("registry.port");
        String masterServiceName = configLoader.get("master.service.name");
        final long maxWaitMs = configLoader.getLong("client.max.wait.ms");
        final long pollIntervalMs = configLoader.getLong("client.poll.interval.ms");



        System.out.printf("[Client] Connecting to RMI registry at %s:%d...%n",
                registryHost, registryPort);

        try {
            Registry registry = LocateRegistry.getRegistry(registryHost, registryPort);
            IMaster master = (IMaster) registry.lookup(masterServiceName);
            System.out.println("The [Client] Successfully obtained IMaster stub from RMI registry.");

            // 6.2 – submit simulation parameters and get jobId
            UUID jobId = submitSimulation(master);

            SimulationResult finalResult =
                    waitForFinalResult(master, jobId, maxWaitMs, pollIntervalMs);

            displayFinalResult(jobId, finalResult);


        } catch (NotBoundException e) {
            System.err.printf("The [Client] Failed to connect to Master service:%n" +
                    "\tNotBoundException - %s%n", masterServiceName);
            e.printStackTrace();
        } catch (RemoteException e) {
            System.err.printf("The [Client] RemoteException when connecting to registry: %s%n",
                    e.getMessage());
            e.printStackTrace();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("[Client] Interrupted while waiting for final results.");
        }
    }

    /**
     * 6.2 – Ask user for parameters, validate them, build SimulationJobTask
     * and send it to the Master using submitTask(Task t).
     * Returns the jobId so we can wait on it in 6.3.
     */
    private static UUID submitSimulation(IMaster master) throws RemoteException {
        Scanner scanner = new Scanner(System.in);

        System.out.println();
        System.out.println("=== New Monte Carlo Traffic Simulation ===");

        int iterations = readPositiveInt(scanner, "Iterations (e.g. 10_000): ");
        int cars       = readPositiveInt(scanner, "Cars count (e.g. 150): ");
        int gridsize = readPositiveInt(scanner, "Grid Size: ");
        System.out.print("Use random seed? (y/n): ");
        String randomAnswer = scanner.nextLine().trim();
        boolean useRandomSeed = randomAnswer.equalsIgnoreCase("y")
                || randomAnswer.equalsIgnoreCase("yes");

        long seed;
        if (useRandomSeed) {
            seed = System.currentTimeMillis(); // basic randomness
            System.out.printf("[Client] Using generated random seed: %d%n", seed);
        } else {
            seed = readLong(scanner, "Seed (integer): ");
        }

        // ---- VALIDATION summary ----
        // iterations > 0, cars > 0 (checked below)
        // randomness: we know if we used random seed or not
        // seed: we either generated it or validated user input
        // ---------------------------------------

        // For now we fix weather + traffic lights. Later you can ask user too. !!!!!!!!!!!
        SimulationParams params = new SimulationParams(
                cars,
                iterations,
                Weather.SUNNY, // TEMP DEFAULT (user-select later)
                true,           // TEMP DEFAULT (user-toggle later)
                seed,
                gridsize
        );
        // NOTE: SimulationJobTask is not used yet because IMaster currently accepts SimulationParams.
        // When we expose a REST API / UI, we may submit a higher-level job object instead.
        // SimulationJobTask task = new SimulationJobTask(params);

        System.out.println("[Client] Submitting simulation task to Master...");
        UUID jobId = master.submitTaskAsync(params);

        System.out.printf("[Client] Simulation submitted successfully. jobId = %s%n", jobId);
        return jobId;
    }
    private static SimulationResult waitForFinalResult(
            IMaster master,
            UUID jobId,
            long maxWaitMs,
            long pollIntervalMs
    ) throws InterruptedException {

        long start = System.currentTimeMillis();
        JobStatus lastStatus = null;
        int consecutiveRemoteErrors = 0;

        while (true) {
            long elapsed = System.currentTimeMillis() - start;

            if (elapsed >= maxWaitMs) {
                System.err.println("[Client] Timeout while waiting for job " + jobId);
                return null;
            }

            try {
                JobResult jobResult = master.getJobResult(jobId);
                consecutiveRemoteErrors = 0;

                JobStatus status = (jobResult == null) ? JobStatus.PENDING : jobResult.status();

                // Print only when status changes (less spam)
                if (status != lastStatus) {
                    System.out.println("[Client] Status = " + status + " (elapsed " + (elapsed / 1000) + "s)");
                    lastStatus = status;
                }
                long lastProgressPrintMs = 0;
                switch (status) {
                    case COMPLETED -> {
                        System.out.println("[Client] Job completed!");
                        if (jobResult.result() == null) {
                            System.err.println("[Client] Completed but result is null (check Master logs).");
                            return null;
                        }
                        return jobResult.result();
                    }
                    case FAILED -> {
                        String msg = (jobResult.errorMessage() == null) ? "Unknown error" : jobResult.errorMessage();
                        System.err.println("[Client] Job failed: " + msg);
                        return null;
                    }
                    case RUNNING, PENDING -> {
                        long now = System.currentTimeMillis();
                        if (now - lastProgressPrintMs >= 5000) {
                            System.out.println("[Client] Still " + status + "... (elapsed " + (elapsed / 1000) + "s)");
                            lastProgressPrintMs = now;
                        }
                    }
                }

            } catch (RemoteException e) {
                consecutiveRemoteErrors++;
                System.err.println("[Client] Remote error while polling (" + consecutiveRemoteErrors + "): " + e.getMessage());
                if (consecutiveRemoteErrors >= 5) {
                    System.err.println("[Client] Too many remote errors. Aborting.");
                    return null;
                }
            }

            Thread.sleep(pollIntervalMs);
        }
    }


    /**
     * 6.4 – Display final result (high level).
     * For now we print jobId + result.toString().
     * Later, when Result has richer fields, you can pretty-print metrics.
     */
    private static void displayFinalResult(UUID jobId, SimulationResult result) {
        System.out.println();
        System.out.println("=== Final Monte Carlo Traffic Result ===");
        System.out.println("Job id: " + jobId);

        if (result == null) {
            System.out.println("[Client] No final result available.");
            return;
        }

        System.out.println("Total jams: " + result.getTotalJamsDetected());
        System.out.printf("Average speed: %.2f%n", result.getAverageSpeed());
        System.out.printf("Min speed observed: %.2f%n", result.getMinSpeedObserved());
        System.out.printf("Max speed observed: %.2f%n", result.getMaxSpeedObserved());
        System.out.printf("Accident probability: %.2f%%%n", result.getAccidentProbability() * 100);

        System.out.println("Congestion map (road -> congestion%):");
        if (result.getCongestionMap() == null || result.getCongestionMap().isEmpty()) {
            System.out.println("  (empty)");
        } else {
            result.getCongestionMap().forEach((road, congestion) ->
                    System.out.printf("  %s -> %.2f%%%n", road, congestion * 100)
            );
        }
    }



    private static int readPositiveInt(Scanner scanner, String label) {
        final int MAX_VALUE = configLoader.getInt("client.input.max.int");

        while (true) {
            System.out.print(label);
            String line = scanner.nextLine();
            try {
                int value = Integer.parseInt(line.trim());
                if (value <= 0) {
                    System.out.println("Value must be a positive integer.");
                    continue;
                }
                if (value > MAX_VALUE) {
                    System.out.println("Value is too large. Max = " + MAX_VALUE);
                    continue;
                }
                return value;
            } catch (NumberFormatException ex) {
                System.out.println("Please enter a valid integer.");
            }
        }
    }

    private static long readLong(Scanner scanner, String label) {
        while (true) {
            System.out.print(label);
            String line = scanner.nextLine();
            try {
                return Long.parseLong(line.trim());
            } catch (NumberFormatException ex) {
                System.out.println("Please enter a valid integer (seed).");
            }
        }
    }
}
