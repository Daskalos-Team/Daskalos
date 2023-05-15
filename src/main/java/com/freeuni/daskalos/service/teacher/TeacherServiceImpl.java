package com.freeuni.daskalos.service.teacher;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.repository.TeacherRepository;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.service.experience.ExperienceService;
import com.freeuni.daskalos.service.rating.RatingService;
import com.freeuni.daskalos.service.subject.SubjectService;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import com.freeuni.daskalos.utils.exceptions.UserNotExistException;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private TeacherRepository teacherRepository;

    private SubjectService subjectService;

    private RatingService ratingService;

    private ExperienceService experienceService;

    @Override
    public TeacherDTO getTeacherDTO(Long ID) throws UserNotExistException {
        Optional<Teacher> teacherOptional = teacherRepository.findById(ID);
        if (teacherOptional.isPresent()) {
            Teacher teacher = teacherOptional.get();
            return DaoDtoConversionUtils.toTeacherDTO(teacher,
                    experienceService.getTeachersExperience(ID),
                    ratingService.getTeacherRating(ID),
                    subjectService.getTeachersSubjects(ID));
        } else {
            throw new UserNotExistException("User with ID was not found");
        }
    }

    @Override
    public void updateTeacher(TeacherDTO teacherDTO) {
        Teacher updatedTeacherData = DaoDtoConversionUtils.toTeacher(
                TeacherDTO.builder().
                        ID(teacherDTO.getID()).
                        name(teacherDTO.getName()).
                        surname(teacherDTO.getSurname()).
                        password(teacherDTO.getPassword()).
                        email(teacherDTO.getEmail()).
                        userType(teacherDTO.getUserType()).
                        phoneNumber(teacherDTO.getPhoneNumber()).
                        address(teacherDTO.getAddress()).
                        isOnPlace(teacherDTO.isOnPlace()).
                        priceMin(teacherDTO.getPriceMin()).
                        priceMax(teacherDTO.getPriceMax()).
                        build());
        teacherRepository.save(updatedTeacherData);
    }

    @Override
    public void addExperience(Long teacherID, ExperienceDTO experience) {
        experienceService.addTeacherExperience(teacherID, experience);
    }

    @Override
    public void removeExperience(ExperienceDTO experience) {
        experienceService.removeTeacherExperience(experience);
    }

    @Override
    public void addRating(Long teacherID, TeacherRatingDTO teacherRating) {
        ratingService.addTeacherRating(teacherID, teacherRating);
    }

    @Override
    public void removeRating(TeacherRatingDTO teacherRating) {
        ratingService.removeTeacherRating(teacherRating);
    }

    @Override
    public void addSubject(Long teacherID, SubjectDTO subject) {
        subjectService.addTeacherSubject(teacherID, subject);
    }

    @Override
    public void removeSubject(Long teacherID, SubjectDTO subject) {
        subjectService.deleteTeacherSubject(teacherID, subject);
    }
}
