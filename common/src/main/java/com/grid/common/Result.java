package com.grid.common;

import java.io.Serializable;
import java.util.Map;
import java.util.UUID;

/**
 * Represents the output of a task executed by a Worker.
 */
public interface Result extends Serializable {
    UUID getTaskId();
    String getWorkerId();
    Map<String, Object> getMetrics();
    long getExecutionTimeMs();
}
