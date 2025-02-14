#!/bin/sh

# Vérifier si la table alembic_version existe
if ! alembic current | grep -q '^ (head)'; then
  echo "Running initial migration..."
  alembic revision --autogenerate -m "Initial migration"
  alembic upgrade head
fi

echo "Starting FastAPI application..."
exec uvicorn main:app --host 0.0.0.0 --port 8000
