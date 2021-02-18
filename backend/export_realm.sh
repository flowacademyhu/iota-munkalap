#!/bin/bash

set -euo pipefail

docker-compose exec keycloak /keycloak/export.sh
