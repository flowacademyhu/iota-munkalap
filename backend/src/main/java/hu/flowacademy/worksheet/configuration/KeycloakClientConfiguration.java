package hu.flowacademy.worksheet.configuration;

import hu.flowacademy.worksheet.service.KeycloakClientService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
@RequiredArgsConstructor
public class KeycloakClientConfiguration {

    private final KeycloakPropertiesConfiguration keycloakPropertiesConfiguration;

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder
                .builder()
                .serverUrl(keycloakPropertiesConfiguration.getServerUrl())
                .realm(keycloakPropertiesConfiguration.getRealm())
                .username(keycloakPropertiesConfiguration.getAdminUsername())
                .password(keycloakPropertiesConfiguration.getAdminPassword())
                .clientId(keycloakPropertiesConfiguration.getClientId())
                .build();
    }
}
