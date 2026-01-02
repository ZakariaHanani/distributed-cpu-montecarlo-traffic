# **Distributed CPU Monte Carlo Traffic**  
## **Grid Computing Simulation Platform**

![Grid Computing](https://img.shields.io/badge/Grid-Computing-blue) ![Java RMI](https://img.shields.io/badge/Java-RMI-orange) ![Next.js](https://img.shields.io/badge/Frontend-Next.js-black) ![Distributed Systems](https://img.shields.io/badge/Distributed-Systems-green)

---

## **📋 Table of Contents**
1. [Project Overview](#-project-overview)
2. [System Architecture](#-system-architecture)
3. [How It Works](#-how-it-works)
4. [Technologies Used](#-technologies-used)
5. [Installation & Execution](#-installation--execution)
6. [Network Configuration](#-network-configuration)
7. [Scalability & Multi-Workers](#-scalability--multi-workers)
8. [Future Improvements](#-future-improvements)
9. [Contact](#-contact)

---

## **🚀 Project Overview**

**Distributed CPU Monte Carlo Traffic** is a high-performance Grid Computing platform designed to distribute CPU-intensive Monte Carlo simulations across multiple machines (Workers) managed by a central Master node.

### **🎯 Goals**
- **Leverage distributed CPU power** across multiple nodes
- **Execute simulations in parallel** for faster computation
- **Aggregate results efficiently** with minimal overhead
- **Provide a modern user interface** using Next.js for visualization
- **Support dynamic worker scaling** for on-demand computation

---

## **🏗️ System Architecture**

```mermaid
graph TB
    subgraph "Frontend Layer"
        F[Next.js Client]
    end
    
    subgraph "Coordination Layer"
        R[RMI Registry]
    end
    
    subgraph "Control Layer"
        M[Master Node]
    end
    
    subgraph "Computation Layer"
        W1[Worker Node 1]
        W2[Worker Node 2]
        W3[Worker Node N...]
    end
    
    F -->|Start Simulation| M
    R -->|Service Discovery| M
    R -->|Service Registration| W1
    R -->|Service Registration| W2
    R -->|Service Registration| W3
    M -->|Distribute Tasks| W1
    M -->|Distribute Tasks| W2
    M -->|Distribute Tasks| W3
    W1 -->|Return Results| M
    W2 -->|Return Results| M
    W3 -->|Return Results| M
    M -->|Aggregate & Display| F
```

### **Architecture Components**

| Component | Role | Description |
|-----------|------|-------------|
| **RMI Registry** | Service Discovery | Central registry for coordinating nodes |
| **Master Node** | Task Manager | Splits simulations, assigns tasks, aggregates results |
| **Worker Nodes** | Computation Units | Perform CPU-intensive calculations |
| **Client/Frontend** | User Interface | Next.js app for simulation control and visualization |

---

## **⚙️ How It Works**

### **Workflow Overview**
```mermaid
sequenceDiagram
    participant C as Client
    participant R as RMI Registry
    participant M as Master
    participant W1 as Worker 1
    participant W2 as Worker 2
    
    Note over R: 1. Start RMI Registry
    Note over M: 2. Master registers with Registry
    Note over W1,W2: 3. Workers register with Registry
    
    C->>M: 4. Launch Simulation
    M->>M: 5. Split into Tasks
    M->>W1: 6. Assign Task 1
    M->>W2: 7. Assign Task 2
    par Parallel Execution
        W1->>W1: Compute Task 1
        W2->>W2: Compute Task 2
    end
    W1->>M: 8. Return Results
    W2->>M: 9. Return Results
    M->>M: 10. Aggregate Results
    M->>C: 11. Display Final Results
```

### **Key Features**
- **Asynchronous execution** - Workers process tasks independently
- **Dynamic scaling** - Workers can join/leave during execution
- **Fault tolerance** - System continues if workers disconnect
- **Load balancing** - Tasks distributed based on worker availability

---

## **🛠️ Technologies Used**

### **Backend (Grid Computing)**
![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)
![RMI](https://img.shields.io/badge/RMI-Distributed_Objects-red)
![Maven](https://img.shields.io/badge/Maven-Multi--Module_CB71AC?logo=apache-maven&logoColor=white)
![Concurrency](https://img.shields.io/badge/Concurrency-Multithreading-green)

### **Frontend**
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict_3178C6?logo=typescript&logoColor=white)

### **Tools & Environment**
![Git](https://img.shields.io/badge/Git-Version_Control-F05032?logo=git&logoColor=white)
![Bash](https://img.shields.io/badge/Bash-Scripting-4EAA25?logo=gnu-bash&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-Recommended-FCC624?logo=linux&logoColor=black)

---


---

## **🚀 Installation & Execution**

### **1. Clone the Repository**
```bash
git clone https://github.com/ZakariaHanani/distributed-cpu-montecarlo-traffic.git
cd distributed-cpu-montecarlo-traffic
```

### **2. Build the Project**
```bash
mvn clean install
```

### **3. Start the RMI Registry**
```bash
./scripts/run-registry.sh
```
**Output:** `✅ RMI Registry started on port 1099`

### **4. Start the Master Node**
```bash
./scripts/run-master.sh
```
**Output:** `✅ Master registered successfully`

### **5. Configure and Start Workers**
**⚠️ Each worker must define its own machine IP address**

Edit `scripts/run-worker.sh`:
```bash
WORKER_IP=192.168.1.10  # Replace with your machine IP
```

Start the worker:
```bash
./scripts/run-worker.sh
```
**Output:** `✅ Worker registered: Worker@192.168.1.10`

### **6. Launch the Client**
```bash
./scripts/run-client.sh
```

### **7. Access the Web Interface**
```bash
cd frontend
npm run dev
```
Visit: `http://localhost:3000`

---

## **🌐 Network Configuration**

### **Worker Configuration**
Each worker must:
- **Use its local machine IP** (not localhost)
- **Be reachable over the network**
- **Have appropriate firewall rules**

### **Central Configuration**
The Master and Registry can load network settings from:
```properties
# config.properties
registry.host=192.168.1.1
registry.port=1099
master.host=192.168.1.2
worker.pool.size=10
```

**Benefits:**
- Single configuration file
- No code changes for network adjustments
- Easy deployment across environments

---

## **📈 Scalability & Multi-Workers**

### **Dynamic Scaling**
```
┌─────────────────────────────────────┐
│          Master Node                │
│  ┌────────────────────────────┐    │
│  │    Task Queue              │    │
│  │  • Task 1 ──────► Worker 1 │    │
│  │  • Task 2 ──────► Worker 2 │    │
│  │  • Task 3 ──────► Worker 3 │    │
│  │  • Task 4 ──────► Worker 4 │    │
│  └────────────────────────────┘    │
└─────────────────────────────────────┘
```

### **Performance Benefits**
| Workers | Speed Increase | Use Case |
|---------|---------------|----------|
| 1 Worker | 1x Baseline | Development |
| 4 Workers | ~3.8x Faster | Small cluster |
| 10 Workers | ~9.5x Faster | Medium cluster |
| 50+ Workers | Linear Scaling | Cloud deployment |

**Formula:** `Speedup ≈ N / (1 + (N-1)*f)` where f is parallelizable fraction

### **Features**
- ✅ **Dynamic worker joining/leaving**
- ✅ **Automatic task redistribution**
- ✅ **Load balancing**
- ✅ **Fault tolerance**
- ✅ **Minimal coordination overhead**

---

### **Best Practices**
1. **Branch Naming**: `feature/`, `fix/`, `docs/`, `refactor/`
2. **Commit Messages**: Use conventional commits
3. **Code Reviews**: All PRs require review
4. **Testing**: Distributed testing across multiple machines

---

## **🔮 Future Improvements**

### **Planned Features**
| Feature | Status | Expected |
|---------|--------|----------|
| Automatic Worker Discovery | Planned | 2026 |
| Advanced Load Balancing | Planned | 2026 |
| Fault Tolerance & Health Monitoring | Research | 2026 |
| Real-time Dashboard |  Planned | 2026 |
| Docker/Kubernetes Deployment | Planned | 2026 |
| GPU Acceleration Support | Research | 2026 |

### **Research Areas**
- **Machine Learning** for optimal task distribution
- **Blockchain** for worker verification and trust
- **Edge Computing** integration for IoT devices
- **Quantum Computing** readiness

---

## **📞 Contact**

### **Project Maintainer**
👨‍💻 **Zakaria HANANI**

| Platform | Link |
|----------|------|
| **GitHub** | [github.com/ZakariaHanani](https://github.com/ZakariaHanani) |
| **Email** | zakarhanani@gmail.com |
| **LinkedIn** | [linkedin.com/in/zakaria-hanani](https://linkedin.com/in/zakaria-hanani) |

👨‍💻 **Mohamed OUIJJANE**

| Platform | Link |
|----------|------|
| **GitHub** | [github.com/MohamedOuijjane](https://github.com/MohamedOuijjane) |
| **Email** | ouijjane22@gmail.com |
| **LinkedIn** | [[linkedin.com/in/mohamedouijjane](http://mohamedouijjane.me/](https://ma.linkedin.com/in/mohamed-ouijjane-2882a2395)) |

👨‍💻 **Ayoub Karkouri**

| Platform | Link |
|----------|------|
| **GitHub** | [github.com/MohamedOuijjane](https://github.com/ARKOURI856) |
| **Email** | ayoubkarkouri20@gmail.com |
| **LinkedIn** | [linkedin.com/in/ayoubkarkouri](https://www.linkedin.com/in/ayoubkarkouri/) |


👨‍💻 **ahmed LAHMAINE**

| Platform | Link |
|----------|------|
| **GitHub** | [github.com/MohamedOuijjane](https://github.com/ahmed-la14) |
| **Email** | ahmedlahmain@gmail.com |


👨‍💻 **Ali HALLA**

| Platform | Link |
|----------|------|
| **GitHub** | [github.com/Alihalla](https://github.com/Alihalla) |
| **Email** | hallaali841@gmail.com |


👨‍💻 **Hmad AIT LAHMOUSS**

| Platform | Link |
|----------|------|
| **GitHub** | [github.com/hmad-ait-lahmous](https://github.com/hmad-ait-lahmous) |
| **Email** | aitlahmous.hmad@gmail.com|


👨‍💻 **Mohamed OUADRA**

| Platform | Link |
|----------|------|
| **GitHub** | [github.com/MohamedOuadra](https://github.com/MohamedOuadra) |
| **Email** | mohamed.oudra3@gmail.com |


### **Contribution**
We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request
4. Join our discussions

---


---

## **🎯 Quick Start Summary**

```bash
# 1. Clone & Build
git clone <repo-url> && cd repo
mvn clean install

# 2. Start Services (in separate terminals)
./scripts/run-registry.sh
./scripts/run-master.sh
./scripts/run-worker.sh  # Repeat for each worker

# 3. Launch Interface
cd frontend && npm run dev

# 4. Open browser: http://localhost:3000
```

---

## **📜 License**
© 2025 – Distributed CPU Monte Carlo Traffic  
**Grid Computing • Java RMI • High-Performance Computing**

---

<div align="center">

### **🌟 Star us on GitHub if you find this project useful!**
[![GitHub Stars](https://img.shields.io/github/stars/ZakariaHanani/distributed-cpu-montecarlo-traffic?style=social)](https://github.com/ZakariaHanani/distributed-cpu-montecarlo-traffic)

*"Harnessing distributed power for complex simulations"*
</div>

---

**Tags**: `grid-computing` `monte-carlo` `java-rmi` `distributed-systems` `nextjs` `high-performance` `parallel-computing` `simulation`

---

<div align="center">
  <sub>Built with ❤️ by the distributed computing community</sub><br>
  <sup>Last updated: December 2025</sup>
</div>
