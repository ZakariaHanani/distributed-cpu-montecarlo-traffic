package com.trafficjam1.authservice.simulation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SimulationResultRepository extends JpaRepository<SimulationResultEntity, Long> {
    Optional<SimulationResultEntity> findBySimulation_Id(Long simulationId);
}

