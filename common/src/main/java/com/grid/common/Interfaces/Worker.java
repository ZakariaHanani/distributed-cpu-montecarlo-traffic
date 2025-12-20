package com.grid.common.Interfaces;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Worker extends Remote {

    String getId() throws RemoteException;
}