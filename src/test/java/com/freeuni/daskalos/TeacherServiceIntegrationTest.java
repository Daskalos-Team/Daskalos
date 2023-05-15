package com.freeuni.daskalos;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.repository.*;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.repository.entities.TeacherToExperience;
import com.freeuni.daskalos.service.experience.ExperienceService;
import com.freeuni.daskalos.service.rating.RatingService;
import com.freeuni.daskalos.service.subject.SubjectService;
import com.freeuni.daskalos.service.teacher.TeacherService;
import com.freeuni.daskalos.service.teacher.TeacherServiceImpl;
import com.freeuni.daskalos.utils.UserType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TeacherServiceIntegrationTest {

    @TestConfiguration
    static class TeacherServiceIntegrationTestsContextConfiguration {

        @Bean
        public TeacherService teacherService() {
            return new TeacherServiceImpl();
        }
    }

    @MockBean
    private TeacherService teacherService;

    @MockBean
    private TeacherRepository teacherRepository;

    @MockBean
    private ExperienceService experienceService;

    @MockBean
    private ExperienceRepository experienceRepository;

    @MockBean
    private TeacherToExperienceRepository teacherToExperienceRepository;

    @MockBean
    private RatingService ratingService;

    @MockBean
    private TeacherRatingRepository teacherRatingRepository;

    @MockBean
    private TeacherToRatingRepository teacherToRatingRepository;

    @MockBean
    private SubjectService subjectService;

    @MockBean
    private SubjectRepository subjectRepository;

    @MockBean
    private TeacherToSubjectRepository teacherToSubjectRepository;

    @MockBean
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
        Mockito.when(userRepository.findById(teacher1.getID())).thenReturn(Optional.ofNullable(teacher1));
        student1 = new Student("email1", "AtLeast^8", "Giorgi", "Adikashviili", UserType.STUDENT);
        student1.setID(11L);
        Mockito.when(userRepository.findById(student1.getID())).thenReturn(Optional.ofNullable(student1));

        experienceDTO1 = ExperienceDTO.builder().
                ID(1000L).
                employer("Microsoft").
                jobDescription("Code maintenance").
                startDate(new Date(2017, Calendar.NOVEMBER, 19)).
                endDate(null).
                build();

        experienceDTO2 = ExperienceDTO.builder().
                ID(1001L).
                employer("Amazon").
                jobDescription("Code development").
                startDate(new Date(2014, Calendar.JUNE, 8)).
                endDate(new Date(2017, Calendar.NOVEMBER, 19)).
                build();

        teacherRatingDTO1 = TeacherRatingDTO.builder().
                ID(100L).
                studentID(student1.getID()).
                studentComment("very nice teacher").
                rating(5).
                //studentNameSecondName("Malkhaz Verstappen").
                        build();

        teacherRatingDTO2 = TeacherRatingDTO.builder().
                ID(101L).
                studentID(student1.getID()).
                studentComment("not bad teacher").
                rating(3).
                //studentNameSecondName("Karen Horner").
                        build();

        subjectDTO1 = SubjectDTO.builder().
                ID(21L).
                name("Aero Engineering").
                build();
        subjectDTO2 = SubjectDTO.builder().
                ID(21L).
                name("Mechanical Engineering").
                build();
    }

    @Test
    public void testAddRemoveExperience() {
        Teacher t = (Teacher) userRepository.findById(teacher1.getID()).get();
        teacherService.addExperience(t.getID(), experienceDTO1);
        List<ExperienceDTO> teachersExperience = teacherService.getTeacherDTO(teacher1.getID()).getTeachersExperience();
        assertEquals(1, teachersExperience.size());
        assertThat(teachersExperience, contains(experienceDTO1));

        teacherService.addExperience(t.getID(), experienceDTO2);
        teachersExperience = teacherService.getTeacherDTO(teacher1.getID()).getTeachersExperience();
        assertEquals(2, teachersExperience.size());
        assertThat(teachersExperience, containsInAnyOrder(experienceDTO2, experienceDTO1));

        teacherService.removeExperience(experienceDTO1);
        teachersExperience = teacherService.getTeacherDTO(teacher1.getID()).getTeachersExperience();
        assertEquals(1, teachersExperience.size());
        assertThat(teachersExperience, contains(experienceDTO2));

        teacherService.removeExperience(experienceDTO2);
        teachersExperience = teacherService.getTeacherDTO(teacher1.getID()).getTeachersExperience();
        assertEquals(0, teachersExperience.size());
    }

    @Test
    public void testAddRemoveRating() {
        Teacher t = userRepository.save(teacher1);
        Student s = userRepository.save(student1);
        teacherService.addRating(t.getID(), teacherRatingDTO1);
        List<TeacherRatingDTO> teacherRatings = teacherService.getTeacherDTO(teacher1.getID()).getTeacherRatings();
        assertEquals(1, teacherRatings.size());
        assertThat(teacherRatings, contains(teacherRatingDTO1));

        teacherService.addRating(t.getID(), teacherRatingDTO2);
        teacherRatings = teacherService.getTeacherDTO(teacher1.getID()).getTeacherRatings();
        assertEquals(2, teacherRatings.size());
        assertThat(teacherRatings, containsInAnyOrder(teacherRatingDTO2, teacherRatingDTO1));

        teacherService.removeRating(teacherRatingDTO1);
        teacherRatings = teacherService.getTeacherDTO(teacher1.getID()).getTeacherRatings();
        assertEquals(1, teacherRatings.size());
        assertThat(teacherRatings, contains(teacherRatingDTO2));

        teacherService.removeRating(teacherRatingDTO2);
        teacherRatings = teacherService.getTeacherDTO(teacher1.getID()).getTeacherRatings();
        assertEquals(0, teacherRatings.size());
    }

    @Test
    public void testAddRemoveSubject() {
        Teacher t = userRepository.save(teacher1);
        teacherService.addSubject(t.getID(), subjectDTO1);
        List<SubjectDTO> teacherSubjects = teacherService.getTeacherDTO(teacher1.getID()).getTeacherSubjects();
        assertEquals(1, teacherSubjects.size());
        assertThat(teacherSubjects, contains(subjectDTO1));

        teacherService.addSubject(t.getID(), subjectDTO2);
        teacherSubjects = teacherService.getTeacherDTO(teacher1.getID()).getTeacherSubjects();
        assertEquals(2, teacherSubjects.size());
        assertThat(teacherSubjects, containsInAnyOrder(subjectDTO2, subjectDTO1));

        teacherService.removeSubject(t.getID(), subjectDTO1);
        teacherSubjects = teacherService.getTeacherDTO(teacher1.getID()).getTeacherSubjects();
        assertEquals(1, teacherSubjects.size());
        assertThat(teacherSubjects, contains(subjectDTO2));

        teacherService.removeSubject(t.getID(), subjectDTO2);
        teacherSubjects = teacherService.getTeacherDTO(teacher1.getID()).getTeacherSubjects();
        assertEquals(0, teacherSubjects.size());
    }

    @Test
    public void testUpdateTeacher() {
        Teacher t = userRepository.save(teacher1);
        teacherService.updateTeacher(TeacherDTO.builder().ID(t.getID()).name("Levani").build());
        String newName = teacherService.getTeacherDTO(t.getID()).getName();
    }
}
