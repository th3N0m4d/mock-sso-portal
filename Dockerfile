FROM quay.io/keycloak/keycloak:24.0


COPY realm-export.json /opt/keycloak/data/import/realm-export.json

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--hostname-strict=false", "--import-realm", "--http-port=8080", "--hostname-strict-https=false"]
