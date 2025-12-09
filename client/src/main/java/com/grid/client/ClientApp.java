package com.grid.client;

import com.grid.common.IMaster;
import com.grid.common.configLoader;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

/**
 * Simple console client that only:
 *  - reads registry host/port from config.properties
 *  - connects to the RMI registry
 *  - obtains IMaster stub via lookup("MasterService")
 *
 * This corresponds to: client connect to master.
 */
public class ClientApp {

    public static void main(String[] args) {
        // 1) Read configuration via shared configLoader (common module)
        final String registryHost = configLoader.get("registry.host");
        final int registryPort = configLoader.getInt("registry.port");

        System.out.printf(
                "[Client] Connecting to RMI registry at %s:%d...%n",
                registryHost,
                registryPort
        );

        try {
            // 2) Connect to RMI registry
            Registry registry = LocateRegistry.getRegistry(registryHost, registryPort);

            // 3) Lookup the Master service stub
            IMaster master = (IMaster) registry.lookup("MasterService");

            System.out.println("The [Client] Successfully obtained IMaster stub from RMI registry.");

            // TODO (Issue 6.2, 6.3, 6.4):
            //  - submit simulation parameters
            //  - wait for aggregated results
            //  - display them to the user

        } catch (Exception e) {
            // 4) Error handling
            System.err.println("The [Client] Failed to connect to Master service:");
            System.err.println("        " + e.getClass().getSimpleName() + " - " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
}