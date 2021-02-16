package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.enumCustom.Role;
import hu.flowacademy.worksheet.enumCustom.Status;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import java.util.Optional;
import java.util.stream.Collectors;

import static hu.flowacademy.worksheet.service.filter.UserSpecification.enabled;
import static hu.flowacademy.worksheet.service.filter.UserSpecification.firstnameLastnameEmailContains;
import static org.apache.commons.lang3.StringUtils.stripAccents;


@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final KeycloakClientService keycloakClientService;

    public User saveUser(@NonNull User user) throws ValidationException {
        validateUser(user);
        user.setRole(Role.USER);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        keycloakClientService.createAccount(user);
        return userRepository.save(user);
    }

    public User update(Long id, User user) throws ValidationException {
        validateUpdate(user);
        User updatedUser = userRepository.findById(id).orElseThrow(() -> new ValidationException("The id is null or not real: " + user.getId()));
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        return userRepository.save(updatedUser);
    }

    private void validateUser(User user) throws ValidationException {
        if (!StringUtils.hasText(user.getFirstName())) {
            throw new ValidationException("Username null or empty String");
        }
        if (!StringUtils.hasText(user.getLastName())) {
            throw new ValidationException("Username null or empty String");
        }
        if (!StringUtils.hasText(user.getEmail())) {
            throw new ValidationException("Missing Email");
        }
        if (!EmailValidator.getInstance().isValid(user.getEmail())) {
            throw new ValidationException("Invalid Email");
        }
    }

    private void validateUpdate(User user) throws ValidationException {
        if (user.getId() != null) {
            throw new ValidationException("Not existing user id, or null");
        }
        if (!StringUtils.hasText(user.getFirstName())) {
            throw new ValidationException("User firstName is empty or null");
        }
        if (!StringUtils.hasText(user.getLastName())) {
            throw new ValidationException("User lastName is empty or null");
        }
        if (!StringUtils.hasText(user.getEmail())) {
            throw new ValidationException("Not user id, or null");
        }
    }



    public List<User> filter(Optional<Boolean> status, Optional<Integer> page, Optional<String> q) {
        List<User> result = userRepository.findAll(
                Specification
                        .where(enabled(status))
                        .and(firstnameLastnameEmailContains(
                                q.map(searchPart -> "%" + searchPart.replaceAll("[aáeéiíoóöőuúüű]", "_") + "%")
                                )
                        ),
                PageRequest.of(page.orElse(0), 10)
        ).getContent();
        return q.map(searchPart ->
                result.stream().filter(user -> filterContains(searchPart, user)).collect(Collectors.toList()))
                .orElse(result);
    }
    private boolean filterContains(String searchPart, User user) {
        return stripAccents(user.getFirstName()).contains(stripAccents(searchPart)) ||
                stripAccents(user.getLastName()).contains(stripAccents(searchPart)) ||
                user.getEmail().contains(stripAccents(searchPart));
    }





//    public List<User> findUserByNameAndEmail(String searchPart) {
//        String pattern = "%" + searchPart.replaceAll("[aáeéiíoóöőuúüű]", "_") + "%";
//        return userRepository.findByEmailLikeIgnoreCaseOrFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase(pattern, pattern, pattern)
//                .stream().filter(user -> filterContains(searchPart, user)).collect(Collectors.toList());
//    }
//
//    private boolean filterContains(String searchPart, User user) {
//        return stripAccents(user.getFirstName()).contains(stripAccents(searchPart)) ||
//                stripAccents(user.getLastName()).contains(stripAccents(searchPart)) ||
//                user.getEmail().contains(stripAccents(searchPart));
//    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);

    }

    public User setUserActivity(Long id, Status status) throws ValidationException {
        User toChange = userRepository.findById(id).orElseThrow(()-> new ValidationException("No user with provided ID"));
        toChange.setEnabled(status == Status.active);
        keycloakClientService.setUserStatus(toChange);
        return userRepository.save(toChange);
    }
}
