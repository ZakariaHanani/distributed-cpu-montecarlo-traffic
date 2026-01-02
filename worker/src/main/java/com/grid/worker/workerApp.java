package com.grid.worker;

import com.grid.common.configLoader;
import com.grid.common.Interfaces.Heartbeat;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.RemoteException;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class workerApp {

    public static void main(String[] args) {
        final String registryHost = configLoader.get("registry.host");
        final int registryPort = configLoader.getInt("registry.port");
        final String masterServiceName = configLoader.get("master.service.name");
        final int maxRetries = configLoader.getInt("worker.max.retries");
        final long waitTimeMs = configLoader.getLong("worker.wait.time.ms");
        final long heartbeatIntervalMs = configLoader.getLong("worker.heartbeat.interval.ms");

        System.out.println("Starting Worker Node...");
        System.out.printf("Attempting to connect to RMI Registry at %s:%d\n", registryHost, registryPort);

        Registry registry = connectToRegistry(registryHost, registryPort, maxRetries, waitTimeMs);
        if (registry == null) {
            System.err.println("Failed to connect to RMI Registry. Worker shutting down.");
            System.exit(1);
        }

        try {
            // Lookup the Master service (must implement Heartbeat interface)
            Heartbeat master = (Heartbeat) registry.lookup(masterServiceName);
            AtomicReference<Heartbeat> masterRef = new AtomicReference<>(master);
            AtomicReference<Registry> registryRef = new AtomicReference<>(registry);

            // Create WorkerImpl
            WorkerImpl workerImpl = new WorkerImpl(registry);
            String workerId = workerImpl.getId();

            // Bind worker in local registry for RMI calls from master (optional)
//            registry.rebind(workerId, workerImpl);
//            System.out.printf("Worker bound locally with ID: %s\n", workerId);

            // Register worker with Master
            master.registerWorker(workerId, workerImpl);
            System.out.printf("Worker registered with Master: %s\n", workerId);

            // Start heartbeat scheduler
            ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
            scheduler.scheduleAtFixedRate(() -> {
                try {
                    masterRef.get().heartbeat(workerId);
                } catch (RemoteException e) {
                    System.err.println("[Worker] Failed to send heartbeat: " + e.getMessage());
                    try {
                        Registry refreshedRegistry = connectToRegistry(registryHost, registryPort, maxRetries, waitTimeMs);
                        if (refreshedRegistry == null) {
                            return;
                        }
                        Heartbeat refreshedMaster = (Heartbeat) refreshedRegistry.lookup(masterServiceName);
                        registryRef.set(refreshedRegistry);
                        masterRef.set(refreshedMaster);
                        refreshedMaster.registerWorker(workerId, workerImpl);
                    } catch (Exception ignored) {
                    }
                }
            }, 0, heartbeatIntervalMs, TimeUnit.MILLISECONDS);

            // Start worker task thread
            Thread workerThread = new Thread(workerImpl, "Worker-Task-Processor");
            workerThread.start();
            System.out.println("[Worker] Now running and waiting for tasks...");

            // Shutdown hook to unregister worker
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                try {
                    masterRef.get().unregisterWorker(workerId);
                    scheduler.shutdown();
                    System.out.println("[Worker] Successfully unregistered on shutdown.");
                } catch (RemoteException e) {
                    System.err.println("[Worker] Failed to unregister on shutdown: " + e.getMessage());
                }
            }));

        } catch (Exception e) {
            System.err.println("Critical error: " + e.getMessage());
            e.printStackTrace();
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
                registry.list(); // test connection
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
