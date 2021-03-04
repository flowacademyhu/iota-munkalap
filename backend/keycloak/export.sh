#!/bin/bash

set -euo pipefail

TIMEOUT_SECONDS=300
LOGFILE=/tmp/keycloak-export.log
JSON_EXPORT_FILE=/keycloak/realm.json

rm -f ${LOGFILE}

touch ${LOGFILE}

echo "Export started, please wait..."

timeout ${TIMEOUT_SECONDS}s \
    /opt/jboss/tools/docker-entrypoint.sh \
        -Dkeycloak.migration.action=export \
        -Dkeycloak.migration.provider=singleFile \
        -Dkeycloak.migration.file=${JSON_EXPORT_FILE} \
        -Djboss.socket.binding.port-offset=99 \
    > ${LOGFILE} &

PID="${!}"

timeout ${TIMEOUT_SECONDS}s \
    grep -m 1 "Export finished successfully" <(tail -f ${LOGFILE})

kill ${PID}

