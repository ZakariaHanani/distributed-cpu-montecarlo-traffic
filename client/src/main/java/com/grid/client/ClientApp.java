package com.grid.client;

import com.grid.common.Interfaces.IMaster;
import com.grid.common.configLoader;
import com.grid.common.model.SimulationJobTask;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
import com.grid.common.model.Weather;
import com.grid.master.results.ResultCollector;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;
import java.util.UUID;

public class ClientApp {

    // 6.3 – polling configuration
    private static final long MAX_WAIT_MS = 60_000L;   // 1 minute max
    private static final long POLL_INTERVAL_MS = 1_000L; // check every 1 second

    public static void main(String[] args) {
        final String registryHost = configLoader.get("registry.host");
        final int registryPort = configLoader.getInt("registry.port");
        final String serviceName  = "MasterService"; // same as MasterNode binds

        System.out.printf("[Client] Connecting to RMI registry at %s:%d...%n",
                registryHost, registryPort);

        try {
            Registry registry = LocateRegistry.getRegistry(registryHost, registryPort);
            IMaster master = (IMaster) registry.lookup(serviceName);
            System.out.println("The [Client] Successfully obtained IMaster stub from RMI registry.");

            // 6.2 – submit simulation parameters and get jobId
            UUID jobId = submitSimulation(master);

            SimulationResult finalResult =
                    waitForFinalResult(master, jobId, MAX_WAIT_MS, POLL_INTERVAL_MS);

            displayFinalResult(jobId, finalResult);


        } catch (NotBoundException e) {
            System.err.printf("The [Client] Failed to connect to Master service:%n" +
                    "\tNotBoundException - %s%n", serviceName);
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
        int gridsize =readPositiveInt(scanner,"Grid Size");
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

        // For now we fix weather + traffic lights. Later you can ask user too.
        SimulationParams params = new SimulationParams(
                cars,
                iterations,
                Weather.SUNNY, // maybe default SUNNY for now
                true,          // trafficLightsEnabled
                seed,
                gridsize
        );

        SimulationJobTask task = new SimulationJobTask(params);

        System.out.println("[Client] Submitting simulation task to Master...");
        UUID jobId = master.submitTaskAsync(params);

        System.out.printf("[Client] Simulation submitted successfully. jobId = %s%n", jobId);
        return jobId;
    }

    /**
     * 6.3 – Poll Master for the final result with timeout.
     * Handles delays and temporary RemoteExceptions.
     */
    private static SimulationResult waitForFinalResult(
            IMaster master,
            UUID jobId,
            long maxWaitMs,
            long pollIntervalMs
    ) throws InterruptedException {

        long start = System.currentTimeMillis();

        while (true) {
            long elapsed = System.currentTimeMillis() - start;

            if (elapsed >= maxWaitMs) {
                System.err.println("[Client] Timeout while waiting for job " + jobId);
                return null;
            }

            try {
                ResultCollector.JobResult jobResult = (ResultCollector.JobResult )master.getFinalResult(jobId);

                if (jobResult == null) {
                    System.out.println("[Client] Job not registered yet, waiting...");
                } else {
                    switch (jobResult.status()) {
                        case RUNNING -> System.out.println("[Client] Job still running...");
                        case COMPLETED -> {
                            System.out.println("[Client] Job completed!");
                            return jobResult.result();
                        }
                        case FAILED -> {
                            System.err.println("[Client] Job failed: " + jobResult.status());
                            return null;
                        }
                    }
                }

            } catch (RemoteException e) {
                System.err.println("[Client] Remote error while polling: " + e.getMessage());
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
        System.out.println("Average speed: " + result.getAverageSpeed());
        System.out.println("Congestion map: " + result.getCongestionMap());
    }


    private static int readPositiveInt(Scanner scanner, String label) {
        final int MAX_VALUE = 1_000_000;

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
