#!/bin/bash

set -euo pipefail

docker-compose exec -T keycloak /keycloak/import.sh
