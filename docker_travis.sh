#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t ecm .
docker tag ecm jjavier98/ecm
docker push jjavier98/ecm