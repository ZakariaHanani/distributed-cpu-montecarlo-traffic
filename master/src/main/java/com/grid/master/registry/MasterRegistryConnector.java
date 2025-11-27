package com.grid.master.registry;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.logging.Logger;

public class MasterRegistryConnector {

    private static final Logger logger = Logger.getLogger(MasterRegistryConnector.class.getName());

    private final String registryHost;
    private final int registryPort;

    public MasterRegistryConnector(String registryHost, int registryPort) {
        this.registryHost = registryHost;
        this.registryPort = registryPort;
    }

    public Registry connect() {
        int retries = 3;

        for (int attempt = 1; attempt <= retries; attempt++) {
            try {
                logger.info("Attempting to connect to RMI registry (attempt " + attempt + ")...");

                Registry registry = LocateRegistry.getRegistry(registryHost, registryPort);

                // test registry by listing bindings
                registry.list();

                logger.info("Connected to RMI registry at " + registryHost + ":" + registryPort);
                return registry;

            } catch (Exception e) {
                logger.severe("Failed to connect: " + e.getMessage());

                if (attempt == retries) {
                    logger.severe("Giving up after 3 attempts.");
                    return null;
                }

                try { Thread.sleep(1500); } catch (InterruptedException ignored) {}

                logger.info("Retrying...");
            }
        }

        return null;
    }
}
