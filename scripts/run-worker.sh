#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="${SCRIPT_DIR}/.."

echo "[run-worker.sh] Project root: ${ROOT_DIR}"

if ! command -v java >/dev/null 2>&1; then
  echo "[ERROR] Java (java) not found in PATH. Please install JDK 17 and retry."
  exit 1
fi

if [ ! -d "${ROOT_DIR}/worker/target/classes" ] || [ ! -d "${ROOT_DIR}/common/target/classes" ]; then
  echo "[ERROR] Compiled classes not found."
  echo "        Please run: mvn clean install  (from project root) and retry."
  exit 1
fi

CP="${ROOT_DIR}/common/target/classes:${ROOT_DIR}/worker/target/classes"

echo "[run-worker.sh] Using classpath:"
echo "  ${CP}"
echo
WORKER_IP="192.168.10.131"
echo "[run-worker.sh] Starting Worker node..."
#java -cp "${CP}" com.grid.worker.workerApp
exec "$JAVA_CMD" \
  -Djava.rmi.server.hostname="$WORKER_IP" \
  -cp "$CP" \
  com.grid.worker.WorkerApp
