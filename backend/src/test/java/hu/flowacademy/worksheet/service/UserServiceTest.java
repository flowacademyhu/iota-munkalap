package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private static final String NEW_FIRSTNAME = "István";
    private static final String NEW_LASTNAME = "Széchenyi";
    private static final String NEW_EMAIL = "pista@pista.hu";
    private static final Long REGISTRATION_ID = 111L;

    @Mock
    private UserRepository userRepository;
    @Mock
    private KeycloakClientService keycloakClientService;

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
    public void givenInvalidEmailUser_whenSavingUser_ThenThrowException() throws ValidationException {
        User userData = User.builder().email("elhasalamailem.hu").firstName("József").lastName("Ferenc").build();
        assertThrows(ValidationException.class, () -> userService.saveUser(userData));
    }

    @Test
    public void givenInvalidEmailUserWithEmptyString_whenSavingUser_ThenThrowException() {
        User userData = User.builder().email("").firstName("József").lastName("Ferenc").build();
        assertThrows(ValidationException.class, () -> userService.saveUser(userData));
    }

    @Test
    public void givenMissingFirstNameUser_whenSavingUser_ThenThrowException() {
        User userData = User.builder().email("joazemail@orulok.hu").firstName("").lastName("Dugonics").build();
        assertThrows(ValidationException.class, () -> userService.saveUser(userData));
    }

    @Test
    public void givenMissingLastNameUser_whenSavingUser_ThenThrowException() {
        User userData = User.builder().email("joazemail@orulok.hu").firstName("Tivadar").lastName("").build();
        assertThrows(ValidationException.class, () -> userService.saveUser(userData));
    }

    @Test
    public void givenActiveStatus_whenFilteringForActiveUsers_ThenReturnWithListOfActiveUsers() throws ValidationException {
        givenRepoWithUser();
        List<User> result = userService.getActiveUsers(true);

        org.hamcrest.MatcherAssert.assertThat( result.get(0).isEnabled(), is(true));
    }

    @Test
    public void givenInactiveStatus_whenFilteringForInactiveUsers_ThenReturnWithListOfInactiveUsers() throws ValidationException {
        givenRepoWithUser();
        List<User> result = userService.getActiveUsers(true);

        org.hamcrest.MatcherAssert.assertThat( result.get(0).isEnabled(), is(false));
    }

    @Test
    public void givenParameterThatCanBeFound_whenSearchingDbForUser_ThenReturnWithListContainingUsers() throws ValidationException {
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
        when(userRepository.findByEmailLikeOrFirstNameLikeOrLastNameLike("pista",
                "pista", "pista")).thenReturn(List.of(result));
    }

    private User givenProperUserObject() {
        User user = new User();
        user.setEmail(NEW_EMAIL);
        user.setFirstName(NEW_FIRSTNAME);
        user.setLastName(NEW_LASTNAME);
        return user;
    }
}
