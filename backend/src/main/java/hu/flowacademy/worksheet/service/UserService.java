package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.PagingProperties;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.enumCustom.Role;
import hu.flowacademy.worksheet.enumCustom.Status;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static hu.flowacademy.worksheet.service.filter.UserSpecification.*;
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
        keycloakClientService.setUserUpdate(user, updatedUser.getEmail());
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

    public List<User> filter(Optional<Boolean> status, Optional<Integer> page, Optional<String> searchCriteria, Optional<Integer> limit, Optional<String> orderBy) {
        List<User> result = collectUsersByCriteria(status, page, searchCriteria, limit, orderBy);
        return searchCriteria.map(searchPart ->
                result.stream().filter(user -> filterContains(searchPart.toLowerCase(), user))
                        .collect(Collectors.toList()))
                .orElse(result);
    }

    private List<User> collectUsersByCriteria(Optional<Boolean> status, Optional<Integer> page, Optional<String> searchCriteria, Optional<Integer> limit, Optional<String> orderBy) {
        return page.isEmpty() ?
                userRepository.findAll(
                        buildSpecification(status, searchCriteria),
                        Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).descending())
                : userRepository.findAll(
                buildSpecification(status, searchCriteria),
                PageRequest.of(page.orElse(DEFAULT_PAGE), limit.orElse(pagingProperties.getDefaultLimit()), Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).descending())
        ).getContent();
    }

    private boolean filterContains(String searchPart, User user) {
        return stripAccents(user.getFirstName().toLowerCase()).contains(stripAccents(searchPart)) ||
                stripAccents(user.getLastName().toLowerCase()).contains(stripAccents(searchPart)) ||
                user.getEmail().toLowerCase().contains(stripAccents(searchPart));
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);

    }

    public User setUserActivity(Long id, Status status) throws ValidationException {
        User toChange = userRepository.findById(id).orElseThrow(() -> new ValidationException("No user with provided ID"));
        toChange.setEnabled(status == Status.active);
        keycloakClientService.setUserStatus(toChange);
        return userRepository.save(toChange);
    }
}
