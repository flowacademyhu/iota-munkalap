#!/bin/bash

set -euo pipefail

TIMEOUT_SECONDS=300
LOGFILE=/tmp/keycloak-import.log
JSON_EXPORT_FILE=/keycloak/realm.json

rm -f ${LOGFILE}

touch ${LOGFILE}

echo "Import started, please wait..."

timeout ${TIMEOUT_SECONDS}s \
    /opt/jboss/tools/docker-entrypoint.sh \
        -Dkeycloak.migration.action=import \
        -Dkeycloak.migration.provider=singleFile \
        -Dkeycloak.migration.file=${JSON_EXPORT_FILE} \
        -Dkeycloak.profile.feature.upload_scripts=enabled \
        -Djboss.socket.binding.port-offset=99 \
    > ${LOGFILE} &

PID="${!}"

timeout ${TIMEOUT_SECONDS}s \
    grep -m 1 "Import finished successfully" <(tail -f ${LOGFILE})

kill ${PID}

