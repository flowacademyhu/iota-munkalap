package hu.flowacademy.worksheet.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class KeycloakPropertiesConfiguration {
    @Value("${keycloak.auth-server-url}")
    private String serverUrl;
    @Value("${keycloakBackendClient.realm}")
    private String realm;
    @Value("${keycloak.realm}")
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
}
