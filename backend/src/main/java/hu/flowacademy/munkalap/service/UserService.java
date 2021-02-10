package hu.flowacademy.munkalap.service;

import hu.flowacademy.munkalap.entity.User;
import hu.flowacademy.munkalap.enumCustom.Role;
import hu.flowacademy.munkalap.exception.WorksheetUserException;
import hu.flowacademy.munkalap.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final KeycloakClientService keycloakClientService;

    public User saveUser(@NonNull User user) throws WorksheetUserException {
        validateUser(user);
        user.setRole(Role.USER);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        keycloakClientService.createAccount(user.getName(), user.getEmail());
        return userRepository.save(user);
    }

    private void validateUser(User user) throws WorksheetUserException {
        if (!StringUtils.hasText(user.getName())) {
            throw new WorksheetUserException("Username null or empty String", HttpStatus.BAD_REQUEST);
        }
        if (!StringUtils.hasText(user.getPassword())) {
            throw new WorksheetUserException("Password null or empty String", HttpStatus.BAD_REQUEST);
        }
        if (!StringUtils.hasText(user.getEmail())) {
            throw new WorksheetUserException("Missing Email", HttpStatus.BAD_REQUEST);
        }
        if (!EmailValidator.getInstance().isValid(user.getEmail())) {
            throw new WorksheetUserException("Invalid Email", HttpStatus.BAD_REQUEST);
        }
    }
}
