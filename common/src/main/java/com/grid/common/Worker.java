package com.grid.common;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Worker extends Remote {

    String getId() throws RemoteException;
}