package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.PagingProperties;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private static final String TEST_FIRSTNAME = "Lajos";
    private static final String TEST_LASTNAME = "Széchenyi";
    private static final String TEST_EMAIL = "kossuth@lajos.hu";
    private static final String INVALID_TEST_EMAIL = "kossuthlajos.hu";
    private static final String EMPTY_STRING = "";

    private static final String NEW_FIRSTNAME = "István";
    private static final String NEW_LASTNAME = "Széchenyi";
    private static final String NEW_EMAIL = "pista@pista.hu";
    private static final Long REGISTRATION_ID = 111L;

    private static final String NEW_FIRSTNAME2 = "Istv";
    private static final String NEW_LASTNAME2 = "Széche";
    private static final String NEW_EMAIL2 = "pia@pipsa.hu";
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

    /*@Test
    public void shouldReturnUsersSorted() {
        Sort sortByCreatedAt = Sort.by("createdAt").descending();
        List<User> users = List.of(
                givenProperUserObject(),
                givenProperUserObject2()
        );
        when(userRepository.findAll(eq(sortByCreatedAt))).thenReturn(users);
        List<User> sortedUsers = userService.listRegistrations(Optional.of(0),Optional.of(1),Optional.of("createdAt"));
        assertEquals(users, sortedUsers);
        verify(userRepository).findAll(eq(sortByCreatedAt));
    }*/

    @Test
    public void shouldReturnUsersPaged() {
        givenRepoWithTwoUsersForPaging();
        Pageable pageable = PageRequest.of(0, 1, Sort.by("createdAt"));
        List<User> pagedUserList = userService.listRegistrations(Optional.of(0),Optional.of(1),Optional.of("createdAt"));
        verify(userRepository).findAll(eq(pageable));
        assertThat(pagedUserList.size(), is(1));
    }

    @Test
    public void givenInvalidEmailUser_whenSavingUser_ThenThrowException() {
        User userData = User.builder().email("elhasalamailem.hu").firstName("József").lastName("Ferenc").build();
    public void givenInvalidEmailUser_whenSavingUser_ThenThrowException() throws ValidationException {
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

    private void givenRepoWithTwoUsersForPaging() {
        List<User> users = new ArrayList<>();
        users.add(givenProperUserObject());
        users.add(givenProperUserObject2());
        Pageable pageable = PageRequest.of(0, 1);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), users.size());
        Page<User> pagedUsers = new PageImpl<>(users.subList(start, end), pageable, users.size());
        when(userRepository.findAll(eq(pageable))).thenReturn(pagedUsers);
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

    public void givenParameterThatCanBeFound_whenSearchingDbForUser_ThenReturnWithListContainingUsers() throws
            ValidationException {
        givenRepoWithUser();
        List<User> result = userService.findUserByNameAndEmail("pista");

        org.hamcrest.MatcherAssert.assertThat(result.size(), is(1));
    }

    private void givenUniquePerson() {
        when(userRepository.save(any(User.class))).thenAnswer(invocationOnMock -> {
            User input = invocationOnMock.getArgument(0);
            input.setId(REGISTRATION_ID);
            return input;
        });
    }

    private void givenRepoWithUser() throws ValidationException {
        givenUniquePerson();
        User userData = givenProperUserObject();
        User result = userService.saveUser(userData);
        when(userRepository.findByEmailLikeIgnoreCaseOrFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase("%p_st_%",
                "%p_st_%", "%p_st_%")).thenReturn(List.of(result));
    }

    private User givenProperUserObject() {
        User user = new User();
        user.setEmail(NEW_EMAIL);
        user.setFirstName(NEW_FIRSTNAME);
        user.setLastName(NEW_LASTNAME);
        return user;
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
