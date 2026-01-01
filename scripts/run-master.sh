#!/usr/bin/env bash
set -euo pipefail

# -----------------------------
# Resolve project root
# -----------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# -----------------------------
# CONFIG
# -----------------------------
MASTER_IP="192.168.10.131"   # <-- CHANGE to Master machine IP
RMI_PORT=1099

# -----------------------------
# Function to find Java
# -----------------------------
resolve_java() {
  # 1) If JAVA_HOME is set and java exists there, use it
  if [ -n "${JAVA_HOME:-}" ] && [ -x "$JAVA_HOME/bin/java" ]; then
    echo "$JAVA_HOME/bin/java"
    return 0
  fi

  # 2) Try java from PATH
  if command -v java >/dev/null 2>&1; then
    command -v java
    return 0
  fi

  # 3) Not found
  echo ""
  return 1
}

JAVA_CMD="$(resolve_java)"

if [ -z "$JAVA_CMD" ]; then
  echo "[ERROR] Java (JDK 17) not found."
  echo "        Please either:"
  echo "          - install Java and add 'java' to your PATH, or"
  echo "          - set JAVA_HOME to your JDK folder."
  exit 1
fi

echo "[run-master.sh] Using Java: $JAVA_CMD"

# -----------------------------
# Classpath & run
# -----------------------------
CP="$ROOT_DIR/common/target/classes:$ROOT_DIR/master/target/classes"

echo "[run-master.sh] Using classpath:"
echo "  $CP"
echo

exec "$JAVA_CMD" \
  -Djava.rmi.server.hostname="$MASTER_IP" \
  -Djava.rmi.registry.port="$RMI_PORT" \
  -cp "$CP" \
  com.grid.master.MasterApp


