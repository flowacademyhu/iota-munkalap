package hu.flowacademy.munkalap.controller;

import hu.flowacademy.munkalap.dto.UserOperationDTO;
import hu.flowacademy.munkalap.entity.User;
import hu.flowacademy.munkalap.exception.WorksheetUserException;
import hu.flowacademy.munkalap.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.RolesAllowed;

@RequiredArgsConstructor
@RestController
@RequestMapping("api")
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    @RolesAllowed("admin")
    public User createUser(@RequestBody UserOperationDTO userOperationDTO) {
        User user = User.builder()
                .name(userOperationDTO.getName())
                .email(userOperationDTO.getEmail())
                .build();
        try {
            return userService.saveUser(user);
        } catch (WorksheetUserException wue) {
            throw new ResponseStatusException(wue.getHttpStatus(), wue.getMessage());
        }
    }


}
