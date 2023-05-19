package com.freeuni.daskalos.service.teacher;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.repository.TeacherRepository;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.service.experience.ExperienceServiceImpl;
import com.freeuni.daskalos.service.rating.RatingServiceImpl;
import com.freeuni.daskalos.service.subject.SubjectServiceImpl;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import com.freeuni.daskalos.utils.exceptions.UserNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeacherServiceImpl {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private SubjectServiceImpl subjectService;
    @Autowired
    private RatingServiceImpl ratingService;
    @Autowired
    private ExperienceServiceImpl experienceService;

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

    public ExperienceDTO addExperience(Long teacherID, ExperienceDTO experience) {
        return experienceService.addTeacherExperience(teacherID, experience);
    }

    public void removeExperience(ExperienceDTO experience) {
        experienceService.removeTeacherExperience(experience);
    }

    public TeacherRatingDTO addRating(Long teacherID, TeacherRatingDTO teacherRating) {
        return ratingService.addTeacherRating(teacherID, teacherRating);
    }

    public void removeRating(TeacherRatingDTO teacherRating) {
        ratingService.removeTeacherRating(teacherRating);
    }

    public SubjectDTO addSubject(Long teacherID, SubjectDTO subject) {
        return subjectService.addTeacherSubject(teacherID, subject);
    }

    public void removeSubject(Long teacherID, SubjectDTO subject) {
        subjectService.deleteTeacherSubject(teacherID, subject);
    }
}
