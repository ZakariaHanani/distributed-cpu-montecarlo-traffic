package com.grid.common;

import java.io.Serializable;
import java.util.Map;
import java.util.UUID;

/**
 * Represents a unit of work that can be sent from the client
 * to the master, then executed by a worker node.
 *
 * All task implementations MUST be Serializable so they can
 * travel across the network (RMI/sockets).
 */
public interface Task extends Serializable {

    /**
     * Returns a unique identifier for this task.
     * Default implementations usually generate it with UUID.
     */
    UUID getTaskId();

    /**
     * Returns the parameters needed to execute the task.
     * This stays generic so different task types can use it.
     */
    Map<String, Object> getParameters();

    /**
     * Optional random seed used for deterministic or Monte-Carlo style tasks.
     */
    long getSeed();


    /**
     * Executes the logic of the task.
     * @return A Result object describing the result of the execution. ( Maxi daba , tal mn ba3d)
     */

    //Result execute();

}
