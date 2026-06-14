#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="datenpflege-nord-website:local"
CONTAINER_NAME="dpn-website"
HOST_PORT="8080"
CONTAINER_PORT="3000"
HEALTHCHECK_URL="http://localhost:${HOST_PORT}"

echo "== DatenpflegeNord website deploy =="

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  CURRENT_BRANCH="$(git branch --show-current || true)"
  if [[ -n "${CURRENT_BRANCH}" ]]; then
    echo "Git branch: ${CURRENT_BRANCH}"
  else
    echo "Git branch: detached HEAD"
  fi

  echo "Updating repository with git pull --ff-only..."
  git pull --ff-only
else
  echo "Error: deploy script must be run from inside the website git repository." >&2
  exit 1
fi

echo "Building Docker image: ${IMAGE_NAME}"
docker build -t "${IMAGE_NAME}" .

if docker ps --format '{{.Names}}' | grep -Fxq "${CONTAINER_NAME}"; then
  echo "Stopping running container: ${CONTAINER_NAME}"
  docker stop "${CONTAINER_NAME}"
fi

if docker ps -a --format '{{.Names}}' | grep -Fxq "${CONTAINER_NAME}"; then
  echo "Removing existing container: ${CONTAINER_NAME}"
  docker rm "${CONTAINER_NAME}"
fi

echo "Starting container: ${CONTAINER_NAME}"
docker run -d \
  --name "${CONTAINER_NAME}" \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  --restart unless-stopped \
  "${IMAGE_NAME}"

echo "Current container status:"
docker ps --filter "name=${CONTAINER_NAME}"

echo "Running local healthcheck: ${HEALTHCHECK_URL}"
curl -fsS "${HEALTHCHECK_URL}" >/dev/null

echo "Deploy completed successfully."
