package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.enumCustom.Role;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import javax.ws.rs.core.NoContentException;
import java.time.LocalDateTime;

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

    public User update(User user) {
        validateUpdate(user);

        userRepository.update(user.getUser(), user.getId());
        return userRepository.findById(user.getId())
                .orElseThrow(() -> new NoContentException("User id:" + user.getId()));
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
        if (user.getId() == null) {
            throw new ValidationException("Not user id, orr null");
        }
        if (!StringUtils.hasText(user.getUser())) {
            throw new ValidationException("User is empty string or null");
        }
        if (!StringUtils.hasText(user.getPassword()) {

        }

    }


}
