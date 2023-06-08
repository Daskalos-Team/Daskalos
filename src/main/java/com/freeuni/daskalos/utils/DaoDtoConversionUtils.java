package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.*;
import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.repository.entities.*;

import java.util.List;

public class DaoDtoConversionUtils {

    public static User toUserEntity(UserDTO userDTO) {
        return userDTO.getUserType().equals(UserType.TEACHER.name()) ?
                new Teacher(userDTO.getEmail(), userDTO.getPassword(), userDTO.getName(), userDTO.getSurname(), userDTO.getAddress(), UserType.fromName(userDTO.getUserType()), false)
                :
                new Student(userDTO.getEmail(), userDTO.getPassword(), userDTO.getName(), userDTO.getSurname(), userDTO.getAddress(), UserType.fromName(userDTO.getUserType()), false);
    }

    public static UserDTO toUserDTO(User userEntity) {
        return new UserDTO(userEntity.getEmail(), userEntity.getPassword(), userEntity.getName(), userEntity.getSurname(), userEntity.getAddress(), userEntity.getUserType().name());
    }

    public static ExperienceDTO toExperienceDTO(Experience experience) {
        return ExperienceDTO.builder().
                ID(experience.getID()).
                employer(experience.getEmployer()).
                jobDescription(experience.getJobDescription()).
                startDate(experience.getStartDate()).
                endDate(experience.getEndDate()).
                build();
    }

    public static Experience toExperience(ExperienceDTO experience) {
        return Experience.builder().
                ID(experience.getID()).
                employer(experience.getEmployer()).
                jobDescription(experience.getJobDescription()).
                startDate(experience.getStartDate()).
                endDate(experience.getEndDate()).
                build();
    }

    public static TeacherRatingDTO toTeacherRatingDTO(TeacherRating teacherRating) {
        return TeacherRatingDTO.builder().
                ID(teacherRating.getID()).
                studentID(teacherRating.getStudentID()).
                studentComment(teacherRating.getStudentComment()).
                rating(teacherRating.getRating()).
                addDate(teacherRating.getAddDate()).
                build();
    }

    public static TeacherRating toTeacherRating(TeacherRatingDTO teacherRating) {
        return TeacherRating.builder().
                ID(teacherRating.getID()).
                studentID(teacherRating.getStudentID()).
                studentComment(teacherRating.getStudentComment()).
                rating(teacherRating.getRating()).
                addDate(teacherRating.getAddDate()).
                build();
    }

    public static SubjectDTO toSubjectDTO(Subject subject) {
        return SubjectDTO.builder().
                ID(subject.getID()).
                name(subject.getName()).
                description(subject.getDescription()).
                price(subject.getPrice()).
                build();
    }

    public static Subject toSubject(SubjectDTO subjectDTO) {
        return new Subject(subjectDTO.getID(),
                subjectDTO.getName(), subjectDTO.getDescription(), subjectDTO.getPrice());
    }

    public static UserAddressDTO toUserAddressDTO(UserAddress userAddress) {
        UserAddressDTO userAddressDTO = new UserAddressDTO(userAddress.getLatitude(), userAddress.getLongitude());
        userAddressDTO.setCountry(userAddress.getCountry());
        userAddressDTO.setCity(userAddress.getCity());
        return userAddressDTO;
    }

    public static UserAddress toUserAddress(UserAddressDTO userAddressDTO) {
        UserAddress userAddress = new UserAddress(userAddressDTO.getLatitude(), userAddressDTO.getLongitude());
        userAddress.setCity(userAddressDTO.getCity());
        userAddress.setCountry(userAddressDTO.getCountry());
        return userAddress;
    }

    public static Teacher toTeacher(TeacherDTO teacherDTO) {
        return new Teacher(teacherDTO.getID(),
                teacherDTO.getName(),
                teacherDTO.getSurname(),
                teacherDTO.getPassword(),
                teacherDTO.getEmail(),
                teacherDTO.getUserType(),
                teacherDTO.getPhoneNumber(),
                toUserAddress(teacherDTO.getAddress()),
                teacherDTO.getIsOnPlace());
    }

    public static TeacherDTO toTeacherDTO(Teacher teacher, List<ExperienceDTO> experience, List<TeacherRatingDTO> ratings, List<SubjectDTO> subjects) {
        return TeacherDTO.builder().
                ID(teacher.getID()).
                name(teacher.getName()).
                surname(teacher.getSurname()).
                password(teacher.getPassword()).
                email(teacher.getEmail()).
                userType(teacher.getUserType()).
                phoneNumber(teacher.getPhoneNumber()).
                address(toUserAddressDTO(teacher.getAddress())).
                isOnPlace(teacher.getOnPlace()).
                teachersExperience(experience).
                teacherRatings(ratings).
                teacherSubjects(subjects).
                build();
    }

    public static StudentDTO toStudentDTO(Student student, List<SubjectDTO> studentSubjects, List<TeacherDTO> studentFavouriteTeachers) {
        return StudentDTO.builder().
                ID(student.getID()).
                name(student.getName()).
                surname(student.getSurname()).
                password(student.getPassword()).
                email(student.getEmail()).
                userType(student.getUserType()).
                userAddress(toUserAddressDTO(student.getAddress())).
                phoneNumber(student.getPhoneNumber()).
                studentSubjects(studentSubjects).
                studentFavouriteTeachers(studentFavouriteTeachers).
                onPlace(student.getOnPlace()).
                build();
    }

    public static Student toStudent(StudentDTO studentDTO) {
        return new Student(studentDTO.getID(),
                studentDTO.getName(),
                studentDTO.getSurname(),
                studentDTO.getPassword(),
                studentDTO.getEmail(),
                studentDTO.getUserType(),
                studentDTO.getPhoneNumber(),
                toUserAddress(studentDTO.getUserAddress()),
                studentDTO.getOnPlace());
    }
}
