#!/bin/bash

set -euo pipefail

docker-compose exec -T keycloak /keycloak/export.sh
