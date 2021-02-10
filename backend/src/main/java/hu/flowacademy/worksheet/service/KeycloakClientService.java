package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.KeycloakClientConfiguration;
import hu.flowacademy.worksheet.dto.LoginResponseDTO;
import hu.flowacademy.worksheet.exception.WorksheetUserException;
import hu.flowacademy.worksheet.exception.WorksheetUsernameTakenException;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Arrays;
import java.util.Locale;

@RequiredArgsConstructor
@Service
public class KeycloakClientService {

    private RestTemplate restTemplate = new RestTemplate();

    private final KeycloakClientConfiguration keycloakClientConfiguration;
    private final Keycloak keycloak;


    public int createAccount(String name, String email) throws WorksheetUserException {
        CredentialRepresentation credential = createCredentials();
        UserRepresentation user = createUserRepresentation(name, email, credential);
        RealmResource ourRealm = keycloak.realm("worksheet");
        RolesResource roleList = ourRealm.roles();
        UsersResource everyOne = ourRealm.users();
        RoleRepresentation roleToUse = roleList.get("worksheetuser").toRepresentation();
        javax.ws.rs.core.Response response = keycloak.realm("worksheet").users().create(user);
        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource oneUser = everyOne.get(userId);
        oneUser.roles().realmLevel().add(Arrays.asList(roleToUse));
        final int status = response.getStatus();
        if (status != HttpStatus.CREATED.value()) {
            throw new WorksheetUsernameTakenException("Username taken!", HttpStatus.CONFLICT);
        }
        return HttpStatus.CREATED.value();
    }

    private String[] nameChecker(String name) {
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

    public CredentialRepresentation createCredentials() {
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue("dummypassword");
        credential.setTemporary(false);
        return credential;
    }

    public UserRepresentation createUserRepresentation(String name, String email, CredentialRepresentation credential) {
        UserRepresentation user = new UserRepresentation();
        String[] namesToUse = nameChecker(name);
        user.setLastName(namesToUse[0]);
        user.setFirstName(namesToUse[1]);
        user.setUsername(user.getLastName().toLowerCase(Locale.ROOT) + email);
        user.setCredentials(Arrays.asList(credential));
        user.setEnabled(true);
        user.setEmail(email);
        return user;
    }

    public LoginResponseDTO login(String email, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", keycloakClientConfiguration.getClientId());
        map.add("client_secret", keycloakClientConfiguration.getClientSecret());
        map.add("password", password);
        map.add("username", email);
        map.add("grant_type", "password");
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        return restTemplate.postForEntity(keycloakClientConfiguration.getTokenUrl(), request, LoginResponseDTO.class).getBody();
    }
}
