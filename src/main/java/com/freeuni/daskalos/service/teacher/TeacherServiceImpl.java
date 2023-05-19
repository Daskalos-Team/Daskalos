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
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private SubjectService subjectService;
    @Autowired
    private RatingService ratingService;
    @Autowired
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
    public ExperienceDTO addExperience(Long teacherID, ExperienceDTO experience) {
        return experienceService.addTeacherExperience(teacherID, experience);
    }

    @Override
    public void removeExperience(ExperienceDTO experience) {
        experienceService.removeTeacherExperience(experience);
    }

    @Override
    public TeacherRatingDTO addRating(Long teacherID, TeacherRatingDTO teacherRating) {
        return ratingService.addTeacherRating(teacherID, teacherRating);
    }

    @Override
    public void removeRating(TeacherRatingDTO teacherRating) {
        ratingService.removeTeacherRating(teacherRating);
    }

    @Override
    public SubjectDTO addSubject(Long teacherID, SubjectDTO subject) {
        return subjectService.addTeacherSubject(teacherID, subject);
    }

    @Override
    public void removeSubject(Long teacherID, SubjectDTO subject) {
        subjectService.deleteTeacherSubject(teacherID, subject);
    }
}
