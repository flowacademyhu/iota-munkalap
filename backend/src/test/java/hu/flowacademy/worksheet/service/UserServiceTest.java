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
import org.springframework.data.domain.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    private static final String NEW_FIRSTNAME = "István";
    private static final String NEW_LASTNAME = "Széchenyi";
    private static final String NEW_EMAIL = "pista@pista.hu";
    private static final Long REGISTRATION_ID = 111L;

    private static final String NEW_FIRSTNAME2 = "Istv";
    private static final String NEW_LASTNAME2 = "Széche";
    private static final String NEW_EMAIL2 = "pia@pipsa.hu";
    private static final Long REGISTRATION_ID2 = 11L;

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
    public void shouldReturnUsersSorted() {
        // given
        Sort sortByCreatedAt = Sort.by("createdAt").descending();
        List<User> users = List.of(
                givenProperUserObject(),
                givenProperUserObject2()
        );
        when(userRepository.findAll(eq(sortByCreatedAt))).thenReturn(users);
        // when
        List<User> sortedUsers = userService.listRegistrations("createdAt");
        // then
        assertEquals(users, sortedUsers);
        verify(userRepository).findAll(eq(sortByCreatedAt));
    }

    @Test
    public void shouldReturnUsersPaged() throws ValidationException {
        // given: felsetupoljuk a testet: adjunk vissza Page-elt usereeket
        givenRepoWithTwoUsersForPaging();
        Pageable pageable = PageRequest.of(0, 1);
        // when
        List<User> pagedUserList = userService.listRegistrations(pageable);
        // then
        verify(userRepository).findAll(eq(pageable));
        // assert: tartalmak (userek listája) egyeznek
        assertThat(pagedUserList.size(), is(1));

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

    private void givenRepoWithTwoUsersForPaging() {
        List<User> users = new ArrayList<>();
        users.add(givenProperUserObject());
        users.add(givenProperUserObject2());
        Pageable pageable = PageRequest.of(0, 1);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), users.size());
        Page<User> pagedUsers = new PageImpl<User>(users.subList(start, end), pageable, users.size());
        when(userRepository.findAll(eq(pageable))).thenReturn(pagedUsers);
    }

    private List<User> givenRepoSkeleton() {
        givenUniquePerson2();
        User userData2 = givenProperUserObject2();
        User userData = givenProperUserObject();
        User result2 = userRepository.save(userData2);
        User result = userRepository.save(userData);
        return List.of(result, result2);
    }

    private void givenUniquePerson() {
        when(userRepository.save(any(User.class))).thenAnswer(invocationOnMock -> {
            User input = invocationOnMock.getArgument(0);
            input.setId(REGISTRATION_ID);
            return input;
        });
    }

    private void givenUniquePerson2() {
        when(userRepository.save(any(User.class))).thenAnswer(invocationOnMock -> {
            User input = invocationOnMock.getArgument(0);
            input.setId(REGISTRATION_ID2);
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
    private User givenProperUserObject2() {
        User user2 = new User();
        user2.setEmail(NEW_EMAIL2);
        user2.setFirstName(NEW_FIRSTNAME2);
        user2.setLastName(NEW_LASTNAME2);
        user2.setCreatedAt(LocalDateTime.now());
        return user2;
    }
}
