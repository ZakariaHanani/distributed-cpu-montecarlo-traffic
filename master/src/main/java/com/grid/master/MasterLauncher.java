package com.grid.master;

import com.grid.master.registry.MasterRegistryConnector;
import java.rmi.registry.Registry;

public class MasterLauncher {

    public static void main(String[] args) {
        MasterRegistryConnector connector =
                new MasterRegistryConnector("localhost", 1099);

        Registry registry = connector.connect();

        if (registry == null) {
            System.out.println("Master failed to connect!");
        } else {
            System.out.println("Master connected successfully.");
        }
    }
}
