package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.configuration.PagingProperties;
import hu.flowacademy.worksheet.dto.UserOperationDTO;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.service.KeycloakClientService;
import hu.flowacademy.worksheet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.data.domain.PageRequest;
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

    private final PagingProperties pagingProperties;

    @RolesAllowed("admin")
    @GetMapping("/alluser")
    public List<User> getRegistrations(@RequestParam(value = "page", required = false) Optional<Integer> page,
                                       @RequestParam(value = "limit", required = false) Optional<Integer> limit,
                                       @RequestParam(value = "order_by", required = false) Optional<String> order_by) {
        List<User> registrationList;
        if (page.isPresent()) {
            registrationList = userService.listRegistrations(
                    PageRequest.of(page.get(), limit.orElse(pagingProperties.getDefaultLimit())));
        } else if (order_by.isPresent()){
            registrationList = userService.listRegistrations(order_by.get());
        } else {
            registrationList = userService.listRegistrations();
        }
        return registrationList;
    }
}
