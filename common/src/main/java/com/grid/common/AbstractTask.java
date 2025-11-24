package com.grid.common;

import java.util.Map;
import java.util.UUID;

public abstract class AbstractTask implements Task {
    protected UUID taskId;
    protected Map<String, Object> parameters;
    protected long seed;

    public AbstractTask(UUID taskId, Map<String, Object> parameters, long seed) {
        this.taskId = taskId;
        this.parameters = parameters;
        this.seed = seed;
    }

    @Override
    public UUID getTaskId() { return taskId; }

    @Override
    public Map<String, Object> getParameters() { return parameters; }

    @Override
    public long getSeed() { return seed; }
}
