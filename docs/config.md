# ⚙️ Configuration Fields Documentation (`config.properties`)

This document details all required configuration keys used across the Master, Worker, and Client modules in the Monte Carlo Distributed Grid. This file must be located at `/config/config.properties`.

## 1. Network and RMI Connection Settings

| Key | Default Value | Description | Used By |
| :--- | :--- | :--- | :--- |
| `registry.host` | `127.0.0.1` | The **IP Address** of the machine running the main **RMI Registry**. This must be the Master Node's IP in a deployed environment. | All Modules |
| `registry.port` | `1099` | The **Port Number** where the RMI Registry is bound. The standard default RMI port. | All Modules |
| `master.port` | `1100` | The Port Number where the **Master's remote service** is exported. Clients use this to connect to the Master. | Master, Client |

## 2. Worker Execution and Reliability Settings

| Key | Unit | Description | Used By |
| :--- | :--- | :--- | :--- |
| `worker.max.retries` | Integer | The maximum number of attempts the Worker will make to connect to the RMI Registry before shutting down (Critical for Issue 5.1). | Worker |
| `worker.wait.time.ms` | Milliseconds (ms) | The delay (sleep duration) between failed connection attempts (retries) by the Worker Node. | Worker |
| `heartbeat.interval` | Milliseconds (ms) | The fixed time interval at which the Worker Node sends a "Keep Alive" signal (Heartbeat) to the Master (Related to Issue 9). | Worker |
| `timeout.value` | Milliseconds (ms) | The maximum time the Master or Client will wait for a response from a remote service before considering it failed or timed out (Related to Issue 10). | Master, Client |

## 3. Simulation Parameters

| Key | Unit | Description | Used By |
| :--- | :--- | :--- | :--- |
| `simulation.iterations` | Integer | The total number of iterations/samples the entire simulation should run (N total). | Master, Client |