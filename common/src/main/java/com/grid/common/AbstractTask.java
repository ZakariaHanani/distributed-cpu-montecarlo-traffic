package com.grid.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class AbstractTask implements Task {
    protected UUID taskId;
    protected Map<String, Object> parameters;
    protected long seed;
}
