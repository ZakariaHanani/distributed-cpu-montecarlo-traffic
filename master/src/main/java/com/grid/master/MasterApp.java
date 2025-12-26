package com.grid.master;

import com.grid.common.Interfaces.IMaster;

import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class MasterApp {

    public static void main(String[] args) {

        // 1️⃣ Load registry config
        MasterRegistryConnector connector = new MasterRegistryConnector();

        // 2️⃣ VERY IMPORTANT: tell RMI which IP to put in stubs
        System.setProperty(
                "java.rmi.server.hostname",
                connector.getHost()
        );

        // 3️⃣ Connect to (or create) registry
        Registry registry = connector.connect();

        try {
            // 4️⃣ Create Master implementation
            IMaster master = new MasterImpl();

            // 5️⃣ Export Master on fixed port
            int masterPort = 1100; // or from config
            IMaster stub = (IMaster) UnicastRemoteObject.exportObject(
                    master,
                    masterPort
            );

            // 6️⃣ Bind stub in registry
            registry.rebind("MasterService", stub);

            System.out.println("[Master] MasterService bound successfully");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
