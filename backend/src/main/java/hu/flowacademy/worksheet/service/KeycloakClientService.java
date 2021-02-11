package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.KeycloakClientConfiguration;
import hu.flowacademy.worksheet.configuration.KeycloakPropertiesConfiguration;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.exception.WorksheetUserException;
import hu.flowacademy.worksheet.exception.WorksheetUsernameTakenException;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
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

    public int createAccount(User importedUser) throws WorksheetUserException {
        CredentialRepresentation credential = createCredentials(importedUser.getPassword());
        UserRepresentation user = createUserRepresentation(importedUser.getFirst_name(),
                importedUser.getLast_name(), importedUser.getEmail(), credential);
        RealmResource ourRealm = keycloak.realm(keycloakPropertiesConfiguration.getRealm2());
        RolesResource roleList = ourRealm.roles();
        UsersResource everyOne = ourRealm.users();
        RoleRepresentation roleToUse = roleList.get(keycloakPropertiesConfiguration.getUserRole()).toRepresentation();
        javax.ws.rs.core.Response response = keycloak.realm(keycloakPropertiesConfiguration.getRealm2()).users().create(user);
        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource oneUser = everyOne.get(userId);
        oneUser.roles().realmLevel().add(List.of(roleToUse));
        final int status = response.getStatus();
        if (status != HttpStatus.CREATED.value()) {
            throw new WorksheetUsernameTakenException("Username taken!", HttpStatus.CONFLICT);
        }
        return HttpStatus.CREATED.value();
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
        user.setUsername(email);
        user.setCredentials(List.of(credential));
        user.setEnabled(true);
        user.setEmail(email);
        return user;
    }

    public AccessTokenResponse login(String email, String password) {
        return Keycloak.getInstance(
                keycloakPropertiesConfiguration.getServerUrl(),
                keycloakPropertiesConfiguration.getRealm2(),
                email, password,
                keycloakPropertiesConfiguration.getClientId(),
                keycloakPropertiesConfiguration.getClientSecret())
                .tokenManager()
                .getAccessToken();
    }
}
