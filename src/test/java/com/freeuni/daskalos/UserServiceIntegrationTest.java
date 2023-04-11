package com.freeuni.daskalos;

import static org.assertj.core.api.Assertions.assertThat;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.UserRepository;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.service.UserService;
import com.freeuni.daskalos.utils.AuthorizationStatus;
import com.freeuni.daskalos.utils.UserType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceIntegrationTest {

    @TestConfiguration
    static class UserServiceIntegrationTestsContextConfiguration {

        @Bean
        public UserService user() {
            return new UserService();
        }
    }

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Before
    public void setUp() {
        Student student = new Student("email1", "AtLeast^8", "Giorgi", "Adikashviili", UserType.STUDENT);
        student.setID(10L);
        Teacher teacher = new Teacher("email2", "AtLeast^8", "Luka", "Kalandadze", UserType.TEACHER);

        List<User> allUsers = Arrays.asList(student, teacher);

        Mockito.when(userRepository.findByEmail(student.getEmail())).thenReturn(Optional.of(student));
        Mockito.when(userRepository.findByEmail(teacher.getEmail())).thenReturn(Optional.of(teacher));
        Mockito.when(userRepository.findAll()).thenReturn(allUsers);
    }

    // Test -----------------------checkUserWithMailAndPassword------------------------------------

    @Test
    public void whenAlreadyExists() {
        String expected = AuthorizationStatus.ALREADY_EXISTS.name();
        String result = userService.checkUserWithEMailAndPassword("email1", "AtLeast^8");

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenIllegalPassword() {
        String expected = AuthorizationStatus.ILLEGAL_PASSWORD.name();
        String result = userService.checkUserWithEMailAndPassword("email3", "password");

        verifyFindByEMAILIsCalledOnce("email3");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenCheckOK() {
        String expected = AuthorizationStatus.OK.name();
        String result = userService.checkUserWithEMailAndPassword("email3", "Giorgi^500");

        verifyFindByEMAILIsCalledOnce("email3");
        assertThat(result).isEqualTo(expected);
    }

    // Test -----------------------------------------addUser---------------------------------------

    @Test
    public void whenUserAlreadyExists() {
        String expected = AuthorizationStatus.ALREADY_EXISTS.name();
        String result = userService.addUser(new UserDTO("email1", "AtLeast^8", "Giorgi", "Adikashviili", UserType.STUDENT.name()));

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenSuccessfulRegistration() {
        String expected = AuthorizationStatus.SUCCESSFUL_REGISTRATION.name();

        String result1 = userService.addUser(new UserDTO("email4", "AtLeast^8", "Shota", "Ghvinepadze", UserType.TEACHER.name()));
        verifyFindByEMAILIsCalledOnce("email4");

        String result2 = userService.addUser(new UserDTO("email3", "AtLeast^8", "Nika", "Nargizashvili", UserType.STUDENT.name()));
        verifyFindByEMAILIsCalledOnce("email3");

        assertThat(result1).isEqualTo(expected);
        assertThat(result2).isEqualTo(expected);
    }

    // Test ----------------------------------------authorizeUser----------------------------------

    @Test
    public void whenEmailNotFound() {
        String expected = AuthorizationStatus.EMAIL_NOT_FOUND.name();
        String result = userService.authorizeUser(new UserDTO().setEmail("email3").setPassword("AtLeast^8"));

        verifyFindByEMAILIsCalledOnce("email3");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenWrongPassword() {
        String expected = AuthorizationStatus.WRONG_PASSWORD.name();
        String result = userService.authorizeUser(new UserDTO().setEmail("email1").setPassword("AtLeast^5"));

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenSuccessfulLogin() {
        String expected = AuthorizationStatus.SUCCESSFUL_LOGIN.name();
        String result = userService.authorizeUser(new UserDTO().setEmail("email1").setPassword("AtLeast^8"));

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    // Test ----------------------------------------getAllUsers------------------------------------

    @Test
    public void whenFoundAll() {
        List<String> expected = List.of("email1", "email2");
        List<String> result = userService.getAllUsers().stream().map(UserDTO::getEmail).collect(Collectors.toList());

        assertThat(result).isEqualTo(expected);
    }

    // --------------------------------helpers-----------------------------------------------------

    private void verifyFindByEMAILIsCalledOnce(String email) {
        Mockito.verify(userRepository, VerificationModeFactory.times(1)).findByEmail(email);
        Mockito.reset(userRepository);
    }
}
