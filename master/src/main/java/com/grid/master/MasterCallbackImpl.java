package com.grid.master;

import com.grid.common.MasterCallback;
import com.grid.common.Result;
import com.grid.master.results.ResultCollector;

import java.rmi.RemoteException;
import java.util.List;
import java.util.UUID;

public class MasterCallbackImpl implements MasterCallback {

    private final ResultCollector collector;

    public MasterCallbackImpl(ResultCollector collector) {
        this.collector = collector;
    }

    @Override
    public void onTaskCompleted(UUID jobId, List<Result> partialResults) throws RemoteException {
        // Thread-safe, only completes job once
        collector.addResults(jobId, partialResults);
    }

    @Override
    public void onTaskFailed(UUID jobId, String errorMessage) throws RemoteException {
        collector.markJobFailed(jobId, errorMessage);
    }
}
