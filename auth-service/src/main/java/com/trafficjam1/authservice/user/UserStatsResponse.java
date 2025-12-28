package com.trafficjam1.authservice.user;

import java.time.Instant;

public class UserStatsResponse {
    private int totalSimulations;
    private long avgExecutionMs;
    private double successRate;
    private Instant lastRunAt;

    public UserStatsResponse() {
    }

    public UserStatsResponse(int totalSimulations, long avgExecutionMs, double successRate, Instant lastRunAt) {
        this.totalSimulations = totalSimulations;
        this.avgExecutionMs = avgExecutionMs;
        this.successRate = successRate;
        this.lastRunAt = lastRunAt;
    }

    public int getTotalSimulations() {
        return totalSimulations;
    }

    public void setTotalSimulations(int totalSimulations) {
        this.totalSimulations = totalSimulations;
    }

    public long getAvgExecutionMs() {
        return avgExecutionMs;
    }

    public void setAvgExecutionMs(long avgExecutionMs) {
        this.avgExecutionMs = avgExecutionMs;
    }

    public double getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(double successRate) {
        this.successRate = successRate;
    }

    public Instant getLastRunAt() {
        return lastRunAt;
    }

    public void setLastRunAt(Instant lastRunAt) {
        this.lastRunAt = lastRunAt;
    }
}

