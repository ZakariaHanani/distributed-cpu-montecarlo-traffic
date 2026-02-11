package com.trafficjam1.authservice.user;

import java.time.Instant;

public class UserStatsResponse {
    private int totalSimulations;
    private long avgExecutionMs;
    private double successRate;
    private Instant lastRunAt;
    private int pendingSimulations;
    private int failedSimulations;

    public UserStatsResponse() {
    }

    public UserStatsResponse(int totalSimulations, long avgExecutionMs, double successRate, Instant lastRunAt, int pendingSimulations, int failedSimulations) {
        this.totalSimulations = totalSimulations;
        this.avgExecutionMs = avgExecutionMs;
        this.successRate = successRate;
        this.lastRunAt = lastRunAt;
        this.pendingSimulations = pendingSimulations;
        this.failedSimulations = failedSimulations;
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

    public int getPendingSimulations() {
        return pendingSimulations;
    }

    public void setPendingSimulations(int pendingSimulations) {
        this.pendingSimulations = pendingSimulations;
    }

    public int getFailedSimulations() {
        return failedSimulations;
    }

    public void setFailedSimulations(int failedSimulations) {
        this.failedSimulations = failedSimulations;
    }
}

