package com.grid.worker;

import com.grid.common.configLoader;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class workerApp {

    public static void main(String[] args) {
        final String registryHost = configLoader.get("registry.host");
        final int registryPort = configLoader.getInt("registry.port");
        final int maxRetries = configLoader.getInt("worker.max.retries");
        final long waitTimeMs = configLoader.getLong("worker.wait.time.ms");

        System.out.println("Starting Worker Node...");
        System.out.printf("Attempting to connect to RMI Registry at %s:%d\n", registryHost, registryPort);

        Registry registry = connectToRegistry(registryHost, registryPort, maxRetries, waitTimeMs);

        if (registry != null) {
            System.out.println("✅ Successfully connected to RMI Registry.");
        } else {
            System.err.println("❌ Failed to connect to RMI Registry after maximum retries. Worker shutting down.");
            System.exit(1);
        }
    }

    private static Registry connectToRegistry(String host, int port, int maxRetries, long waitTimeMs) {
        Registry registry = null;
        int attempts = 0;

        while (attempts < maxRetries) {
            attempts++;
            try {
                registry = LocateRegistry.getRegistry(host, port);
                registry.list();
                return registry;

            } catch (Exception e) {
                System.out.printf("Attempt %d/%d failed: Registry not reachable. Retrying in %dms...\n",
                        attempts, maxRetries, waitTimeMs);
                try {
                    Thread.sleep(waitTimeMs);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    return null;
                }
            }
        }
        return null;
    }
}