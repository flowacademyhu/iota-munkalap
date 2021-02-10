package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.UserOperationDTO;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.exception.WorksheetUserException;
import hu.flowacademy.worksheet.service.UserService;
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
