package hu.flowacademy.worksheet.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class KeycloakPropertiesConfiguration {
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

    private String buildUrl(String serverUrl, String realm2, String tokenUrlEnding) {
        return serverUrl + realm2 + tokenUrlEnding;
    }
}
