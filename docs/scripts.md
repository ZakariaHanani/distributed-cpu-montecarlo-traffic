# Runtime scripts

This document explains how to run the CPU Grid system (RMI registry, Master, Worker, Client)
using the helper scripts in the `scripts/` directory.

The goal of these scripts is to make it easy to start all nodes on any machine
without having to remember long `java -cp ...` commands.

---

## 1. Prerequisites

Before using the scripts:

1. **Java 17+ installed**

    - Either:
        - `JAVA_HOME` is set, e.g. `C:\Program Files\Java\jdk-17` or `/usr/lib/jvm/java-17`
        - or `java` is available on the `PATH`

2. **Project built**

   From the repository root:

   ```bash
   mvn clean install
