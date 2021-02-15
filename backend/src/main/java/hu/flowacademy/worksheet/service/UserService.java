package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.PagingProperties;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.enumCustom.Role;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final KeycloakClientService keycloakClientService;
    private final PagingProperties pagingProperties;

    public User saveUser(@NonNull User user) throws ValidationException {
        validateUser(user);
        user.setRole(Role.USER);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        keycloakClientService.createAccount(user);
        return userRepository.save(user);
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

    public List<User> findUserByNameAndEmail(Optional<String> searchPart) {
        return userRepository.findByEmailContainingOrFirstNameContainingOrLastNameContaining(searchPart.get(), searchPart.get(), searchPart.get());
    }

    public List<User> listRegistrations(Optional<Integer> page, Optional<Integer> limit, Optional<String> orderBy) {
           Page<User> userPage = userRepository
                    .findAll(PageRequest.of(page.orElse(0)
                            , limit.orElse(pagingProperties.getDefaultLimit())
                            , Sort.by(orderBy.orElse("createdAt")).descending()));
           return userPage.getContent();

    }
}
