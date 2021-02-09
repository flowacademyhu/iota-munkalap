package hu.flowacademy.munkalap.service;

import hu.flowacademy.munkalap.entity.User;
import hu.flowacademy.munkalap.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private static final String NEW_NAME = "Széchenyi István";
    private static final String NEW_PASSWORD = "1234";
    private static final String NEW_EMAIL = "pista@pista.hu";
    private static final Long REGISTRATION_ID = 111L;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void givenUserObject_whenSavingUser_thenGreatSuccess() {
        givenUniquePerson();
        User userData = givenProperUserObject();
        User result = userService.saveUser(userData);

        assertThat(result, notNullValue());
        assertThat(result.getId(), is(REGISTRATION_ID));
        assertThat(result.getName(), is(NEW_NAME));
        assertThat(result.getPassword(), is(NEW_PASSWORD));
        assertThat(result.getEmail(), is(NEW_EMAIL));
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
        user.setName(NEW_NAME);
        user.setPassword(NEW_PASSWORD);
        return user;
    }
}
