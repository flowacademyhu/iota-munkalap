package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.UserOperationDTO;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.enumCustom.Status;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.service.KeycloakClientService;
import hu.flowacademy.worksheet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api")
public class UserController {

    private final UserService userService;

    private final KeycloakClientService keycloakClientService;

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    @RolesAllowed("admin")
    public User createUser(@RequestBody UserOperationDTO userOperationDTO) throws ValidationException {
        User user = User.builder()
                .firstName(userOperationDTO.getFirstName())
                .lastName(userOperationDTO.getLastName())
                .email(userOperationDTO.getEmail())
                .password(userOperationDTO.getPassword())
                .build();
        return userService.saveUser(user);
    }

    //Loginoláskor a Keycloakhoz indít továbbhívást.
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    @PermitAll
    public AccessTokenResponse login(@RequestBody UserOperationDTO userOperationDTO) {
        return keycloakClientService.login(userOperationDTO.getEmail(), userOperationDTO.getPassword());
    }

    @PutMapping("/users/{id}")
    @RolesAllowed("admin")
    public User updateUser(@PathVariable("id") Long id, @RequestBody User user) throws ValidationException {
        return userService.update(id, user);
    }

    @RolesAllowed("admin")
    @GetMapping("/users")
    public List<User> getRegistrations(@RequestParam(value = "page", required = false) Optional<Integer> page,
                                       @RequestParam(value = "limit", required = false) Optional<Integer> limit,
                                       @RequestParam(value = "order_by", required = false) Optional<String> orderBy,
                                       @RequestParam(value = "q", required = false) Optional<String> q) {
            return userService.listRegistrations( page, limit, orderBy, q);
    }

    @PutMapping("/users/{id}/{status}")
    public User setUserStatus(@PathVariable("id") Long id,
                              @PathVariable(value = "status") Status status) throws ValidationException {
        return userService.setUserActivity(id, status);
    }

    @GetMapping("/users/{id}")
    @RolesAllowed("admin")
    public Optional<User> getUserById(@PathVariable("id") Long userId) {
        return userService.getUserById(userId);
    }
}
