FROM quay.io/keycloak/keycloak:12.0.2

RUN mkdir /keycloak

WORKDIR /keycloak

COPY realm.json .
COPY entrypoint.sh .

ENTRYPOINT "/keycloak/entrypoint.sh"

