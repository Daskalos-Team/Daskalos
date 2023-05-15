package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.*;
import com.freeuni.daskalos.repository.entities.*;

import java.util.List;

public class DaoDtoConversionUtils {

    public static User toUserEntity(UserDTO userDTO) {
        return userDTO.getUserType().equals(UserType.TEACHER.name()) ?
                new Teacher(userDTO.getEmail(), userDTO.getPassword(), userDTO.getName(), userDTO.getSurname(), UserType.fromName(userDTO.getUserType()))
                :
                new Student(userDTO.getEmail(), userDTO.getPassword(), userDTO.getName(), userDTO.getSurname(), UserType.fromName(userDTO.getUserType()));
    }

    public static UserDTO toUserDao(User userEntity) {
        return new UserDTO(userEntity.getEmail(), userEntity.getPassword(), userEntity.getName(), userEntity.getSurname(), userEntity.getUserType().name());
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
                build();
    }

    public static TeacherRating toTeacherRating(TeacherRatingDTO teacherRating) {
        return TeacherRating.builder().
                ID(teacherRating.getID()).
                studentID(teacherRating.getStudentID()).
                studentComment(teacherRating.getStudentComment()).
                rating(teacherRating.getRating()).
                build();
    }

    public static SubjectDTO toSubjectDTO(Subject subject) {
        return SubjectDTO.builder().
                ID(subject.getID()).
                name(subject.getName()).
                build();
    }

    public static Subject toSubject(SubjectDTO subjectDTO) {
        return new Subject(subjectDTO.getID(),
                subjectDTO.getName());
    }

    public static Teacher toTeacher(TeacherDTO teacherDTO) {
        return new Teacher(teacherDTO.getID(),
                teacherDTO.getName(),
                teacherDTO.getSurname(),
                teacherDTO.getPassword(),
                teacherDTO.getEmail(),
                teacherDTO.getUserType(),
                teacherDTO.getPhoneNumber(),
                teacherDTO.getAddress(),
                teacherDTO.isOnPlace(),
                teacherDTO.getPriceMin(),
                teacherDTO.getPriceMax());
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
                address(teacher.getAddress()).
                isOnPlace(teacher.isOnPlace()).
                priceMin(teacher.getPriceMin()).
                priceMax(teacher.getPriceMax()).
                teachersExperience(experience).
                teacherRatings(ratings).
                teacherSubjects(subjects).
                build();
    }

}
