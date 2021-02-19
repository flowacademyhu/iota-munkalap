package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.PagingProperties;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.enumCustom.Role;
import hu.flowacademy.worksheet.enumCustom.Status;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

import static hu.flowacademy.worksheet.service.filter.UserSpecification.buildSpecification;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    private static final Pageable PAGEABLE = PageRequest.of(0, 1, Sort.by("createdAt").ascending());

    private static final String TEST_FIRSTNAME = "Lajos";
    private static final String TEST_LASTNAME = "Széchenyi";
    private static final String TEST_EMAIL = "kossuth@lajos.hu";
    private static final String INVALID_TEST_EMAIL = "kossuthlajos.hu";
    private static final String EMPTY_STRING = "";

    private static final String NEW_FIRSTNAME = "István";
    private static final String NEW_LASTNAME = "Széchenyi";
    private static final String NEW_EMAIL = "pista@pista.hu";
    private static final Long REGISTRATION_ID = 111L;

    private static final String NEW_FIRSTNAME2 = "Feri";
    private static final String NEW_LASTNAME2 = "Mao";
    private static final String NEW_EMAIL2 = "moo@moo.hu";
    private static final Long REGISTRATION_ID2 = 11L;

    private static final String UPDATE_FIRSTNAME = "Görgey";
    private static final String UPDATE_LASTNAME = "Artúr";
    private static final String UPDATE_EMAIL = "gorgey@gorgey.hu";

    @Mock
    private UserRepository userRepository;

    @Mock
    private KeycloakClientService keycloakClientService;

    @Mock
    private PagingProperties pagingProperties;

    @InjectMocks
    private UserService userService;

    @Test
    public void givenUserObject_whenSavingUser_thenGreatSuccess() throws ValidationException {
        givenUniquePerson();
        User userData = givenProperUserObject();
        User result = userService.saveUser(userData);
        Mockito.verify(userRepository, times(1)).save(userData);

        assertThat(result, notNullValue());
        assertThat(result.getId(), is(REGISTRATION_ID));
        assertThat(result.getFirstName(), is(NEW_FIRSTNAME));
        assertThat(result.getLastName(), is(NEW_LASTNAME));
        assertThat(result.getEmail(), is(NEW_EMAIL));
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void givenInvalidEmailUser_whenSavingUser_ThenThrowException() {
        User userData = User.builder().email(INVALID_TEST_EMAIL).firstName(TEST_FIRSTNAME).lastName(TEST_LASTNAME).build();
        assertThrows(ValidationException.class, () -> userService.saveUser(userData));
    }

    @Test
    public void givenInvalidEmailUserWithEmptyString_whenSavingUser_ThenThrowException() {
        User userData = User.builder().email(EMPTY_STRING).firstName(TEST_FIRSTNAME).lastName(TEST_LASTNAME).build();
        assertThrows(ValidationException.class, () -> userService.saveUser(userData));
    }

    @Test
    public void givenMissingFirstNameUser_whenSavingUser_ThenThrowException() {
        User userData = User.builder().email(TEST_EMAIL).firstName(EMPTY_STRING).lastName(TEST_LASTNAME).build();
        assertThrows(ValidationException.class, () -> userService.saveUser(userData));
    }

    @Test
    public void givenMissingLastNameUser_whenSavingUser_ThenThrowException() {
        User userData = User.builder().email(TEST_EMAIL).firstName(TEST_FIRSTNAME).lastName(EMPTY_STRING).build();
        assertThrows(ValidationException.class, () -> userService.saveUser(userData));
    }

    @Test
    public void shouldReturnUsersPaged() {
        givenRepoWithAUserForPaging();
        List<User> pagedUserList = userService.filter(Optional.of(true), Optional.of(0), Optional.of("Mao"), Optional.of(1), Optional.of("createdAt"));
        verify(userRepository).findAll(any(Specification.class), eq(PAGEABLE));
        assertThat(pagedUserList.size(), is(1));
    }
    private void givenRepoWithAUserForPaging() {
        List<User> users = new ArrayList<>();
        users.add(givenProperUserObject2());
        int start = (int) PAGEABLE.getOffset();
        int end = Math.min((start + PAGEABLE.getPageSize()), users.size());
        Page<User> pagedUsers = new PageImpl<>(users.subList(start, end), PAGEABLE, users.size());
        when(userRepository.findAll(any(Specification.class), eq(PAGEABLE))).thenReturn(pagedUsers);
    }

    @Test
    public void givenNewUserObject_whenUpdateUser_thenUserUpdated() throws ValidationException {
        givenExistingUserRegistration();
        User newUser = givenUpdateProperUserObject();
        User updatedUser = userService.update(REGISTRATION_ID, newUser);
        Mockito.verify(userRepository, times(1)).save(updatedUser);
        assertThat(updatedUser, notNullValue());
        assertThat(updatedUser.getFirstName(), is(newUser.getFirstName()));
        assertThat(updatedUser.getLastName(), is(newUser.getLastName()));
        assertThat(updatedUser.getEmail(), is(newUser.getEmail()));
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void givenNonExistingUserObject_whenUpdateUser_thenThrowException() {
        givenANonExistingUserRegistration();
        User newUser = givenUpdateProperUserObject();
        Exception thrown = assertThrows(Exception.class, () -> userService.update(REGISTRATION_ID, newUser));
        assertThat(thrown, notNullValue());
        assertThat(thrown.getMessage(), is("The id is null or not real: null"));
    }

    @Test
    public void givenNullId_whenUpdatingUser_ThenThrowException() throws ValidationException {
        User userData = User.builder().email(TEST_EMAIL).firstName(TEST_FIRSTNAME).lastName(TEST_LASTNAME).build();
        assertThrows(Exception.class, () -> userService.update(null, userData));
    }

    @Test
    public void givenInvalidId_whenUpdatingUser_ThenThrowException() throws ValidationException {
        User userData = User.builder().email(TEST_EMAIL).firstName(TEST_FIRSTNAME).lastName(TEST_LASTNAME).build();
        assertThrows(Exception.class, () -> userService.update(-100L, userData));
    }

    @Test
    public void givenInvalidEmailUser_whenUpdatingUser_ThenThrowException() throws ValidationException {
        User userData = User.builder().email(INVALID_TEST_EMAIL).firstName(TEST_FIRSTNAME).lastName(TEST_LASTNAME).build();
        assertThrows(Exception.class, () -> userService.update(REGISTRATION_ID, userData));
    }

    @Test
    public void givenInvalidEmailUserWithEmptyString_whenUpdatingUser_ThenThrowException() {
        User userData = User.builder().email(EMPTY_STRING).firstName(TEST_FIRSTNAME).lastName(TEST_LASTNAME).build();
        assertThrows(ValidationException.class, () -> userService.update(REGISTRATION_ID, userData));
    }

    @Test
    public void givenMissingFirstNameUser_whenUpdatingUser_ThenThrowException() {
        User userData = User.builder().email(TEST_EMAIL).firstName(EMPTY_STRING).lastName(TEST_LASTNAME).build();
        assertThrows(ValidationException.class, () -> userService.update(REGISTRATION_ID, userData));
    }

    @Test
    public void givenMissingLastNameUser_whenUpdatingUser_ThenThrowException() {
        User userData = User.builder().email(TEST_EMAIL).firstName(TEST_FIRSTNAME).lastName(EMPTY_STRING).build();
        assertThrows(ValidationException.class, () -> userService.update(REGISTRATION_ID, userData));
    }

    @Test
    public void givenAnExistingUser_whenSettingActivity_thenActivityIsUpdated() throws ValidationException {
        givenExistingUser();
        User result = userService.setUserActivity(REGISTRATION_ID, Status.inactive);
        Mockito.verify(userRepository, times(1)).save(result);
        assertThat(result, notNullValue());
        assertThat(result.isEnabled(), notNullValue());
        assertThat(result.isEnabled(), is(false));
    }

    private void givenUniquePerson() {
        when(userRepository.save(any(User.class))).thenAnswer(invocationOnMock -> {
            User input = invocationOnMock.getArgument(0);
            input.setId(REGISTRATION_ID);
            return input;
        });
    }

    private User givenProperUserObject() {
        User user = new User();
        user.setEmail(NEW_EMAIL);
        user.setFirstName(NEW_FIRSTNAME);
        user.setLastName(NEW_LASTNAME);
        return user;
    }

    private void givenExistingUser() {
        User user = givenProperUserObject();
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setRole(Role.USER);
        user.setId(REGISTRATION_ID);
        when(userRepository.findById(REGISTRATION_ID)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    private User givenProperUserObject2() {
        User user2 = new User();
        user2.setEmail(NEW_EMAIL2);
        user2.setFirstName(NEW_FIRSTNAME2);
        user2.setLastName(NEW_LASTNAME2);
        user2.setCreatedAt(LocalDateTime.now());
        return user2;
    }

    private void givenExistingUserRegistration() {
        User existingUser = new User();
        existingUser.setFirstName(givenProperUserObject().getFirstName());
        existingUser.setLastName(givenProperUserObject().getLastName());
        existingUser.setEmail(givenProperUserObject().getEmail());
        existingUser.setId(REGISTRATION_ID);
        when(userRepository.findById(REGISTRATION_ID)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
    }

    private void givenANonExistingUserRegistration() {
        when(userRepository.findById(REGISTRATION_ID)).thenReturn(Optional.empty());
    }

    private User givenUpdateProperUserObject() {
        User user = new User();
        user.setEmail(UPDATE_EMAIL);
        user.setFirstName(UPDATE_FIRSTNAME);
        user.setLastName(UPDATE_LASTNAME);
        return user;
    }
}
