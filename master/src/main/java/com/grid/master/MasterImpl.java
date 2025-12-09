package com.grid.master;


import com.grid.common.IMaster;
import com.grid.common.Result;
import com.grid.common.Task;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.UUID;


public class MasterImpl extends UnicastRemoteObject implements IMaster {

    protected MasterImpl() throws RemoteException {
        super();
    }

    @Override
    public UUID submitTask(Task task) throws RemoteException {
        UUID jobId = task.getTaskId();

        System.out.printf(
                "[Master] Received task %s of type %s%n",
                jobId,
                task.getClass().getSimpleName()
        );

        // 1. Split task
        // 2. Assign to workers
        // 3. Collect results
        // 4. Merge
        return jobId;
    }

    @Override
    public Result getFinalResult(UUID taskId) throws RemoteException {
        return null;
    }
}
