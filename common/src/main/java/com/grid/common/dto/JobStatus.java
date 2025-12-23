package com.grid.common.dto;

import java.io.Serializable;

public enum JobStatus implements Serializable {
    PENDING,
    RUNNING,
    COMPLETED,
    FAILED
}
