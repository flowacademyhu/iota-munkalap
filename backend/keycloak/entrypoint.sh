#!/bin/bash

set -euo pipefail

export KEYCLOAK_USER=gyanyim
export KEYCLOAK_PASSWORD="snxTZr9\$5GGnS7w"

if [[ -f "/keycloak/realm.json" ]]; then
    /opt/jboss/tools/docker-entrypoint.sh -b 0.0.0.0 -Dkeycloak.profile.feature.upload_scripts=enabled -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.realmName=worksheet -Dkeycloak.migration.file=/keycloak/realm.json
else
    /opt/jboss/tools/docker-entrypoint.sh -b 0.0.0.0 -Dkeycloak.profile.feature.upload_scripts=enabled
fi
