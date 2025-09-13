# ...existing code...
#!/usr/bin/env bash
set -euo pipefail

NETWORK="project-contract-testing-network"
DB_CONTAINER="db.contract_testing.local"
MAX_WAIT=120
INTERVAL=2

echo "Ensuring Docker network '${NETWORK}' exists..."
docker network inspect "${NETWORK}" > /dev/null 2>&1 || docker network create "${NETWORK}"

echo "Starting licenses (DB) stack..."
pushd ./licenses > /dev/null
docker compose up --build -d
popd > /dev/null

echo "Waiting for DB container '${DB_CONTAINER}' to become healthy (timeout ${MAX_WAIT}s)..."
elapsed=0
while true; do
  if docker inspect -f '{{.State.Health.Status}}' "${DB_CONTAINER}" > /dev/null 2>&1; then
    status=$(docker inspect -f '{{.State.Health.Status}}' "${DB_CONTAINER}")
    if [ "${status}" = "healthy" ]; then
      echo "DB is healthy."
      break
    fi
  else
    # Fallback: try pg_isready inside the container (works if no health check field)
    if docker exec "${DB_CONTAINER}" pg_isready -U postgres > /dev/null 2>&1; then
      echo "DB responded to pg_isready."
      break
    fi
  fi

  if [ "${elapsed}" -ge "${MAX_WAIT}" ]; then
    echo "Timed out waiting for DB to become ready." >&2
    docker logs --tail 50 "${DB_CONTAINER}" || true
    exit 1
  fi

  sleep "${INTERVAL}"
  elapsed=$((elapsed + INTERVAL))
done

echo "Starting patients stack..."
pushd ./patients > /dev/null
docker compose up --build -d
popd > /dev/null

echo "Starting insurances stack..."
pushd ./insurances > /dev/null
docker compose up --build -d
popd > /dev/null

echo "All stacks