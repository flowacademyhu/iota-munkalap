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
import java.util.stream.Collectors;

import static org.apache.commons.lang3.StringUtils.stripAccents;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final int DEFAULT_PAGE = 0;
    private final String DEFAULT_ORDERBY = "createdAt";

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

    private boolean filterContains(String searchPart, User user) {
        return stripAccents(user.getFirstName()).contains(stripAccents(searchPart)) ||
                stripAccents(user.getLastName()).contains(stripAccents(searchPart)) ||
                user.getEmail().contains(stripAccents(searchPart));
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);

    }

    public List<User> listRegistrations(Optional<Integer> page, Optional<Integer> limit, Optional<String> orderBy, Optional<String> searchPart) {
        return searchPart.map(s -> {
            String pattern = "%" + s.replaceAll("[aáeéiíoóöőuúüű]", "_") + "%";
            PageRequest pageRequest = PageRequest.of(page.orElse(DEFAULT_PAGE),
                    limit.orElse(pagingProperties.getDefaultLimit()),
                    Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).descending());
            Page<User> userList = userRepository
                    .findByEmailLikeIgnoreCaseOrFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase(pattern, pattern, pattern, pageRequest);
            return userList.getContent().stream().filter(user -> filterContains(s, user)).collect(Collectors.toList());
        }).orElseGet(() -> userRepository
                .findAll(PageRequest.of(page.orElse(0),
                        limit.orElse(pagingProperties.getDefaultLimit()),
                        Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).descending())).getContent());
    }
}
