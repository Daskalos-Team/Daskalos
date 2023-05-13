package com.freeuni.daskalos;

import com.freeuni.daskalos.repository.UserRepository;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.service.UserService;
import com.freeuni.daskalos.utils.UserType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.mockito.Mockito.mock;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TeacherServiceIntegrationTest {

    @TestConfiguration
    static class UserServiceIntegrationTestsContextConfiguration {

        @Bean
        public UserService user() {
            return new UserService();
        }

//        @Bean
//        public TeacherService teacherService() {
//            return new TeacherService();
//        }
    }

    @Autowired
    private UserService userService;

//    @Autowired
//    private TeacherService teacherService;

//    @MockBean
//    private TeacherRepository teacherRepository;

//    @MockBean
//    private UserRepository userRepository;

    private Teacher teacher1;

    @Test
    public void testAddExperience() {
        UserRepository userRepository = mock(UserRepository.class);

        Teacher teacher = new Teacher ("email2", "AtLeast^8", "Luka", "Kalandadze", UserType.TEACHER);
        userRepository.save(teacher);
        Iterable<User> teachers = userRepository.findAll();
        Teacher t = (Teacher) userRepository.findByEmail("email2").get();
        System.out.println("brbrbr");
    }

}






















