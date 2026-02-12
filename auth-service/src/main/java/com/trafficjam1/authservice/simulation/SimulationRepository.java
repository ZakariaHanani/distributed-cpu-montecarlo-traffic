package com.trafficjam1.authservice.simulation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SimulationRepository extends JpaRepository<SimulationEntity, Long> {
    List<SimulationEntity> findAllByUser_IdOrderByCreatedAtDesc(Long userId);
    Optional<SimulationEntity> findByIdAndUser_Id(Long id, Long userId);
    long countByUser_Id(Long userId);
    long countByUser_IdAndStatus(Long userId, SimulationStatus status);
    Optional<SimulationEntity> findTopByUser_IdOrderByCreatedAtDesc(Long userId);

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.transaction.annotation.Transactional
    void deleteByUser_Id(Long userId);
}

