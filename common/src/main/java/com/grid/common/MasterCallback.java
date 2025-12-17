package com.grid.common;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;
import java.util.UUID;

public interface MasterCallback extends Remote {

    void onTaskCompleted(UUID jobId, Result partialResults) throws RemoteException;

    void onTaskFailed(UUID jobId, String errorMessage) throws RemoteException ;

}
