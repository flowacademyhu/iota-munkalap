package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.exception.WorksheetUserException;
import hu.flowacademy.worksheet.exception.WorksheetUsernameTakenException;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Locale;

@Service
public class KeycloakClientService {

    @Value("${keycloakBackendClient.server-url}")
    private String SERVER_URL;
    @Value("${keycloakBackendClient.realm}")
    private String REALM;
    @Value("${keycloakBackendClient.realm2}")
    private String REALM2;
    @Value("${keycloakBackendClient.adminusername}")
    private String ADMIN_USERNAME;
    @Value("${keycloakBackendClient.adminpassword}")
    private String ADMIN_PASSWORD;
    @Value("${keycloakBackendClient.client-id}")
    private String CLIENT_ID;
    private String USER_ROLE = "worksheetuser";

    private Keycloak getInstance() {
        return KeycloakBuilder
                .builder()
                .serverUrl(SERVER_URL)
                .realm(REALM)
                .username(ADMIN_USERNAME)
                .password(ADMIN_PASSWORD)
                .clientId(CLIENT_ID)
                .build();
    }

    public int createAccount(String name, String email) throws WorksheetUserException {
        CredentialRepresentation credential = createCredentials();
        UserRepresentation user = createUserRepresentation(name, email, credential);
        RealmResource ourRealm = getInstance().realm("worksheet");
        RolesResource roleList = ourRealm.roles();
        UsersResource everyOne = ourRealm.users();
        RoleRepresentation roleToUse = roleList.get("worksheetuser").toRepresentation();
        javax.ws.rs.core.Response response = getInstance().realm("worksheet").users().create(user);
        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource oneUser = everyOne.get(userId);
        oneUser.roles().realmLevel().add(Arrays.asList(roleToUse));
        final int status = response.getStatus();
        if (status != HttpStatus.CREATED.value()) {
            throw new WorksheetUsernameTakenException("Username taken!", HttpStatus.CONFLICT);
        }
        return HttpStatus.CREATED.value();
    }

    private static String[] nameChecker(String name) {
        String[] out = new String[2];
        String[] namesToRegister = name.split(" ");
        out[0] = namesToRegister[0];
        if (namesToRegister.length < 2) {
            out[1] = "User";
        } else {
            StringBuilder builder = new StringBuilder();
            for (int i = 1; i < namesToRegister.length; i++) {
                builder.append(namesToRegister[i]).append(" ");
            }
            out[1] = builder.toString();
        }
        return out;
    }

    public static CredentialRepresentation createCredentials() {
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue("dummypassword");
        credential.setTemporary(false);
        return credential;
    }

    public static UserRepresentation createUserRepresentation(String name, String email, CredentialRepresentation credential) {
        UserRepresentation user = new UserRepresentation();
        String[] namesToUse = nameChecker(name);
        user.setLastName(namesToUse[0]);
        user.setFirstName(namesToUse[1]);
        user.setUsername(user.getLastName().toLowerCase(Locale.ROOT) + email);
        user.setCredentials(Arrays.asList(credential));
        return user;
    }
}
