package com.trafficjam1.authservice.simulation;

import com.trafficjam1.authservice.user.User;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "simulations")
public class SimulationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "job_id", unique = true, length = 36)
    private String jobId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SimulationStatus status = SimulationStatus.CREATED;

    @Column(name = "grid_size", nullable = false)
    private int gridSize;

    @Column(name = "num_cars", nullable = false)
    private int numberOfCars;

    @Column(nullable = false)
    private int iterations;

    @Column(nullable = false, length = 32)
    private String weather;

    @Column(name = "traffic_lights_enabled", nullable = false)
    private boolean trafficLightsEnabled;

    @Column(nullable = false)
    private long seed;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.status == null) this.status = SimulationStatus.CREATED;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(UUID jobId) {
        this.jobId = jobId == null ? null : jobId.toString();
    }

    public SimulationStatus getStatus() {
        return status;
    }

    public void setStatus(SimulationStatus status) {
        this.status = status;
    }

    public int getGridSize() {
        return gridSize;
    }

    public void setGridSize(int gridSize) {
        this.gridSize = gridSize;
    }

    public int getNumberOfCars() {
        return numberOfCars;
    }

    public void setNumberOfCars(int numberOfCars) {
        this.numberOfCars = numberOfCars;
    }

    public int getIterations() {
        return iterations;
    }

    public void setIterations(int iterations) {
        this.iterations = iterations;
    }

    public String getWeather() {
        return weather;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public boolean isTrafficLightsEnabled() {
        return trafficLightsEnabled;
    }

    public void setTrafficLightsEnabled(boolean trafficLightsEnabled) {
        this.trafficLightsEnabled = trafficLightsEnabled;
    }

    public long getSeed() {
        return seed;
    }

    public void setSeed(long seed) {
        this.seed = seed;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}

