package com.grid.common.dto;

import com.grid.common.model.SimulationResult;
import java.io.Serializable;

public record JobResult(
        JobStatus status,
        SimulationResult result,
        String errorMessage
) implements Serializable {}
