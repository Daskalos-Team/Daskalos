package com.freeuni.daskalos.service.user;

import com.freeuni.daskalos.dto.*;
import com.freeuni.daskalos.repository.StudentRepository;
import com.freeuni.daskalos.repository.StudentToFavouriteTeacherRepository;
import com.freeuni.daskalos.repository.TeacherRepository;
import com.freeuni.daskalos.repository.entities.Student;
import com.freeuni.daskalos.repository.entities.StudentToFavouriteTeacher;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.service.experience.ExperienceService;
import com.freeuni.daskalos.service.rating.RatingService;
import com.freeuni.daskalos.service.subject.SubjectService;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import com.freeuni.daskalos.utils.UserUtils;
import com.freeuni.daskalos.utils.exceptions.UserNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private ExperienceService experienceService;

    @Autowired
    private StudentToFavouriteTeacherRepository favouriteTeacherRepository;

    public TeacherDTO getTeacherDTO(Long ID) throws UserNotExistException {
        Optional<Teacher> teacherOptional = teacherRepository.findById(ID);
        if (teacherOptional.isPresent()) {
            Teacher teacher = teacherOptional.get();
            return DaoDtoConversionUtils.toTeacherDTO(teacher,
                    experienceService.getTeachersExperience(ID),
                    ratingService.getTeacherRating(ID),
                    subjectService.getUserSubjects(ID));
        } else {
            throw new UserNotExistException("User with ID was not found");
        }
    }

    public List<TeacherDTO> getAllTeachers() {
        return StreamSupport.stream(teacherRepository.findAll().spliterator(), false)
                .map(teacher -> DaoDtoConversionUtils.toTeacherDTO(
                        teacher,
                        experienceService.getTeachersExperience(teacher.getID()),
                        ratingService.getTeacherRating(teacher.getID()),
                        subjectService.getUserSubjects(teacher.getID())
                ))
                .collect(Collectors.toList());
    }

    public List<StudentDTO> getAllStudents() {
        return StreamSupport.stream(studentRepository.findAll().spliterator(), false)
                .map(student -> DaoDtoConversionUtils.toStudentDTO(
                        student,
                        subjectService.getUserSubjects(student.getID()),
                        getStudentFavouriteTeachers(student.getID())
                ))
                .collect(Collectors.toList());
    }

    public void updateTeacher(TeacherDTO teacherDTO) {
        TeacherDTO existingData = getTeacherDTO(teacherDTO.getID());
        Teacher updatedTeacherData = DaoDtoConversionUtils.toTeacher(
                TeacherDTO.builder().
                        ID(teacherDTO.getID()).
                        name(teacherDTO.getName() != null ? teacherDTO.getName() : existingData.getName()).
                        surname(teacherDTO.getSurname() != null ? teacherDTO.getSurname() : existingData.getSurname()).
                        password(teacherDTO.getPassword() != null ? teacherDTO.getPassword() : existingData.getPassword()).
                        email(teacherDTO.getEmail() != null ? teacherDTO.getEmail() : existingData.getEmail()).
                        profileImage(teacherDTO.getProfileImage() != null ? teacherDTO.getProfileImage() : existingData.getProfileImage()).
                        userType(teacherDTO.getUserType() != null ? teacherDTO.getUserType() : existingData.getUserType()).
                        phoneNumber(teacherDTO.getPhoneNumber() != null ? teacherDTO.getPhoneNumber() : existingData.getPhoneNumber()).
                        address(teacherDTO.getAddress() != null ? teacherDTO.getAddress() : existingData.getAddress()).
                        onPlace(teacherDTO.getOnPlace()).
                        title(teacherDTO.getTitle() != null ? teacherDTO.getTitle() : existingData.getTitle()).
                        description(teacherDTO.getDescription() != null ? teacherDTO.getDescription() : existingData.getDescription()).
                        fbUrl(teacherDTO.getFbUrl() != null ? teacherDTO.getFbUrl() : existingData.getFbUrl()).
                        instaUrl(teacherDTO.getInstaUrl() != null ? teacherDTO.getInstaUrl() : existingData.getInstaUrl()).
                        twitterUrl(teacherDTO.getTwitterUrl() != null ? teacherDTO.getTwitterUrl() : existingData.getTwitterUrl()).
                        linkedinUrl(teacherDTO.getLinkedinUrl() != null ? teacherDTO.getLinkedinUrl() : existingData.getLinkedinUrl()).
                        teachersExperience(teacherDTO.getTeachersExperience() != null ? teacherDTO.getTeachersExperience() : existingData.getTeachersExperience()).
                        teacherRatings(teacherDTO.getTeacherRatings() != null ? teacherDTO.getTeacherRatings() : existingData.getTeacherRatings()).
                        teacherSubjects(teacherDTO.getTeacherSubjects() != null ? teacherDTO.getTeacherSubjects() : existingData.getTeacherSubjects()).
                        isFavoriteForLoggedInStudent(teacherDTO.getIsFavoriteForLoggedInStudent() != null ? teacherDTO.getIsFavoriteForLoggedInStudent() : existingData.getIsFavoriteForLoggedInStudent()).
                        build());
        teacherRepository.save(updatedTeacherData);
    }

    public void updateStudent(StudentDTO studentDTO) {
        StudentDTO existingData = getStudentDTO(studentDTO.getID());
        Student updatedStudentData = DaoDtoConversionUtils.toStudent(
                StudentDTO.builder().
                        ID(studentDTO.getID()).
                        name(studentDTO.getName() != null ? studentDTO.getName() : existingData.getName()).
                        surname(studentDTO.getSurname() != null ? studentDTO.getSurname() : existingData.getSurname()).
                        password(studentDTO.getPassword() != null ? studentDTO.getPassword() : existingData.getPassword()).
                        email(studentDTO.getEmail() != null ? studentDTO.getEmail() : existingData.getEmail()).
                        profileImage(studentDTO.getProfileImage() != null ? studentDTO.getProfileImage() : existingData.getProfileImage()).
                        userType(studentDTO.getUserType() != null ? studentDTO.getUserType() : existingData.getUserType()).
                        phoneNumber(studentDTO.getPhoneNumber() != null ? studentDTO.getPhoneNumber() : existingData.getPhoneNumber()).
                        userAddress(studentDTO.getUserAddress() != null ? studentDTO.getUserAddress() : existingData.getUserAddress()).
                        onPlace(studentDTO.getOnPlace()).
                        title(studentDTO.getTitle() != null ? studentDTO.getTitle() : existingData.getTitle()).
                        description(studentDTO.getDescription() != null ? studentDTO.getDescription() : existingData.getDescription()).
                        fbUrl(studentDTO.getFbUrl() != null ? studentDTO.getFbUrl() : existingData.getFbUrl()).
                        instaUrl(studentDTO.getInstaUrl() != null ? studentDTO.getInstaUrl() : existingData.getInstaUrl()).
                        twitterUrl(studentDTO.getTwitterUrl() != null ? studentDTO.getTwitterUrl() : existingData.getTwitterUrl()).
                        linkedinUrl(studentDTO.getLinkedinUrl() != null ? studentDTO.getLinkedinUrl() : existingData.getLinkedinUrl()).
                        studentSubjects(studentDTO.getStudentSubjects() != null ? studentDTO.getStudentSubjects() : existingData.getStudentSubjects()).
                        studentFavouriteTeachers(studentDTO.getStudentFavouriteTeachers() != null ? studentDTO.getStudentFavouriteTeachers() : existingData.getStudentFavouriteTeachers()).
                        build());
        studentRepository.save(updatedStudentData);
    }

    public ExperienceDTO addTeachersExperience(Long teacherID, ExperienceDTO experience) {
        return experienceService.addTeacherExperience(teacherID, experience);
    }

    public void removeTeachersExperience(ExperienceDTO experience) {
        experienceService.removeTeacherExperience(experience);
    }

    public TeacherRatingDTO addTeachersRating(Long teacherID, TeacherRatingDTO teacherRating) {
        return ratingService.addTeacherRating(teacherID, teacherRating);
    }

    public void removeTeacherRating(TeacherRatingDTO teacherRating) {
        ratingService.removeTeacherRating(teacherRating);
    }

    public SubjectDTO addSubject(Long userID, SubjectDTO subject) {
        return subjectService.addUserSubject(userID, subject);
    }

    public void removeSubject(Long userID, SubjectDTO subject) {
        subjectService.deleteUserSubject(userID, subject);
    }

    public void removeAllSubjects(Long userID) {
        List<SubjectDTO> allSubjects = subjectService.getUserSubjects(userID);
        for (SubjectDTO subject : allSubjects) {
            removeSubject(userID, subject);
        }
    }

    public StudentDTO getStudentDTO(Long studentID) {
        Optional<Student> student = studentRepository.findById(studentID);
        if (student.isEmpty()) {
            throw new UserNotExistException("Student with ID not found");
        } else {
            return DaoDtoConversionUtils.toStudentDTO(student.get(),
                    subjectService.getUserSubjects(studentID),
                    getStudentFavouriteTeachers(studentID));
        }
    }

    public List<TeacherDTO> getStudentFavouriteTeachers(Long studentID) {
        return favouriteTeacherRepository.findByStudentID(studentID).
                stream().
                map(StudentToFavouriteTeacher::getTeacherID).
                map(this::getTeacherDTO).
                collect(Collectors.toList());
    }

    public void addStudentFavouriteTeacher(Long studentID, Long teacherID) {
        favouriteTeacherRepository.save(StudentToFavouriteTeacher.
                builder().
                studentID(studentID).
                teacherID(teacherID).
                build());
    }

    public void removeStudentFavouriteTeacher(Long studentID, Long teacherID) {
        favouriteTeacherRepository.deleteByStudentIDAndTeacherID(studentID, teacherID);
    }

    public List<TeacherDTO> getAllTeachersInRadius(UserAddressDTO address, int radius) {
        List<TeacherDTO> allTeachers = getAllTeachers();
        return allTeachers.stream()
                .filter(teacher -> UserUtils.isInRadius(teacher.getAddress(), address, radius))
                .collect(Collectors.toList());
    }
}
