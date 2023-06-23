package com.freeuni.daskalos;

import com.freeuni.daskalos.dto.UserAddressDTO;
import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.UserRepository;
import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.service.AuthorizationService;
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

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthorizationServiceIntegrationTest {

    @TestConfiguration
    static class UserServiceIntegrationTestsContextConfiguration {

        @Bean
        public AuthorizationService user() {
            return new AuthorizationService();
        }
    }

    @Autowired
    private AuthorizationService authorizationService;

    @MockBean
    private UserRepository userRepository;

    @Before
    public void setUp() {
        Student student = new Student("email1", "AtLeast^8", "Giorgi", "Adikashviili",
                new UserAddress("address", 41.700858, 44.871817), UserType.STUDENT, false, null, null, null, null, null, null);
        student.setID(10L);
        Teacher teacher = new Teacher("email2", "AtLeast^8", "Luka", "Kalandadze",
                new UserAddress("address", 41.701219, 44.868266), UserType.TEACHER, false, null, null, null, null, null, null);

        List<User> allUsers = Arrays.asList(student, teacher);

        Mockito.when(userRepository.findByEmail(student.getEmail())).thenReturn(Optional.of(student));
        Mockito.when(userRepository.findByEmail(teacher.getEmail())).thenReturn(Optional.of(teacher));
        Mockito.when(userRepository.findAll()).thenReturn(allUsers);
    }

    // Test -----------------------checkUserWithEmail----------------------------------------------

    @Test
    public void whenExists() {
        String expected = AuthorizationStatus.OK.name();
        String result = authorizationService.checkUserWithEmail("email1");

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenNotFound() {
        String expected = AuthorizationStatus.EMAIL_NOT_FOUND.name();
        String result = authorizationService.checkUserWithEmail("email3");

        verifyFindByEMAILIsCalledOnce("email3");
        assertThat(result).isEqualTo(expected);
    }

    // Test -----------------------checkUserWithMailAndPassword------------------------------------

    @Test
    public void whenAlreadyExists() {
        String expected = AuthorizationStatus.ALREADY_EXISTS.name();
        String result = authorizationService.checkUserWithEmailAndPassword("email1", "AtLeast^8");

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenIllegalPassword() {
        String expected = AuthorizationStatus.ILLEGAL_PASSWORD.name();
        String result = authorizationService.checkUserWithEmailAndPassword("email3", "password");

        verifyFindByEMAILIsCalledOnce("email3");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenCheckOK() {
        String expected = AuthorizationStatus.OK.name();
        String result = authorizationService.checkUserWithEmailAndPassword("email3", "Giorgi^500");

        verifyFindByEMAILIsCalledOnce("email3");
        assertThat(result).isEqualTo(expected);
    }

    // Test -----------------------------------------addUser---------------------------------------

    @Test
    public void whenUserAlreadyExists() {
        String expected = AuthorizationStatus.ALREADY_EXISTS.name();
        String result = authorizationService.addUser(new UserDTO("email1", "AtLeast^8", "Giorgi", "Adikashviili", new UserAddress("address", 41.739191, 44.779635), UserType.STUDENT.name()));

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenSuccessfulRegistration() {
        String expected = AuthorizationStatus.SUCCESSFUL_REGISTRATION.name();

        String result1 = authorizationService.addUser(new UserDTO("email4", "AtLeast^8", "Shota", "Ghvinepadze", new UserAddress("address", 41.739191, 44.779635), UserType.TEACHER.name()));
        verifyFindByEMAILIsCalledOnce("email4");

        String result2 = authorizationService.addUser(new UserDTO("email3", "AtLeast^8", "Nika", "Nargizashvili", new UserAddress("address", 41.739191, 44.779635), UserType.STUDENT.name()));
        verifyFindByEMAILIsCalledOnce("email3");

        assertThat(result1).isEqualTo(expected);
        assertThat(result2).isEqualTo(expected);
    }

    // Test ----------------------------------------authorizeUser----------------------------------

    @Test
    public void whenEmailNotFound() {
        String expected = AuthorizationStatus.EMAIL_NOT_FOUND.name();
        String result = authorizationService.authorizeUser(new UserDTO().setEmail("email3").setPassword("AtLeast^8"))[0];

        verifyFindByEMAILIsCalledOnce("email3");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenWrongPassword() {
        String expected = AuthorizationStatus.WRONG_PASSWORD.name();
        String result = authorizationService.authorizeUser(new UserDTO().setEmail("email1").setPassword("AtLeast^5"))[0];

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenSuccessfulLogin() {
        String expected = AuthorizationStatus.SUCCESSFUL_LOGIN.name();
        String result = authorizationService.authorizeUser(new UserDTO().setEmail("email1").setPassword("AtLeast^8"))[0];

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    // Test ----------------------------------------changePassword---------------------------------

    @Test
    public void whenPasswordIsIllegal() {
        String expected = AuthorizationStatus.ILLEGAL_PASSWORD.name();
        String result = authorizationService.changePassword("email1", "password");

        assertThat(result).isEqualTo(expected);
    }

    @Test
    public void whenSuccessfulPasswordChange() {
        String expected = AuthorizationStatus.SUCCESSFUL_CHANGE.name();
        String result = authorizationService.changePassword("email1", "Giorgi^501");

        verifyFindByEMAILIsCalledOnce("email1");
        assertThat(result).isEqualTo(expected);
    }

    // Test ----------------------------------------getAllTeachersInRadius-------------------------

    @Test
    public void whenFoundAllTeachersInRadius() {
        List<String> expected = List.of("email2");
        List<String> result = authorizationService.getAllTeachersInRadius(new UserAddressDTO("address", 41.699389, 44.875089)).stream().map(UserDTO::getEmail).collect(Collectors.toList());

        assertThat(result).isEqualTo(expected);
    }

    // Test ----------------------------------------getAllUsers------------------------------------

    @Test
    public void whenFoundAll() {
        List<String> expected = List.of("email1", "email2");
        List<String> result = authorizationService.getAllUsers().stream().map(UserDTO::getEmail).collect(Collectors.toList());

        assertThat(result).isEqualTo(expected);
    }

    // --------------------------------helpers-----------------------------------------------------

    private void verifyFindByEMAILIsCalledOnce(String email) {
        Mockito.verify(userRepository, VerificationModeFactory.times(1)).findByEmail(email);
        Mockito.reset(userRepository);
    }
}
