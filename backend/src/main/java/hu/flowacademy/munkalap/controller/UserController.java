package hu.flowacademy.munkalap.controller;

import hu.flowacademy.munkalap.entity.User;
import hu.flowacademy.munkalap.jsonResponse.JsonResponse;
import hu.flowacademy.munkalap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public User saveUser(@RequestBody User user) {
        userService.saveUser(user);
        return new User();
    }

}

/*@RestController
public class CompanyController {
    @RequestMapping(value = "/api/something", method = RequestMethod.GET)
    public ResponseEntity something() {
        return new ResponseEntity(new EmptyJsonResponse(), HttpStatus.OK);
    }
}*/