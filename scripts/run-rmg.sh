#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

PORT="${1:-1099}"

# find rmiregistry using JAVA_HOME or PATH
resolve_rmiregistry() {
  if [ -n "${JAVA_HOME:-}" ] && [ -x "$JAVA_HOME/bin/rmiregistry" ]; then
    echo "$JAVA_HOME/bin/rmiregistry"
    return 0
  fi

  if command -v rmiregistry >/dev/null 2>&1; then
    command -v rmiregistry
    return 0
  fi

  echo ""
  return 1
}

RMIREG_CMD="$(resolve_rmiregistry)"

if [ -z "$RMIREG_CMD" ]; then
  echo "[ERROR] rmiregistry not found."
  echo "        Make sure a JDK is installed and JAVA_HOME is set,"
  echo "        or rmiregistry is on your PATH."
  exit 1
fi

echo "[run-rmg.sh] Starting rmiregistry on port $PORT..."
exec "$RMIREG_CMD" -J-Djava.class.path="$ROOT_DIR/common/target/classes" "$PORT"
