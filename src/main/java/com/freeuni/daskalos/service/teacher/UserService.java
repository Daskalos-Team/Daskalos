package com.freeuni.daskalos.service.teacher;

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
import com.freeuni.daskalos.utils.exceptions.UserNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.OptionalInt;
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
                        phoneNumber(teacherDTO.getPhoneNumber() != null ? teacherDTO.getPhoneNumber() : existingData.getPhoneNumber()).
                        address(teacherDTO.getAddress() != null ? teacherDTO.getAddress() : existingData.getAddress()).
                        isOnPlace(teacherDTO.getIsOnPlace() != null ? teacherDTO.getIsOnPlace() : existingData.getIsOnPlace()).
                        build());
        teacherRepository.save(updatedTeacherData);
    }

    public void updateStudent(StudentDTO studentDTO) {
        StudentDTO existingData = getStudentDTO(studentDTO.getID());
        Student updatedStudentData = DaoDtoConversionUtils.toStudent(
                StudentDTO.builder().
                        ID(studentDTO.getID()).
                        phoneNumber(studentDTO.getPhoneNumber() != null ? studentDTO.getPhoneNumber() : existingData.getPhoneNumber()).
                        userAddress(studentDTO.getUserAddress() != null ? studentDTO.getUserAddress() : existingData.getUserAddress()).
                        onPlace(studentDTO.getOnPlace() != null ? studentDTO.getOnPlace() : existingData.getOnPlace()).
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

    public List<SubjectDTO> updateTeacherSubjectSchedule(List<SubjectDTO> subjectDTOs) {
        return subjectDTOs.stream().map(subjectDTO -> subjectService.updateSubject(subjectDTO)).collect(Collectors.toList());
    }

    public void removeSubject(Long userID, SubjectDTO subject) {
        subjectService.deleteUserSubject(userID, subject);
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

    public Map.Entry<Integer, Integer> getTeacherMinMaxPrice(Long teacherID) {
        List<SubjectDTO> teacherSubjects = subjectService.getUserSubjects(teacherID);
        OptionalInt minPrice = teacherSubjects.stream().mapToInt(SubjectDTO::getPrice).min();
        OptionalInt maxPrice = teacherSubjects.stream().mapToInt(SubjectDTO::getPrice).max();
        return Map.entry(minPrice.getAsInt(), maxPrice.getAsInt());
    }
}
