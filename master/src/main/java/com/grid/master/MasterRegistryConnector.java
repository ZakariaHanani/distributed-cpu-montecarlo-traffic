package com.grid.master;

import java.io.InputStream;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Properties;

public class MasterRegistryConnector {

    private final int port ;
    private final String  host ;


    public MasterRegistryConnector() {
        Properties props =new Properties() ;
        try(InputStream in =getClass().getClassLoader().getResourceAsStream("config.properties")){
            if (in == null) {
                throw  new RuntimeException("config.properties not found");
            }
        props.load(in);
        }catch (Exception e) {
            throw new RuntimeException("Failed to load config.properties", e);
        }

    this.host =props.getProperty("registry.host","localhost");
    this.port =Integer.parseInt(props.getProperty("registry.port","1099"));

    }

    public Registry connect(){
        int attempts = 0;

        while (attempts < 3) {
            attempts++;
            System.out.println("[Master] Attempt " + attempts + " to connect to RMI registry " +
                    host + ":" + port);

            try {
                Registry registry = LocateRegistry.getRegistry(host, port);

                // Confirm registry is reachable
                registry.list();
                System.out.println("[Master] Successfully connected to RMI registry.");
                return registry;

            } catch (Exception e) {
                System.err.println("[Master] Failed to connect (attempt " + attempts + "): " + e);
                sleep(1000); // Wait 1 second before retry
            }
        }

        throw new RuntimeException("Master could not connect to RMI registry after 3 attempts.");
    }

    private void sleep(int ms){
        try {
            Thread.sleep(ms);
        } catch (InterruptedException ignored) {}
    }
}
