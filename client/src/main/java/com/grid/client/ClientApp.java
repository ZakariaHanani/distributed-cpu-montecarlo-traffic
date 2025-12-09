package com.grid.client;

import com.grid.common.IMaster;
import com.grid.common.Result;
import com.grid.common.configLoader;
import com.grid.common.model.SimulationJobTask;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.Weather;

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

            // 6.3 – wait for aggregated result (polling)
            Result finalResult = waitForFinalResult(master, jobId, MAX_WAIT_MS, POLL_INTERVAL_MS);

            // 6.4 – display final result in CLI
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
                seed
        );

        SimulationJobTask task = new SimulationJobTask(params);

        System.out.println("[Client] Submitting simulation task to Master...");
        UUID jobId = master.submitTask(task);

        System.out.printf("[Client] Simulation submitted successfully. jobId = %s%n", jobId);
        return jobId;
    }

    /**
     * 6.3 – Poll Master for the final result with timeout.
     * Handles delays and temporary RemoteExceptions.
     */
    private static Result waitForFinalResult(
            IMaster master,
            UUID jobId,
            long maxWaitMs,
            long pollIntervalMs
    ) throws InterruptedException {

        long start = System.currentTimeMillis();

        while (true) {
            long elapsed = System.currentTimeMillis() - start;
            if (elapsed >= maxWaitMs) {
                System.err.printf(
                        "[Client] Timeout (%d ms) waiting for final result of job %s.%n",
                        elapsed, jobId
                );
                return null;
            }

            try {
                Result result = master.getFinalResult(jobId);
                if (result != null) {
                    System.out.printf(
                            "[Client] Final result is ready after %d ms for job %s.%n",
                            elapsed, jobId
                    );
                    return result;
                }

                System.out.printf(
                        "[Client] Result not ready yet for job %s (elapsed=%d ms). Waiting...%n",
                        jobId, elapsed
                );
            } catch (RemoteException e) {
                System.err.printf(
                        "[Client] RemoteException while polling result for job %s: %s%n",
                        jobId, e.getMessage()
                );
                // We keep waiting until timeout – Master might come back.
            }

            Thread.sleep(pollIntervalMs);
        }
    }

    /**
     * 6.4 – Display final result (high level).
     * For now we print jobId + result.toString().
     * Later, when Result has richer fields, you can pretty-print metrics.
     */
    private static void displayFinalResult(UUID jobId, Result result) {
        System.out.println();
        System.out.println("=== Final Monte Carlo Traffic Result ===");
        System.out.printf("Job id: %s%n", jobId);

        if (result == null) {
            System.out.println("[Client] No final result available (timeout or Master returned null).");
            System.out.println("         Check Master / Worker logs or try again later.");
            return;
        }

        // Generic display – relies on Result.toString().
        // When Result has getters like getExecutionTimeMs(), getMetrics(), etc.,
        // you can replace this block by a detailed pretty-print.
        System.out.println("[Client] Raw result object:");
        System.out.println(result.toString());
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
