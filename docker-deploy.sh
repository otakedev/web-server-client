#!/bin/bash

SERVER_URL=${1:-http://localhost:8095}

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

echo "Build backend"
chmod +x ./server/docker/build.sh
bash server/docker/build.sh

echo "Build frontend"
chmod +x ./client/docker/build.sh
bash client/docker/build.sh $SERVER_URL

echo "Start Containers in detach mode"
docker-compose up -d
