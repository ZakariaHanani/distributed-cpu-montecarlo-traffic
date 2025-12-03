package com.grid.master.assignment;

import com.grid.common.IWorker;

public class WorkerInfo {
    private final String id;
    private final IWorker stub;
    private WorkerStatus status;

    public WorkerInfo(String id, IWorker stub) {
        this.id = id;
        this.stub = stub;
        this.status = WorkerStatus.AVAILABLE;
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
