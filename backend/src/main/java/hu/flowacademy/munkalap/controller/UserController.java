package hu.flowacademy.munkalap.controller;

import hu.flowacademy.munkalap.dto.UserCreateDTO;
import hu.flowacademy.munkalap.entity.User;
import hu.flowacademy.munkalap.exception.WorksheetUserException;
import hu.flowacademy.munkalap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    @RolesAllowed("admin")
    public User createUser(@RequestBody UserCreateDTO userCreateDTO) {
        User user = User.builder()
                .name(userCreateDTO.getName())
                .password(userCreateDTO.getPassword())
                .email(userCreateDTO.getEmail())
                .build();
        try {
            return userService.saveUser(user);
        } catch (WorksheetUserException wue) {
            throw new ResponseStatusException(wue.getHttpStatus(), wue.getMessage());
        }
    }


}
