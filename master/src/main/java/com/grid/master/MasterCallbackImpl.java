package com.grid.master;

import com.grid.common.Interfaces.MasterCallback;
import com.grid.common.Interfaces.Result;
import com.grid.master.results.ResultCollector;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.List;
import java.util.UUID;

public class MasterCallbackImpl extends UnicastRemoteObject implements MasterCallback {

    private final ResultCollector collector;

    public MasterCallbackImpl(ResultCollector collector)  throws  RemoteException{
        this.collector = collector;
    }

    @Override
    public void onTaskCompleted(UUID jobId, Result partialResults) throws RemoteException {
        // Thread-safe, only completes job once
        collector.addResults(jobId, List.of(partialResults));
    }

    @Override
    public void onTaskFailed(UUID jobId, String errorMessage) throws RemoteException {
        collector.markJobFailed(jobId, errorMessage);
    }
}
