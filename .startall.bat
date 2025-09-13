REM create external network if missing
docker network inspect project-contract-testing-network >nul 2>&1 || docker network create project-contract-testing-network

cd ./licenses && docker compose up --build -d
cd ..\patients && docker compose up --build -d
cd ..\insurances && docker compose up --build -d
