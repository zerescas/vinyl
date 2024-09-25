#!/bin/bash
# Script to init database, when it doesn't exist
# It mounts to "/docker-entrypoint-initdb.d/init-db.sh" in "compose.yaml"

set -e

psql -v ON_ERROR_STOP=1 -U postgres <<-EOSQL
  CREATE USER vinyl WITH PASSWORD '$POSTGRES_USER_PASSWORD' CREATEDB;
  CREATE DATABASE vinyl;
  GRANT ALL PRIVILEGES ON DATABASE vinyl TO vinyl;

  \c vinyl;

  GRANT USAGE ON SCHEMA public TO vinyl;
  GRANT CREATE ON SCHEMA public TO vinyl;
  ALTER SCHEMA public OWNER TO vinyl;
EOSQL