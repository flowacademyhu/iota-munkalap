package hu.flowacademy.worksheet.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

public class controller {

    private final UserService userService;
    private final PagingProperties pagingProperties;

    @RolesAllowed("admin")
    @GetMapping("/alluser")
    public List<User> getRegistrations(@RequestParam(value = "page", required = false) Optional<Integer> page,
                                                          @RequestParam(value = "limit", required = false) Optional<Integer> limit) {
        List<User> registrationList;
        if (page.isPresent()) {
            registrationList = userService.listRegistrations(
                    PageRequest.of(page.get(), limit.orElse(pagingProperties.getDefaultLimit())));
        } else {
            registrationList = userService.listRegistrations();
        }
        return registrationList;
    }
}
