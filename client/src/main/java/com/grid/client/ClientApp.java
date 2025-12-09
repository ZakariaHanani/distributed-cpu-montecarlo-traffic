package com.grid.client;

import com.grid.common.IMaster;
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

            // 6.2 – submit simulation parameters
            submitSimulation(master);

        } catch (NotBoundException e) {
            System.err.printf("The [Client] Failed to connect to Master service:%n" +
                    "\tNotBoundException - %s%n", serviceName);
            e.printStackTrace();
        } catch (RemoteException e) {
            System.err.printf("The [Client] RemoteException when connecting to registry: %s%n",
                    e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Ask user for parameters, validate them, build SimulationJobTask
     * and send it to the Master using submitTask(Task t).
     */
    private static void submitSimulation(IMaster master) throws RemoteException {
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
        // iterations > 0, cars > 0 (checked above)
        // randomness: we know if we used random seed or not
        // seed: we either generated it or validated user input
        // ---------------------------------------

        // For now we fix weather + traffic lights. Later you can ask user too.
        SimulationParams params = new SimulationParams(
                cars,
                iterations,
                Weather.SUNNY, // maybe default SUNNY for now
                true,     // trafficLightsEnabled
                seed
        );

        SimulationJobTask task = new SimulationJobTask(params);

        System.out.println("[Client] Submitting simulation task to Master...");
        UUID jobId = master.submitTask(task);

        System.out.printf("[Client] Simulation submitted successfully. jobId = %s%n", jobId);
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
