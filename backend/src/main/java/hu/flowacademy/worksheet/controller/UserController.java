package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.LoginResponseDTO;
import hu.flowacademy.worksheet.dto.UserOperationDTO;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.exception.WorksheetUserException;
import hu.flowacademy.worksheet.service.KeycloakClientService;
import hu.flowacademy.worksheet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

@RequiredArgsConstructor
@RestController
@RequestMapping("api")
public class UserController {

    private final UserService userService;

    private final KeycloakClientService keycloakClientService;

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    @RolesAllowed("admin")
    public User createUser(@RequestBody UserOperationDTO userOperationDTO) throws WorksheetUserException {
        User user = User.builder()
                .name(userOperationDTO.getName())
                .email(userOperationDTO.getEmail())
                .password(userOperationDTO.getPassword())
                .build();
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    @PermitAll
    public AccessTokenResponse login(@RequestBody UserOperationDTO userOperationDTO) {
        return keycloakClientService.login(userOperationDTO.getEmail(), userOperationDTO.getPassword());

    }

}
