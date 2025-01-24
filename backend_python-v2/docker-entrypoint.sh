#!/bin/bash

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
MAX_TRIES=30
COUNTER=0
until nc -z $DB_HOST 3306 || [ $COUNTER -eq $MAX_TRIES ]; do
    echo "Attempting to connect to MySQL at $DB_HOST:3306 (attempt $COUNTER of $MAX_TRIES)..."
    COUNTER=$((COUNTER+1))
    sleep 2
done

if [ $COUNTER -eq $MAX_TRIES ]; then
    echo "Failed to connect to MySQL after $MAX_TRIES attempts!"
    exit 1
fi

echo "MySQL is ready!"

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Start server
echo "Starting server..."
exec gunicorn edutech.wsgi:application --bind 0.0.0.0:8000 --workers 3
