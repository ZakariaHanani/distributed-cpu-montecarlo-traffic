package com.grid.worker;

import com.grid.common.IWorker;
import com.grid.common.MasterCallback;
import com.grid.common.Result;
import com.grid.common.Task;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.List;
import java.util.UUID;

public class WorkerImplExampleForAsync extends UnicastRemoteObject implements IWorker {
    public WorkerImplExampleForAsync() throws RemoteException {}

    @Override
    public void executeAsync(UUID jobId, Task task, MasterCallback callback)
            throws RemoteException {

        new Thread(() -> {
            try {
                Result result = null ; // execute the task something like   result = task.execute() // heavy computing
                callback.onTaskCompleted(jobId, List.of(result));
            } catch (Exception e) {
                System.err.println("[Worker] Error: " + e);
                //you can callback the OnTaskFailled
            }
        }).start();
    }

    @Override
    public Result execute(Task task) throws RemoteException {
        return null;
    }
}

