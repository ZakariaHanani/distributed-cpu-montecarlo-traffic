package com.grid.common.model;

import com.grid.common.AbstractTask;

import java.util.Map;
import java.util.UUID;

/**
 * High-level job sent by the Client to the Master.
 * It just wraps the global SimulationParams.
 *
 * The Master will later:
 *  - take these params
 *  - split into SimulationChunkTask objects (TaskSplitter)
 *  - dispatch chunks to workers
 */
public class SimulationJobTask extends AbstractTask {

    private final SimulationParams params;

    public SimulationJobTask(SimulationParams params) {
        super(
                UUID.randomUUID(),            // internal taskId
                Map.of("type", "JOB"),        // simple metadata for now
                System.currentTimeMillis()    // creation timestamp
        );
        this.params = params;
    }

    public SimulationParams getParams() {
        return params;
    }

    @Override
    public String toString() {
        return "SimulationJobTask{id=" + getTaskId() + ", params=" + params + "}";
    }
}
