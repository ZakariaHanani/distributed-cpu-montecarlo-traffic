#!/usr/bin/env bash
set -e

# Resolve project root (one level up from scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="${SCRIPT_DIR}/.."

echo "[run-master.sh] Project root: ${ROOT_DIR}"

# 1) Check that Java exists
if ! command -v java >/dev/null 2>&1; then
  echo "[ERROR] Java (java) not found in PATH. Please install JDK 17 and retry."
  exit 1
fi

# 2) Check that compiled classes exist (user must run 'mvn clean install' before)
if [ ! -d "${ROOT_DIR}/master/target/classes" ] || [ ! -d "${ROOT_DIR}/common/target/classes" ]; then
  echo "[ERROR] Compiled classes not found."
  echo "        Please run: mvn clean install  (from project root) and retry."
  exit 1
fi

# 3) Build classpath (only project modules for now)
CP="${ROOT_DIR}/common/target/classes:${ROOT_DIR}/master/target/classes"

echo "[run-master.sh] Using classpath:"
echo "  ${CP}"
echo

# 4) Start MasterNode
echo "[run-master.sh] Starting Master node..."
java -cp "${CP}" com.grid.master.MasterNode
