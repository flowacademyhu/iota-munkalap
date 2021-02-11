package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.enumCustom.Role;
import hu.flowacademy.worksheet.exception.WorksheetUserException;
import hu.flowacademy.worksheet.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final KeycloakClientService keycloakClientService;

    public User saveUser(@NonNull User user) throws WorksheetUserException {
        validateUser(user);
        user.setRole(Role.USER);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        keycloakClientService.createAccount(user);
        return userRepository.save(user);
    }

    private void validateUser(User user) throws WorksheetUserException {
        if (!StringUtils.hasText(user.getFirst_name())) {
            throw new WorksheetUserException("Username null or empty String");
        }
        if (!StringUtils.hasText(user.getLast_name())) {
            throw new WorksheetUserException("Username null or empty String");
        }
        if (!StringUtils.hasText(user.getEmail())) {
            throw new WorksheetUserException("Missing Email");
        }
        if (!EmailValidator.getInstance().isValid(user.getEmail())) {
            throw new WorksheetUserException("Invalid Email");
        }
    }
}
