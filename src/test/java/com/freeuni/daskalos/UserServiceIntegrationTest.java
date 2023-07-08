package com.freeuni.daskalos;

import com.freeuni.daskalos.dto.*;
import com.freeuni.daskalos.repository.*;
import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.service.experience.ExperienceService;
import com.freeuni.daskalos.service.rating.RatingService;
import com.freeuni.daskalos.service.subject.SubjectService;
import com.freeuni.daskalos.service.user.UserService;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import com.freeuni.daskalos.utils.UserType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

@ContextConfiguration
@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2, replace = AutoConfigureTestDatabase.Replace.NONE)
@RunWith(SpringJUnit4ClassRunner.class)
@TestPropertySource(locations = "/application-test.properties")
public class UserServiceIntegrationTest {

    @TestConfiguration
    static class TeacherServiceIntegrationTestsContextConfiguration {

        @Bean
        public UserService teacherService() {
            return new UserService();
        }

        @Bean
        public ExperienceService experienceService() {
            return new ExperienceService();
        }

        @Bean
        public RatingService ratingService() {
            return new RatingService();
        }

        @Bean
        public SubjectService subjectService() {
            return new SubjectService();
        }
    }

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private TeacherToExperienceRepository teacherToExperienceRepository;

    @Autowired
    private TeacherRatingRepository teacherRatingRepository;

    @Autowired
    private TeacherToRatingRepository teacherToRatingRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserToSubjectRepository userToSubjectRepository;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private ExperienceService experienceService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private Teacher teacher1;

    private Teacher teacher2;

    private Teacher teacher3;

    private Student student1;

    private Student student2;

    private Student student3;

    private ExperienceDTO experienceDTO1;

    private ExperienceDTO experienceDTO2;

    private TeacherRatingDTO teacherRatingDTO1;

    private TeacherRatingDTO teacherRatingDTO2;

    private SubjectDTO subjectDTO1;

    private SubjectDTO subjectDTO2;

    @Before
    public void setup() {
        teacher1 = new Teacher(10L, "Luka", "Kalandadze", "AtLeast^8", "email4",
                UserType.TEACHER, "55555555", new UserAddress("address1", 11.0, 20.0), true,
                null, null, null, null, null, null, null);

        teacher2 = new Teacher(11L, "Murtaz", "Gobozovi", "AtLeast^8", "email5",
                UserType.TEACHER, "55555555", new UserAddress("address2", 11.0, 20.0), true,
                null, null, null, null, null, null, null);

        teacher3 = new Teacher(12L, "Juansher", "Mamiashvili", "AtLeast^8", "email6",
                UserType.TEACHER, "55555555", new UserAddress("address3", 11.0, 20.0), true,
                null, null, null, null, null, null, null);

        student1 = new Student("email1", "AtLeast^8", "Giorgi", "Adikashviili", new UserAddress("address4", 1, 2), UserType.STUDENT,
                false, null, null, null, null, null, null);
        student2 = new Student("email2", "AtLeast^8", "Niko", "Nargizashviili", new UserAddress("address5", 1, 2), UserType.STUDENT,
                false, null, null, null, null, null, null);
        student3 = new Student("email3", "AtLeast^8", "Shalva", "Leclerishvili", new UserAddress("address6", 1, 2), UserType.STUDENT,
                false, null, null, null, null, null, null);
        experienceDTO1 = ExperienceDTO.builder().
                employer("Microsoft").
                jobDescription("Code maintenance").
                startDate(new Date(2017, Calendar.NOVEMBER, 19)).
                endDate(null).
                build();

        experienceDTO2 = ExperienceDTO.builder().
                employer("Amazon").
                jobDescription("Code development").
                startDate(new Date(2014, Calendar.JUNE, 8)).
                endDate(new Date(2017, Calendar.NOVEMBER, 19)).
                build();

        subjectDTO1 = SubjectDTO.builder().
                name("Aero Engineering").
                description("Best lecturer in the world, Adrian Newey").
                price(100).
                days(new ArrayList<>()).
                build();
        subjectDTO2 = SubjectDTO.builder().
                name("Mechanical Engineering").
                description("All the engineering principles in one course").
                price(200).
                days(new ArrayList<>()).
                build();
    }

    @Test
    public void testAddRemoveExperience() {
        Teacher t = userRepository.save(teacher1);
        ExperienceDTO addedExperience1 = userService.addTeachersExperience(t.getID(), experienceDTO1);
        List<ExperienceDTO> teachersExperience = userService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertEquals(1, teachersExperience.size());
        assertThat(teachersExperience, contains(addedExperience1));

        ExperienceDTO addedExperience2 = userService.addTeachersExperience(t.getID(), experienceDTO2);
        teachersExperience = userService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertEquals(2, teachersExperience.size());
        assertThat(teachersExperience, containsInAnyOrder(addedExperience2, addedExperience1));

        userService.removeTeachersExperience(addedExperience1);
        teachersExperience = userService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertEquals(1, teachersExperience.size());
        assertThat(teachersExperience, contains(addedExperience2));

        userService.removeTeachersExperience(addedExperience2);
        teachersExperience = userService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertEquals(0, teachersExperience.size());
    }

    @Test
    public void testTeacherExperienceOrderedCorrectly() {
        ExperienceDTO experience1 = ExperienceDTO.builder().
                employer("Amazon").
                jobDescription("Code development").
                startDate(new Date(2014, Calendar.JUNE, 8)).
                endDate(new Date(2017, Calendar.NOVEMBER, 19)).
                build();
        ExperienceDTO experience2 = ExperienceDTO.builder().
                employer("Google").
                jobDescription("Software Engineer").
                startDate(new Date(2009, Calendar.JUNE, 8)).
                endDate(new Date(2012, Calendar.FEBRUARY, 19)).
                build();
        ExperienceDTO experience3 = ExperienceDTO.builder().
                employer("Meta").
                jobDescription("Software Architect").
                startDate(new Date(2012, Calendar.JUNE, 8)).
                endDate(new Date(2014, Calendar.MAY, 19)).
                build();
        ExperienceDTO experience4 = ExperienceDTO.builder().
                employer("Microsoft").
                jobDescription("Code maintenance").
                startDate(new Date(2017, Calendar.NOVEMBER, 19)).
                endDate(null).
                build();

        Teacher t = userRepository.save(teacher1);
        ExperienceDTO addedExperience1 = userService.addTeachersExperience(t.getID(), experience1);
        ExperienceDTO addedExperience2 = userService.addTeachersExperience(t.getID(), experience2);
        ExperienceDTO addedExperience3 = userService.addTeachersExperience(t.getID(), experience3);
        ExperienceDTO addedExperience4 = userService.addTeachersExperience(t.getID(), experience4);
        List<ExperienceDTO> teachersExperience = userService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertThat(teachersExperience, containsInAnyOrder(addedExperience1, addedExperience2, addedExperience3, addedExperience4));
        assertThat(teachersExperience, hasSize(4));
        assertEquals(addedExperience3, teachersExperience.get(2));
        assertEquals(addedExperience1, teachersExperience.get(1));
        assertEquals(addedExperience2, teachersExperience.get(3));
        assertEquals(addedExperience4, teachersExperience.get(0));
    }

    @Test
    public void testAddRemoveRating() {
        Teacher t = userRepository.save(teacher1);
        Student s = userRepository.save(student1);
        teacherRatingDTO1 = TeacherRatingDTO.builder().
                studentID(s.getID()).
                studentComment("very nice teacher").
                rating(5).
                build();

        teacherRatingDTO2 = TeacherRatingDTO.builder().
                studentID(s.getID()).
                studentComment("not bad teacher").
                rating(3).
                build();
        TeacherRatingDTO addedRating1 = userService.addTeachersRating(t.getID(), teacherRatingDTO1);
        List<TeacherRatingDTO> teacherRatings = userService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(1, teacherRatings.size());
        assertThat(teacherRatings, contains(addedRating1));

        TeacherRatingDTO addedRating2 = userService.addTeachersRating(t.getID(), teacherRatingDTO2);
        teacherRatings = userService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(2, teacherRatings.size());
        assertThat(teacherRatings, containsInAnyOrder(addedRating2, addedRating1));

        userService.removeTeacherRating(addedRating1);
        teacherRatings = userService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(1, teacherRatings.size());
        assertThat(teacherRatings, contains(addedRating2));

        userService.removeTeacherRating(addedRating2);
        teacherRatings = userService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(0, teacherRatings.size());
    }

    @Test
    public void testGetTeacherRatingOrder() {
        Teacher t = userRepository.save(teacher1);
        Student s1 = userRepository.save(student1);
        Student s2 = userRepository.save(student2);
        Student s3 = userRepository.save(student3);
        TeacherRatingDTO teacherRating1 = TeacherRatingDTO.builder().
                studentID(s1.getID()).
                studentComment("very nice teacher").
                rating(5).
                addDate(new Date(2012, Calendar.JUNE, 8)).
                build();

        TeacherRatingDTO teacherRating2 = TeacherRatingDTO.builder().
                studentID(s2.getID()).
                studentComment("not bad teacher").
                rating(3).
                addDate(new Date(2017, Calendar.NOVEMBER, 19)).
                build();

        TeacherRatingDTO teacherRating3 = TeacherRatingDTO.builder().
                studentID(s3.getID()).
                studentComment("not bad teacher").
                rating(4).
                addDate(new Date(2014, Calendar.MAY, 19)).
                build();
        TeacherRatingDTO addedRating1 = userService.addTeachersRating(t.getID(), teacherRating1);
        TeacherRatingDTO addedRating2 = userService.addTeachersRating(t.getID(), teacherRating2);
        TeacherRatingDTO addedRating3 = userService.addTeachersRating(t.getID(), teacherRating3);

        List<TeacherRatingDTO> teacherRatings = userService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(teacherRatings.get(0), addedRating2);
        assertEquals(teacherRatings.get(1), addedRating3);
        assertEquals(teacherRatings.get(2), addedRating1);
    }

    @Test
    public void testAddRemoveSubject() {
        Teacher t = userRepository.save(teacher1);
        SubjectDTO addedSubject1 = userService.addSubject(t.getID(), subjectDTO1);
        List<SubjectDTO> teacherSubjects = userService.getTeacherDTO(t.getID()).getTeacherSubjects();
        assertEquals(1, teacherSubjects.size());
        assertThat(teacherSubjects, contains(addedSubject1));

        SubjectDTO addedSubject2 = userService.addSubject(t.getID(), subjectDTO2);
        teacherSubjects = userService.getTeacherDTO(t.getID()).getTeacherSubjects();
        assertEquals(2, teacherSubjects.size());
        assertThat(teacherSubjects, containsInAnyOrder(addedSubject2, addedSubject1));

        userService.removeSubject(t.getID(), addedSubject1);
        teacherSubjects = userService.getTeacherDTO(t.getID()).getTeacherSubjects();
        assertEquals(1, teacherSubjects.size());
        assertThat(teacherSubjects, contains(addedSubject2));

        userService.removeSubject(t.getID(), addedSubject2);
        teacherSubjects = userService.getTeacherDTO(t.getID()).getTeacherSubjects();
        assertEquals(0, teacherSubjects.size());
    }

    @Test
    public void testUpdateTeacher() {
        Teacher t = userRepository.save(teacher1);
        // update phone number
        userService.updateTeacher(TeacherDTO.builder().ID(t.getID()).phoneNumber("503909309").build());
        assertEquals(userService.getTeacherDTO(t.getID()).getPhoneNumber(), "503909309");
        // update address
        UserAddressDTO userAddressDTO = new UserAddressDTO("address7", 10.0, 20.0);
        userService.updateTeacher(TeacherDTO.builder().ID(t.getID()).address(userAddressDTO).build());
        UserAddressDTO userAddress = userService.getTeacherDTO(t.getID()).getAddress();
        assertEquals(userAddress.getFullAddress(), "address7");
        assertEquals(userAddress.getLatitude(), 10.0, 0.00001);
        assertEquals(userAddress.getLongitude(), 20.0, 0.00001);

        // update on place
        userService.updateTeacher(TeacherDTO.builder().ID(t.getID()).isOnPlace(false).build());
        assertFalse(userService.getTeacherDTO(t.getID()).getIsOnPlace());

        userService.updateTeacher(TeacherDTO.builder().ID(t.getID()).isOnPlace(true).build());
        assertTrue(userService.getTeacherDTO(t.getID()).getIsOnPlace());

        userService.updateTeacher(TeacherDTO.builder().ID(t.getID()).description("bla bla bla").title("ble ble ble").build());
        assertEquals("bla bla bla", userService.getTeacherDTO(t.getID()).getDescription());
        assertEquals("ble ble ble", userService.getTeacherDTO(t.getID()).getTitle());

        userService.updateTeacher(TeacherDTO.builder().ID(t.getID()).fbUrl("FB.com").twitterUrl("twitter.com").instaUrl("insta.com").linkedinUrl("linkedin.com").build());
        assertEquals("FB.com", userService.getTeacherDTO(t.getID()).getFbUrl());
        assertEquals("insta.com", userService.getTeacherDTO(t.getID()).getInstaUrl());
        assertEquals("twitter.com", userService.getTeacherDTO(t.getID()).getTwitterUrl());
        assertEquals("linkedin.com", userService.getTeacherDTO(t.getID()).getLinkedinUrl());
    }

    @Test
    public void testUpdateStudent() {
        Student student = studentRepository.save(student1);
        // test phone number update
        userService.updateStudent(StudentDTO.builder().ID(student.getID()).phoneNumber("11111111").build());
        assertEquals(userService.getStudentDTO(student.getID()).getPhoneNumber(), "11111111");

        // test address update
        UserAddressDTO userAddressDTO = new UserAddressDTO("address8", 10.0, 20.0);
        userService.updateStudent(StudentDTO.builder().ID(student.getID()).userAddress(userAddressDTO).build());
        UserAddressDTO userAddress = userService.getStudentDTO(student.getID()).getUserAddress();
        assertEquals(userAddress.getFullAddress(), "address8");
        assertEquals(userAddress.getLatitude(), 10.0, 0.00001);
        assertEquals(userAddress.getLongitude(), 20.0, 0.00001);

        // update on place
        userService.updateStudent(StudentDTO.builder().ID(student.getID()).onPlace(true).build());
        assertTrue(userService.getStudentDTO(student.getID()).getOnPlace());

        userService.updateStudent(StudentDTO.builder().ID(student.getID()).description("bla bla bla").title("ble ble ble").build());
        assertEquals("bla bla bla", userService.getStudentDTO(student.getID()).getDescription());
        assertEquals("ble ble ble", userService.getStudentDTO(student.getID()).getTitle());

        userService.updateStudent(StudentDTO.builder().ID(student.getID()).fbUrl("FB.com").twitterUrl("twitter.com").instaUrl("insta.com").linkedinUrl("linkedin.com").build());
        assertEquals("FB.com", userService.getStudentDTO(student.getID()).getFbUrl());
        assertEquals("insta.com", userService.getStudentDTO(student.getID()).getInstaUrl());
        assertEquals("twitter.com", userService.getStudentDTO(student.getID()).getTwitterUrl());
        assertEquals("linkedin.com", userService.getStudentDTO(student.getID()).getLinkedinUrl());
    }

    @Test
    public void testGetAllTeachers() {
        Teacher t1 = userRepository.save(teacher1);
        Teacher t2 = userRepository.save(teacher2);
        Teacher t3 = userRepository.save(teacher3);

        List<TeacherDTO> teachers = userService.getAllTeachers();
        assertThat(teachers, containsInAnyOrder(DaoDtoConversionUtils.toTeacherDTO(t1, new ArrayList<>(), new ArrayList<>(), new ArrayList<>()),
                DaoDtoConversionUtils.toTeacherDTO(t2, new ArrayList<>(), new ArrayList<>(), new ArrayList<>()),
                DaoDtoConversionUtils.toTeacherDTO(t3, new ArrayList<>(), new ArrayList<>(), new ArrayList<>())));
    }

    @Test
    public void testGetAllStudents() {
        Student s1 = userRepository.save(student1);
        Student s2 = userRepository.save(student2);
        Student s3 = userRepository.save(student3);

        List<StudentDTO> students = userService.getAllStudents();
        assertThat(students, containsInAnyOrder(DaoDtoConversionUtils.toStudentDTO(s1, new ArrayList<>(), new ArrayList<>()),
                DaoDtoConversionUtils.toStudentDTO(s2, new ArrayList<>(), new ArrayList<>()),
                DaoDtoConversionUtils.toStudentDTO(s3, new ArrayList<>(), new ArrayList<>())));
    }

    @Test
    public void testAddDeleteStudentFavorite() {
        Student student = userRepository.save(student1);
        Teacher teacherFirst = userRepository.save(teacher1);
        Teacher teacherSecond = userRepository.save(teacher2);
        Teacher teacherThird = userRepository.save(teacher3);
        TeacherDTO t1 = DaoDtoConversionUtils.toTeacherDTO(teacherFirst, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        TeacherDTO t2 = DaoDtoConversionUtils.toTeacherDTO(teacherSecond, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        TeacherDTO t3 = DaoDtoConversionUtils.toTeacherDTO(teacherThird, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        // add first teacher
        userService.addStudentFavouriteTeacher(student.getID(), t1.getID());
        List<TeacherDTO> studentFavorites = userService.getStudentFavouriteTeachers(student.getID());
        assertThat(studentFavorites, hasSize(1));
        assertThat(studentFavorites, containsInAnyOrder(t1));
        // add second teacher
        userService.addStudentFavouriteTeacher(student.getID(), t2.getID());
        studentFavorites = userService.getStudentFavouriteTeachers(student.getID());
        assertThat(studentFavorites, hasSize(2));
        assertThat(studentFavorites, containsInAnyOrder(t1, t2));
        // add third teacher
        userService.addStudentFavouriteTeacher(student.getID(), t3.getID());
        studentFavorites = userService.getStudentFavouriteTeachers(student.getID());
        assertThat(studentFavorites, hasSize(3));
        assertThat(studentFavorites, containsInAnyOrder(t1, t2, t3));
        // remove first teacher
        userService.removeStudentFavouriteTeacher(student.getID(), t1.getID());
        studentFavorites = userService.getStudentFavouriteTeachers(student.getID());
        assertThat(studentFavorites, hasSize(2));
        assertThat(studentFavorites, containsInAnyOrder(t3, t2));
        // remove second teacher
        userService.removeStudentFavouriteTeacher(student.getID(), t2.getID());
        studentFavorites = userService.getStudentFavouriteTeachers(student.getID());
        assertThat(studentFavorites, hasSize(1));
        assertThat(studentFavorites, containsInAnyOrder(t3));
        // remove third teacher
        userService.removeStudentFavouriteTeacher(student.getID(), t3.getID());
        studentFavorites = userService.getStudentFavouriteTeachers(student.getID());
        assertThat(studentFavorites, hasSize(0));
    }
}
