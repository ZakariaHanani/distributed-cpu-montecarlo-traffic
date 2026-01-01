package com.trafficjam1.authservice.simulation;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "simulation_results")
public class SimulationResultEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "simulation_id", nullable = false, unique = true)
    private SimulationEntity simulation;

    @Column(name = "total_jams_detected")
    private Integer totalJamsDetected;

    @Column(name = "average_speed")
    private Double averageSpeed;

    @Column(name = "min_speed_observed")
    private Double minSpeedObserved;

    @Column(name = "max_speed_observed")
    private Double maxSpeedObserved;

    @Column(name = "accident_probability")
    private Double accidentProbability;

    @Column(name = "congestion_json", columnDefinition = "LONGTEXT")
    private String congestionJson;

    @Column(name = "metrics_json", columnDefinition = "LONGTEXT")
    private String metricsJson;

    @Column(name = "execution_time_ms")
    private Long executionTimeMs;

    @Column(name = "result_json", columnDefinition = "LONGTEXT")
    private String resultJson;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public SimulationEntity getSimulation() {
        return simulation;
    }

    public void setSimulation(SimulationEntity simulation) {
        this.simulation = simulation;
    }

    public Integer getTotalJamsDetected() {
        return totalJamsDetected;
    }

    public void setTotalJamsDetected(Integer totalJamsDetected) {
        this.totalJamsDetected = totalJamsDetected;
    }

    public Double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(Double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public Double getMinSpeedObserved() {
        return minSpeedObserved;
    }

    public void setMinSpeedObserved(Double minSpeedObserved) {
        this.minSpeedObserved = minSpeedObserved;
    }

    public Double getMaxSpeedObserved() {
        return maxSpeedObserved;
    }

    public void setMaxSpeedObserved(Double maxSpeedObserved) {
        this.maxSpeedObserved = maxSpeedObserved;
    }

    public Double getAccidentProbability() {
        return accidentProbability;
    }

    public void setAccidentProbability(Double accidentProbability) {
        this.accidentProbability = accidentProbability;
    }

    public String getCongestionJson() {
        return congestionJson;
    }

    public void setCongestionJson(String congestionJson) {
        this.congestionJson = congestionJson;
    }

    public String getMetricsJson() {
        return metricsJson;
    }

    public void setMetricsJson(String metricsJson) {
        this.metricsJson = metricsJson;
    }

    public Long getExecutionTimeMs() {
        return executionTimeMs;
    }

    public void setExecutionTimeMs(Long executionTimeMs) {
        this.executionTimeMs = executionTimeMs;
    }

    public String getResultJson() {
        return resultJson;
    }

    public void setResultJson(String resultJson) {
        this.resultJson = resultJson;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
