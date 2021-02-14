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

import java.util.Optional;

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

    private static final String UPDATE_FIRSTNAME = "Görgey";
    private static final String UPDATE_LASTNAME = "Artúr";
    private static final String UPDATE_EMAIL = "gorgey@gorgey.hu";

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
    public void givenNewUserObject_whenUpdateUser_thenUserUpdated() throws ValidationException {
        givenExistingUserRegistration();
        User newUser = givenUpdateProperUserObject();

        User updatedUser = userService.update(REGISTRATION_ID, newUser);

        assertThat(updatedUser, notNullValue());
        assertThat(updatedUser.getFirstName(), is(newUser.getFirstName()));
        assertThat(updatedUser.getLastName(), is(newUser.getLastName()));
        assertThat(updatedUser.getEmail(), is(newUser.getEmail()));
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

    private User givenUpdateProperUserObject() {
        User user = new User();
        user.setEmail(UPDATE_EMAIL);
        user.setFirstName(UPDATE_FIRSTNAME);
        user.setLastName(UPDATE_LASTNAME);
        return user;
    }

}

/*    // Itt nyúltam bele:


    // Itt nyúltam bele:

    @Test
    public void givenANonExistingRegistration_whenCallingUpdatePerson_thenExceptionThrown() {
        givenANonExistingPersonRegistration();
        Person newPerson = givenANewPerson();


        MissingRegistrationException thrown = assertThrows(MissingRegistrationException.class, () -> service.updateRegistration(REGISTRATION_ID, newPerson));

        assertThat(thrown, notNullValue());
        assertThat(thrown.getHttpStatus(), is(HttpStatus.NOT_FOUND));
    }*/

/*    // Itt írtam bele:
    private void givenANonExistingPersonRegistration() {
        when(registrationRepository.findById(REGISTRATION_ID)).thenReturn(Optional.empty());
    }
*/