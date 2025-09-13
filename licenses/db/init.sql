CREATE DATABASE IF NOT EXISTS project_contract_testing;

-- SELECT the aguas database
\c project_contract_testing;

-- Enable the uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";