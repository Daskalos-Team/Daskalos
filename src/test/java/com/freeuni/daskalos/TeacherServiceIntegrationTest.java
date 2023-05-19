package com.freeuni.daskalos;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.repository.*;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.service.experience.ExperienceService;
import com.freeuni.daskalos.service.experience.ExperienceServiceImpl;
import com.freeuni.daskalos.service.rating.RatingService;
import com.freeuni.daskalos.service.rating.RatingServiceImpl;
import com.freeuni.daskalos.service.subject.SubjectService;
import com.freeuni.daskalos.service.subject.SubjectServiceImpl;
import com.freeuni.daskalos.service.teacher.TeacherService;
import com.freeuni.daskalos.service.teacher.TeacherServiceImpl;
import com.freeuni.daskalos.utils.UserType;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.junit.Assert.assertEquals;


@ContextConfiguration
@DataJpaTest
@AutoConfigureTestDatabase(connection =  EmbeddedDatabaseConnection.H2, replace = AutoConfigureTestDatabase.Replace.NONE)
@RunWith(SpringJUnit4ClassRunner.class)
@TestPropertySource(locations = "/application-test.properties")
public class TeacherServiceIntegrationTest {

    @TestConfiguration
    static class TeacherServiceIntegrationTestsContextConfiguration {

        @Bean
        public TeacherService teacherService() {
            return new TeacherServiceImpl();
        }

        @Bean
        public ExperienceService experienceService() {
            return new ExperienceServiceImpl();
        }

        @Bean
        public RatingService ratingService() {
            return new RatingServiceImpl();
        }

        @Bean
        public SubjectService subjectService() {
            return new SubjectServiceImpl();
        }
    }


    @Autowired
    private TeacherRepository teacherRepository;

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
    private TeacherToSubjectRepository teacherToSubjectRepository;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private ExperienceService experienceService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private UserRepository userRepository;

    private Teacher teacher1;

    private Student student1;

    private ExperienceDTO experienceDTO1;

    private ExperienceDTO experienceDTO2;

    private TeacherRatingDTO teacherRatingDTO1;

    private TeacherRatingDTO teacherRatingDTO2;

    private SubjectDTO subjectDTO1;

    private SubjectDTO subjectDTO2;

    @Before
    public void setup() {
        teacher1 = new Teacher(10L, "Luka", "Kalandadze", "AtLeast^8", "email2",
                UserType.TEACHER, "55555555", "Tbilisi", true, 100, 150);
        student1 = new Student("email1", "AtLeast^8", "Giorgi", "Adikashviili", UserType.STUDENT);
        student1.setID(11L);

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

        teacherRatingDTO1 = TeacherRatingDTO.builder().
                studentID(student1.getID()).
                studentComment("very nice teacher").
                rating(5).
                //studentNameSecondName("Malkhaz Verstappen").
                        build();

        teacherRatingDTO2 = TeacherRatingDTO.builder().
                studentID(student1.getID()).
                studentComment("not bad teacher").
                rating(3).
                //studentNameSecondName("Karen Horner").
                        build();

        subjectDTO1 = SubjectDTO.builder().
                name("Aero Engineering").
                build();
        subjectDTO2 = SubjectDTO.builder().
                name("Mechanical Engineering").
                build();
    }

    @Test
    public void testAddRemoveExperience() {
        Teacher t = userRepository.save(teacher1);
        ExperienceDTO addedExperience1 = teacherService.addExperience(t.getID(), experienceDTO1);
        List<ExperienceDTO> teachersExperience = teacherService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertEquals(1, teachersExperience.size());
        assertThat(teachersExperience, contains(addedExperience1));

        ExperienceDTO addedExperience2 = teacherService.addExperience(t.getID(), experienceDTO2);
        teachersExperience = teacherService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertEquals(2, teachersExperience.size());
        assertThat(teachersExperience, containsInAnyOrder(addedExperience2, addedExperience1));

        teacherService.removeExperience(addedExperience1);
        teachersExperience = teacherService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertEquals(1, teachersExperience.size());
        assertThat(teachersExperience, contains(addedExperience2));

        teacherService.removeExperience(addedExperience2);
        teachersExperience = teacherService.getTeacherDTO(t.getID()).getTeachersExperience();
        assertEquals(0, teachersExperience.size());
    }

    @Test
    public void testAddRemoveRating() {
        Teacher t = userRepository.save(teacher1);
        Student s = userRepository.save(student1);
        TeacherRatingDTO addedRating1 = teacherService.addRating(t.getID(), teacherRatingDTO1);
        List<TeacherRatingDTO> teacherRatings = teacherService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(1, teacherRatings.size());
        assertThat(teacherRatings, contains(addedRating1));

        TeacherRatingDTO addedRating2 = teacherService.addRating(t.getID(), teacherRatingDTO2);
        teacherRatings = teacherService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(2, teacherRatings.size());
        assertThat(teacherRatings, containsInAnyOrder(addedRating2, addedRating1));

        teacherService.removeRating(addedRating1);
        teacherRatings = teacherService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(1, teacherRatings.size());
        assertThat(teacherRatings, contains(addedRating2));

        teacherService.removeRating(addedRating2);
        teacherRatings = teacherService.getTeacherDTO(t.getID()).getTeacherRatings();
        assertEquals(0, teacherRatings.size());
    }

    @Test
    public void testAddRemoveSubject() {
        Teacher t = userRepository.save(teacher1);
        SubjectDTO addedSubject1 = teacherService.addSubject(t.getID(), subjectDTO1);
        List<SubjectDTO> teacherSubjects = teacherService.getTeacherDTO(t.getID()).getTeacherSubjects();
        assertEquals(1, teacherSubjects.size());
        assertThat(teacherSubjects, contains(addedSubject1));

        SubjectDTO addedSubject2 = teacherService.addSubject(t.getID(), subjectDTO2);
        teacherSubjects = teacherService.getTeacherDTO(t.getID()).getTeacherSubjects();
        assertEquals(2, teacherSubjects.size());
        assertThat(teacherSubjects, containsInAnyOrder(addedSubject2, addedSubject1));

        teacherService.removeSubject(t.getID(), addedSubject1);
        teacherSubjects = teacherService.getTeacherDTO(t.getID()).getTeacherSubjects();
        assertEquals(1, teacherSubjects.size());
        assertThat(teacherSubjects, contains(addedSubject2));

        teacherService.removeSubject(t.getID(), addedSubject2);
        teacherSubjects = teacherService.getTeacherDTO(t.getID()).getTeacherSubjects();
        assertEquals(0, teacherSubjects.size());
    }

//    @Test
//    public void testUpdateTeacher() {
//        Teacher t = userRepository.save(teacher1);
//        teacherService.updateTeacher(TeacherDTO.builder().ID(t.getID()).name("Levani").build());
//        String newName = teacherService.getTeacherDTO(t.getID()).getName();
//    }
}
