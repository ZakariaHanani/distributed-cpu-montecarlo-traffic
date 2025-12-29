package com.grid.common.Interfaces;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Heartbeat extends Remote {
    /* ================= WORKER API ================= */

    void registerWorker(String workerId, IWorker worker) throws RemoteException;

    void heartbeat(String workerId) throws RemoteException;

    void unregisterWorker(String workerId) throws RemoteException;
}
