package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.KeycloakClientConfiguration;
import hu.flowacademy.worksheet.configuration.KeycloakPropertiesConfiguration;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.exception.WorksheetUsernameTakenException;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class KeycloakClientService {

    private final KeycloakClientConfiguration keycloakClientConfiguration;
    private final KeycloakPropertiesConfiguration keycloakPropertiesConfiguration;
    private final Keycloak keycloak;

    public void createAccount(User importedUser) throws ValidationException {
        CredentialRepresentation credential = createCredentials(importedUser.getPassword());
        RealmResource ourRealm = keycloak.realm(keycloakPropertiesConfiguration.getCustomRealm());
        RoleRepresentation roleToUse = ourRealm.roles().get(keycloakPropertiesConfiguration.getUserRole()).toRepresentation();
        javax.ws.rs.core.Response response = keycloak.realm(keycloakPropertiesConfiguration.getCustomRealm()).users().create(
                createUserRepresentation(importedUser.getFirstName(), importedUser.getLastName(),
                        importedUser.getEmail(), credential)
        );
        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource oneUser = ourRealm.users().get(userId);
        oneUser.roles().realmLevel().add(List.of(roleToUse));
        if (response.getStatus() != HttpStatus.CREATED.value()) {
            throw new WorksheetUsernameTakenException("Username taken!");
        }
    }

    public CredentialRepresentation createCredentials(String password) {
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);
        credential.setTemporary(false);
        return credential;
    }

    public UserRepresentation createUserRepresentation(String firstName, String lastName, String email, CredentialRepresentation credential) {
        UserRepresentation user = new UserRepresentation();
        user.setLastName(lastName);
        user.setFirstName(firstName);
        user.setUsername(email + "1");
        user.setCredentials(List.of(credential));
        user.setEnabled(true);
        user.setEmail(email);
        return user;
    }

    public void setUserStatus(User user) {
        UserRepresentation changedUser = keycloak.realm(keycloakPropertiesConfiguration.getCustomRealm()).users().search(user.getEmail()).get(0);
        changedUser.setEnabled(user.isEnabled());
        keycloak.realm(keycloakPropertiesConfiguration.getCustomRealm()).users().get(changedUser.getId()).update(changedUser);
    }

    public void setUserUpdate(User user, String email) {
        UserRepresentation updatedUser = keycloak.realm(keycloakPropertiesConfiguration.getCustomRealm()).users().search(email).get(0);
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        keycloak.realm(keycloakPropertiesConfiguration.getCustomRealm()).users().get(updatedUser.getId()).update(updatedUser);
    }

    public AccessTokenResponse login(String email, String password) {
        return Keycloak.getInstance(
                keycloakPropertiesConfiguration.getServerUrl(),
                keycloakPropertiesConfiguration.getCustomRealm(),
                email, password,
                keycloakPropertiesConfiguration.getCustomClientId(),
                keycloakPropertiesConfiguration.getClientSecret())
                .tokenManager()
                .getAccessToken();
    }
}
