#!/bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

echo "Copy src files into the build context"
mkdir temp
cp ../web-client/*.json ./temp/
cp -r ../web-client/src ./temp/
cp -r ../web-client/public ./temp/

mkdir ./temp/env
cat > ./temp/env/.env.production << EOF
REACT_APP_API_ENDPOINT="http://localhost:8095"
PORT=4200
EOF

echo "Building docker Containers"
docker build -t web-project/client .

echo "Remove src files from docker context"
rm -rf temp
echo "Doned"
