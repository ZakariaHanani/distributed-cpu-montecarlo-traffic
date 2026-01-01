package com.trafficjam1.authservice.simulation;

import com.grid.common.Interfaces.IMaster;
import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
import com.grid.common.dto.JobResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.List;
import java.util.UUID;

@Service
public class SimulationService {

    private static final Logger log = LoggerFactory.getLogger(SimulationService.class);

    @Value("${registry.host:localhost}")
    private String registryHost;

    @Value("${registry.port:1099}")
    private int registryPort;

    @Value("${master.service.name:MasterService}")
    private String masterServiceName;

    private IMaster masterStub;

    private synchronized IMaster getMasterStub() {
        if (masterStub != null) {
            return masterStub;
        }
        try {
            log.info("Connecting to RMI Registry at {}:{}", registryHost, registryPort);
            Registry registry = LocateRegistry.getRegistry(registryHost, registryPort);
            masterStub = (IMaster) registry.lookup(masterServiceName);
            log.info("Successfully connected to Master Service: {}", masterServiceName);
            return masterStub;
        } catch (RemoteException | NotBoundException e) {
            log.error("Failed to connect to RMI Master: {}", e.getMessage());
            throw new RuntimeException("Could not connect to Simulation Master", e);
        }
    }

    public UUID submitSimulation(SimulationParams params) {
        try {
            IMaster master = getMasterStub();
            log.info("Submitting simulation task: cars={}, iterations={}, grid={}, weather={}, seed={}", 
                    params.getNumberOfCars(), params.getIterations(), params.getGridSize(), params.getWeather(), params.getSeed());
            UUID jobId = master.submitTaskAsync(params);
            log.info("Simulation submitted successfully. Job ID: {}", jobId);
            return jobId;
        } catch (RemoteException e) {
            log.error("Remote exception during simulation submission: {}", e.getMessage());
            // Invalidate stub to force reconnection next time
            masterStub = null;
            throw new RuntimeException("Failed to submit simulation to Master", e);
        }
    }

    public int getWorkerCount() {
        try {
            IMaster master = getMasterStub();
            return master.getWorkerCount();
        } catch (RemoteException e) {
            log.error("Remote exception checking worker count: {}", e.getMessage());
            masterStub = null;
            return 0; // Return 0 if connection fails
        }
    }

    public JobResult getJobResult(UUID jobId) {
        try {
            IMaster master = getMasterStub();
            return master.getJobResult(jobId);
        } catch (RemoteException e) {
            log.error("Remote exception getting job result: {}", e.getMessage());
            masterStub = null;
            throw new RuntimeException("Failed to get job result", e);
        }
    }

    public List<SimulationResult> getJobPartials(UUID jobId) {
        try {
            IMaster master = getMasterStub();
            return master.getJobPartials(jobId);
        } catch (RemoteException e) {
            log.error("Remote exception getting job partials: {}", e.getMessage());
            masterStub = null;
            throw new RuntimeException("Failed to get job partials", e);
        }
    }

    public java.util.Map<String, java.util.List<SimulationResult>> groupPartialsByWorker(UUID jobId) {
        List<SimulationResult> partials = getJobPartials(jobId);
        java.util.Map<String, java.util.List<SimulationResult>> grouped = new java.util.HashMap<>();
        for (SimulationResult r : partials) {
            String wid = r.getWorkerId();
            if (wid == null) wid = "unknown";
            grouped.computeIfAbsent(wid, k -> new java.util.ArrayList<>()).add(r);
        }
        return grouped;
    }
}
