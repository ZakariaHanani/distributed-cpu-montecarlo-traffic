package com.grid.master.assignment;

import com.grid.common.Interfaces.IWorker;

public class WorkerInfo {

    private final String id;
    private final IWorker stub;
    private volatile long lastHeartbeat;
    private WorkerStatus status = WorkerStatus.AVAILABLE;

    public WorkerInfo(String id, IWorker stub) {
        this.id = id;
        this.stub = stub;
        this.lastHeartbeat = System.currentTimeMillis();
    }

    public void heartbeat() {
        lastHeartbeat = System.currentTimeMillis();
    }

    public long lastSeen() {
        return lastHeartbeat;
    }

    public String getId() {
        return id;
    }

    public IWorker getStub() {
        return stub;
    }

    public WorkerStatus getStatus() {
        return status;
    }

    public void setStatus(WorkerStatus status) {
        this.status = status;
    }
}
