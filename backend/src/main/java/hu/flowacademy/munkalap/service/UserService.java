package hu.flowacademy.munkalap.service;

import hu.flowacademy.munkalap.entity.User;
import hu.flowacademy.munkalap.enumCustom.Kind;
import hu.flowacademy.munkalap.exception.WorksheetUserException;
import hu.flowacademy.munkalap.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final KeycloakClientService keycloakClientService;

    public User saveUser(User user) throws WorksheetUserException {
        Objects.requireNonNull(user);

        validateUser(user);

        user.setKind(Kind.USER);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        keycloakClientService.createAccount(user.getName(), user.getEmail());
        return userRepository.save(user);
    }

    private void validateUser(User user) throws WorksheetUserException {
        if (!(StringUtils.hasText(user.getName()))) {
            throw new WorksheetUserException("Bad Username", HttpStatus.BAD_REQUEST);
        }
        if (!(StringUtils.hasText(user.getPassword()))) {
            throw new WorksheetUserException("Bad Password", HttpStatus.BAD_REQUEST);
        }
        if (!(StringUtils.hasText(user.getEmail()))) {
            throw new WorksheetUserException("Bad Email", HttpStatus.BAD_REQUEST);
        }
        if (!(EmailValidator.getInstance().isValid(user.getEmail()))) {
            throw new WorksheetUserException("Bad Email", HttpStatus.BAD_REQUEST);
        }

    }
}







