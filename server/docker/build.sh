#!/bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

echo "Copy src files into the build context"
mkdir temp
cp ../nestjs-server/*.json ./temp/
cp -r ../nestjs-server/src ./temp/

echo "Building docker Containers"
docker build -t web-project/nest .

echo "Remove src files from docker context"
rm -rf temp
rm -rf node_modules
echo "Doned"
