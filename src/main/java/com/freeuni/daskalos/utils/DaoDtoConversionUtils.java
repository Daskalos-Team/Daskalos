package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.entities.*;

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
}
