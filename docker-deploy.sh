#!/bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

echo "Build backend"
sh server/docker/build.sh

echo "Build frontend"
sh client/docker/build.sh

echo "Start Containers in detach mode"
docker-compose up -d
