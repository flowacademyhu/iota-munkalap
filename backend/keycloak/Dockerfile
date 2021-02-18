FROM quay.io/keycloak/keycloak:12.0.2

USER root

RUN mkdir /keycloak

USER 1000

WORKDIR /keycloak

COPY realm.json .
COPY entrypoint.sh .

ENTRYPOINT "/keycloak/entrypoint.sh"

