package com.trafficjam1.authservice.simulation;

import com.grid.common.model.SimulationParams;
import com.grid.common.model.SimulationResult;
import com.grid.common.dto.JobResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/simulations")
public class SimulationController {

    private static final Logger log = LoggerFactory.getLogger(SimulationController.class);

    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @PostMapping
    public ResponseEntity<?> createSimulation(@RequestBody SimulationParams params) {
        log.info("Received simulation request");
        try {
            UUID jobId = simulationService.submitSimulation(params);
            return ResponseEntity.ok(Map.of("jobId", jobId.toString(), "message", "Simulation started successfully"));
        } catch (Exception e) {
            log.error("Error starting simulation", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/workers")
    public ResponseEntity<?> getWorkerCount() {
        return ResponseEntity.ok(Map.of("count", simulationService.getWorkerCount()));
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<?> getJobResult(@PathVariable("jobId") UUID jobId) {
        try {
            JobResult jr = simulationService.getJobResult(jobId);
            return ResponseEntity.ok(jr);
        } catch (Exception e) {
            log.error("Error fetching job result", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{jobId}/partials")
    public ResponseEntity<?> getJobPartials(@PathVariable("jobId") UUID jobId) {
        try {
            List<SimulationResult> partials = simulationService.getJobPartials(jobId);
            return ResponseEntity.ok(partials);
        } catch (Exception e) {
            log.error("Error fetching job partials", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{jobId}/worker-results")
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
