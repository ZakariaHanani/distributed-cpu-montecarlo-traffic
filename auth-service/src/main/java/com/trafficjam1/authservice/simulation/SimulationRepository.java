package com.trafficjam1.authservice.simulation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SimulationRepository extends JpaRepository<SimulationEntity, Long> {
    List<SimulationEntity> findAllByUser_IdOrderByCreatedAtDesc(Long userId);
    Optional<SimulationEntity> findByIdAndUser_Id(Long id, Long userId);
}

