package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.*;
import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.repository.entities.*;

import java.util.List;
import java.util.stream.Collectors;

public class DaoDtoConversionUtils {

    // TODO fix correct address
    public static User toUserEntity(UserDTO userDTO) {
        return userDTO.getUserType().equals(UserType.TEACHER.name()) ?
                new Teacher(userDTO.getEmail(), userDTO.getPassword(), userDTO.getName(), userDTO.getSurname(), userDTO.getAddress(),
                        UserType.valueOf(userDTO.getUserType()), Boolean.FALSE, null, null, null, null, null, null)
                :
                new Student(userDTO.getEmail(), userDTO.getPassword(), userDTO.getName(), userDTO.getSurname(), userDTO.getAddress(),
                        UserType.valueOf(userDTO.getUserType()), Boolean.FALSE, null, null, null, null, null, null);
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

    public static SubjectScheduleDTO toSubjectScheduleDTO(SubjectSchedule schedule) {
        return SubjectScheduleDTO.builder().
                ID(schedule.getID()).
                start(schedule.getStart()).
                end(schedule.getEnd()).
                build();
    }

    public static SubjectSchedule toSubjectSchedule(SubjectScheduleDTO scheduleDTO) {
        return SubjectSchedule.builder().
                ID(scheduleDTO.getID()).
                start(scheduleDTO.getStart()).
                end(scheduleDTO.getEnd()).
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
                title(teacherRating.getTitle()).
                studentComment(teacherRating.getStudentComment()).
                rating(teacherRating.getRating()).
                addDate(teacherRating.getAddDate()).
                build();
    }

    public static TeacherRating toTeacherRating(TeacherRatingDTO teacherRating) {
        return TeacherRating.builder().
                ID(teacherRating.getID()).
                studentID(teacherRating.getStudentID()).
                title(teacherRating.getTitle()).
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
                days(subject.getDays().stream().map(DaoDtoConversionUtils::toSubjectScheduleDTO).collect(Collectors.toList())).
                build();
    }

    public static Subject toSubject(SubjectDTO subjectDTO) {
        return new Subject(subjectDTO.getID(),
                subjectDTO.getName(),
                subjectDTO.getDescription(),
                subjectDTO.getPrice(),
                subjectDTO.getDays().stream().map(DaoDtoConversionUtils::toSubjectSchedule).collect(Collectors.toList()));
    }

    public static UserAddressDTO toUserAddressDTO(UserAddress userAddress) {
        return new UserAddressDTO(userAddress.getFullAddress(), userAddress.getLatitude(), userAddress.getLongitude());
    }

    public static UserAddress toUserAddress(UserAddressDTO userAddressDTO) {
        return new UserAddress(userAddressDTO.getFullAddress(), userAddressDTO.getLatitude(), userAddressDTO.getLongitude());
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
                teacherDTO.getOnPlace(),
                teacherDTO.getTitle(),
                teacherDTO.getDescription(),
                teacherDTO.getFbUrl(),
                teacherDTO.getTwitterUrl(),
                teacherDTO.getInstaUrl(),
                teacherDTO.getLinkedinUrl(),
                teacherDTO.getProfileImage(),
                teacherDTO.getTeachersExperience().stream().map(DaoDtoConversionUtils::toExperience).collect(Collectors.toList()));
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
                onPlace(teacher.getOnPlace()).
                teacherRatings(ratings).
                teacherSubjects(subjects).
                title(teacher.getTitle()).
                description(teacher.getDescription()).
                fbUrl(teacher.getFbUrl()).
                twitterUrl(teacher.getTwitterUrl()).
                instaUrl(teacher.getInstaUrl()).
                linkedinUrl(teacher.getLinkedinUrl()).
                profileImage(teacher.getProfileImage()).
                teachersExperience(teacher.getTeachersExperience() != null ? teacher.getTeachersExperience().stream().map(DaoDtoConversionUtils::toExperienceDTO).collect(Collectors.toList()) : experience).
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
                title(student.getTitle()).
                description(student.getDescription()).
                fbUrl(student.getFbUrl()).
                twitterUrl(student.getTwitterUrl()).
                instaUrl(student.getInstaUrl()).
                linkedinUrl(student.getLinkedinUrl()).
                profileImage(student.getProfileImage()).
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
                studentDTO.getOnPlace(),
                studentDTO.getTitle(),
                studentDTO.getDescription(),
                studentDTO.getFbUrl(),
                studentDTO.getTwitterUrl(),
                studentDTO.getInstaUrl(),
                studentDTO.getLinkedinUrl(),
                studentDTO.getProfileImage());
    }
}
