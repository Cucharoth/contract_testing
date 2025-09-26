REM create external network if missing
docker network inspect project-contract-testing-network >nul 2>&1 || docker network create project-contract-testing-network

REM Stop and remove containers/images/volumes for licenses, then start
pushd .\licenses >nul 2>&1
docker compose down --rmi local -v || echo "licenses: nothing to stop"
docker compose up --build -d
popd >nul 2>&1

REM Stop and remove containers/images/volumes for patients, then start
pushd .\patients >nul 2>&1
docker compose down --rmi local || echo "patients: nothing to stop"
docker compose up --build -d
popd >nul 2>&1

REM Stop and remove containers/images/volumes for insurances, then start
pushd .\insurances >nul 2>&1
docker compose down --rmi local || echo "insurances: nothing to stop"
docker compose up --build -d
popd
