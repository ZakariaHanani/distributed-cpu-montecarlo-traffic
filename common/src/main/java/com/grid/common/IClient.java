package com.grid.common;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.UUID;

/**
 * Client interface for potential callbacks or notifications (optional).
 * For now, not strictly needed in your project.
 */
public interface IClient extends Remote {
    // Could add methods if Master needs to notify Client, e.g.,
    // void notifyProgress(UUID taskId, double progress) throws RemoteException;
}
