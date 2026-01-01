package com.trafficjam1.authservice.simulation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grid.common.model.SimulationParams;
import com.trafficjam1.authservice.user.User;
import com.trafficjam1.authservice.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SimulationPersistenceService {
    private final UserRepository userRepository;
    private final SimulationRepository simulationRepository;
    private final SimulationResultRepository simulationResultRepository;
    private final SimulationService simulationService;
    private final ObjectMapper objectMapper;

    public SimulationPersistenceService(
            UserRepository userRepository,
            SimulationRepository simulationRepository,
            SimulationResultRepository simulationResultRepository,
            SimulationService simulationService,
            ObjectMapper objectMapper
    ) {
        this.userRepository = userRepository;
        this.simulationRepository = simulationRepository;
        this.simulationResultRepository = simulationResultRepository;
        this.simulationService = simulationService;
        this.objectMapper = objectMapper;
    }

    public User requireCurrentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            throw new IllegalStateException("Unauthenticated");
        }
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User not found"));
    }

    public boolean isAdmin(Authentication authentication) {
        if (authentication == null) return false;
        return authentication.getAuthorities().stream().anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
    }

    @Transactional
    public SimulationEntity createAndStartSimulation(User user, SimulationParams params) {
        SimulationEntity sim = new SimulationEntity();
        sim.setUser(user);
        sim.setStatus(SimulationStatus.CREATED);
        sim.setGridSize(params.getGridSize());
        sim.setNumberOfCars(params.getNumberOfCars());
        sim.setIterations(params.getIterations());
        sim.setWeather(params.getWeather() == null ? "UNKNOWN" : params.getWeather().name());
        sim.setTrafficLightsEnabled(params.isTrafficLightsEnabled());
        sim.setSeed(params.getSeed());
        sim = simulationRepository.save(sim);

        UUID jobId = simulationService.submitSimulation(params);
        sim.setJobId(jobId);
        sim.setStatus(SimulationStatus.RUNNING);
        return simulationRepository.save(sim);
    }

    public List<SimulationListItemResponse> listMySimulations(User user) {
        return simulationRepository.findAllByUser_IdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::toListItem)
                .toList();
    }

    public SimulationDetailResponse getSimulationDetail(Long simulationId, User currentUser, boolean allowAdmin) {
        SimulationEntity sim = allowAdmin
                ? simulationRepository.findById(simulationId).orElseThrow(() -> new IllegalStateException("Simulation not found"))
                : simulationRepository.findByIdAndUser_Id(simulationId, currentUser.getId()).orElseThrow(() -> new IllegalStateException("Simulation not found"));

        Optional<SimulationResultEntity> resultOpt = simulationResultRepository.findBySimulation_Id(sim.getId());
        SimulationDetailResponse.SimulationResultData result = resultOpt.map(r -> new SimulationDetailResponse.SimulationResultData(
                r.getTotalJamsDetected(),
                r.getAverageSpeed(),
                r.getMinSpeedObserved(),
                r.getMaxSpeedObserved(),
                r.getAccidentProbability(),
                r.getCongestionJson(),
                r.getMetricsJson(),
                r.getExecutionTimeMs(),
                r.getResultJson(),
                r.getCreatedAt(),
                r.getUpdatedAt()
        )).orElse(null);

        Long userId = sim.getUser() == null ? null : sim.getUser().getId();
        return new SimulationDetailResponse(
                sim.getId(),
                userId,
                sim.getJobId(),
                sim.getStatus(),
                sim.getGridSize(),
                sim.getNumberOfCars(),
                sim.getIterations(),
                sim.getWeather(),
                sim.isTrafficLightsEnabled(),
                sim.getSeed(),
                sim.getCreatedAt(),
                sim.getUpdatedAt(),
                result
        );
    }

    @Transactional
    public SimulationDetailResponse saveSimulationResult(Long simulationId, SimulationResultUpsertRequest result, User currentUser, boolean allowAdmin) {
        SimulationEntity sim = allowAdmin
                ? simulationRepository.findById(simulationId).orElseThrow(() -> new IllegalStateException("Simulation not found"))
                : simulationRepository.findByIdAndUser_Id(simulationId, currentUser.getId()).orElseThrow(() -> new IllegalStateException("Simulation not found"));

        SimulationResultEntity entity = simulationResultRepository.findBySimulation_Id(sim.getId()).orElseGet(SimulationResultEntity::new);
        entity.setSimulation(sim);
        entity.setTotalJamsDetected(result == null ? null : result.totalJamsDetected());
        entity.setAverageSpeed(result == null ? null : result.averageSpeed());
        entity.setMinSpeedObserved(result == null ? null : result.minSpeedObserved());
        entity.setMaxSpeedObserved(result == null ? null : result.maxSpeedObserved());
        entity.setAccidentProbability(result == null ? null : result.accidentProbability());
        entity.setExecutionTimeMs(result == null ? null : result.executionTimeMs());

        entity.setCongestionJson(writeJsonSafely(result == null ? null : result.congestionMap()));
        entity.setMetricsJson(writeJsonSafely(result == null ? null : result.metrics()));
        entity.setResultJson(writeJsonSafely(result));

        simulationResultRepository.save(entity);

        sim.setStatus(SimulationStatus.COMPLETED);
        simulationRepository.save(sim);

        return getSimulationDetail(simulationId, currentUser, allowAdmin);
    }

    private String writeJsonSafely(Object value) {
        if (value == null) return null;
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private SimulationListItemResponse toListItem(SimulationEntity s) {
        return new SimulationListItemResponse(
                s.getId(),
                s.getJobId(),
                s.getStatus(),
                s.getGridSize(),
                s.getNumberOfCars(),
                s.getIterations(),
                s.getWeather(),
                s.isTrafficLightsEnabled(),
                s.getSeed(),
                s.getCreatedAt(),
                s.getUpdatedAt()
        );
    }
}
