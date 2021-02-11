package hu.flowacademy.worksheet.configuration;

import lombok.Getter;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class KeycloakClientConfiguration {
    @Value("${keycloakBackendClient.server-url}")
    private String serverUrl;
    @Value("${keycloakBackendClient.realm}")
    private String realm;
    @Value("${keycloakBackendClient.realm2}")
    private String realm2;
    @Value("${keycloakBackendClient.adminusername}")
    private String adminUsername;
    @Value("${keycloakBackendClient.adminpassword}")
    private String adminPassword;
    @Value("${keycloakBackendClient.client-id}")
    private String clientId;
    @Value("${keycloakBackendClient.user-role}")
    private String userRole;
    @Value("${keycloak.credentials.secret}")
    private String clientSecret;
    @Value("${keycloakBackendClient.token-url}")
    private String tokenUrlEnding;
    private String tokenUrl = buildUrl(serverUrl, realm2, tokenUrlEnding);

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder
                .builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .username(adminUsername)
                .password(adminPassword)
                .clientId(clientId)
                .build();
    }

    private String buildUrl(String serverUrl, String realm2, String tokenUrlEnding) {
        return serverUrl + realm2 + tokenUrlEnding;
    }
}
