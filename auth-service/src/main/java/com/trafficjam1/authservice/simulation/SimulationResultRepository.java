package com.trafficjam1.authservice.simulation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SimulationResultRepository extends JpaRepository<SimulationResultEntity, Long> {
    Optional<SimulationResultEntity> findBySimulation_Id(Long simulationId);

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.transaction.annotation.Transactional
    @org.springframework.data.jpa.repository.Query("DELETE FROM SimulationResultEntity sr WHERE sr.simulation.user.id = :userId")
    void deleteByUserId(@org.springframework.data.repository.query.Param("userId") Long userId);
}

