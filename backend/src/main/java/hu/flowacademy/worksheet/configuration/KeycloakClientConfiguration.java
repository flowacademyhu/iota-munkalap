package hu.flowacademy.worksheet.configuration;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Getter
@RequiredArgsConstructor
@Import(KeycloakPropertiesConfiguration.class)
public class KeycloakClientConfiguration {

    private final KeycloakPropertiesConfiguration keycloakPropertiesConfiguration;

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder
                .builder()
                .serverUrl(keycloakPropertiesConfiguration.getServerUrl())
                .realm(keycloakPropertiesConfiguration.getMasterRealm())
                .username(keycloakPropertiesConfiguration.getAdminUsername())
                .password(keycloakPropertiesConfiguration.getAdminPassword())
                .clientId(keycloakPropertiesConfiguration.getAdminClientId())
                .build();
    }
}
