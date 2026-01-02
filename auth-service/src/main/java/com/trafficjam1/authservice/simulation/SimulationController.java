package com.trafficjam1.authservice.simulation;

import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
import com.grid.common.dto.JobResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/simulations")
public class SimulationController {

    private static final Logger log = LoggerFactory.getLogger(SimulationController.class);

    private final SimulationService simulationService;
    private final SimulationPersistenceService simulationPersistenceService;

    public SimulationController(SimulationService simulationService, SimulationPersistenceService simulationPersistenceService) {
        this.simulationService = simulationService;
        this.simulationPersistenceService = simulationPersistenceService;
    }

    @PostMapping
    public ResponseEntity<?> createSimulation(@RequestBody SimulationParams params, Authentication authentication) {
        log.info("Received simulation request");
        try {
            var user = simulationPersistenceService.requireCurrentUser(authentication);
            SimulationEntity sim = simulationPersistenceService.createAndStartSimulation(user, params);
            return ResponseEntity.ok(new SimulationCreateResponse(sim.getId(), sim.getJobId(), "Simulation started successfully"));
        } catch (Exception e) {
            log.error("Error starting simulation", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/workers")
    public ResponseEntity<?> getWorkerCount() {
        return ResponseEntity.ok(Map.of("count", simulationService.getWorkerCount()));
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMySimulations(Authentication authentication) {
        try {
            var user = simulationPersistenceService.requireCurrentUser(authentication);
            return ResponseEntity.ok(simulationPersistenceService.listMySimulations(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<?> getSimulationById(@PathVariable("id") Long id, Authentication authentication) {
        try {
            var user = simulationPersistenceService.requireCurrentUser(authentication);
            boolean allowAdmin = simulationPersistenceService.isAdmin(authentication);
            return ResponseEntity.ok(simulationPersistenceService.getSimulationDetail(id, user, allowAdmin));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id:\\d+}/results")
    public ResponseEntity<?> saveSimulationResults(
            @PathVariable("id") Long id,
            @RequestBody SimulationResultUpsertRequest result,
            Authentication authentication
    ) {
        try {
            var user = simulationPersistenceService.requireCurrentUser(authentication);
            boolean allowAdmin = simulationPersistenceService.isAdmin(authentication);
            return ResponseEntity.ok(simulationPersistenceService.saveSimulationResult(id, result, user, allowAdmin));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{jobId:[0-9a-fA-F-]{36}}")
    public ResponseEntity<?> getJobResult(@PathVariable("jobId") UUID jobId) {
        try {
            JobResult jr = simulationService.getJobResult(jobId);
            return ResponseEntity.ok(jr);
        } catch (Exception e) {
            log.error("Error fetching job result", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{jobId:[0-9a-fA-F-]{36}}/partials")
    public ResponseEntity<?> getJobPartials(@PathVariable("jobId") UUID jobId) {
        try {
            List<SimulationResult> partials = simulationService.getJobPartials(jobId);
            return ResponseEntity.ok(partials);
        } catch (Exception e) {
            log.error("Error fetching job partials", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{jobId:[0-9a-fA-F-]{36}}/worker-results")
    public ResponseEntity<?> getWorkerResults(@PathVariable("jobId") UUID jobId) {
        try {
            Map<String, List<SimulationResult>> grouped = simulationService.groupPartialsByWorker(jobId);
            return ResponseEntity.ok(grouped);
        } catch (Exception e) {
            log.error("Error fetching worker results", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
