#!/bin/sh
set -e

echo "Making migrations and migrating the database. "
python manage.py makemigrations --noinput || true
python manage.py migrate --noinput

python manage.py collectstatic --noinput || true

WORKERS="${WEB_CONCURRENCY:-2}"
PORT="${PORT:-8000}"

echo "Starting gunicorn with workers=$WORKERS on port=$PORT"
exec gunicorn djangoproj.wsgi:application --bind 0.0.0.0:$PORT --workers $WORKERS
