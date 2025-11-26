package com.grid.master;

import java.rmi.registry.Registry;

public class MasterNode {
    public static void main(String[] args) throws Exception {

        // Step 4.1: Connect to registry
        MasterRegistryConnector connector = new MasterRegistryConnector();
        Registry registry = connector.connect();

        // Step 4.2: Create master implementation
        MasterImpl masterImpl = new MasterImpl();

        // Bind master to registry
        registry.rebind("MasterService", masterImpl);

        System.out.println("[Master] MasterService bound to registry and ready.");
    }
}

