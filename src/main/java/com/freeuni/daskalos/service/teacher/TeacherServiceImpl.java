package com.freeuni.daskalos.service.teacher;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.repository.*;
import com.freeuni.daskalos.repository.entities.Experience;
import com.freeuni.daskalos.repository.entities.Teacher;
import com.freeuni.daskalos.repository.entities.TeacherToExperience;
import com.freeuni.daskalos.service.experience.ExperienceService;
import com.freeuni.daskalos.service.rating.RatingService;
import com.freeuni.daskalos.service.subject.SubjectService;
import com.freeuni.daskalos.utils.exceptions.UserNotExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private TeacherRepository teacherRepository;

    private SubjectService subjectService;

    private RatingService ratingService;

    private ExperienceService experienceService;

    @Override
    public TeacherDTO getTeacher(Long ID) throws UserNotExistException {
        Optional<Teacher> teacher = teacherRepository.findById(ID);
        if (teacher.isPresent()) {
            Teacher t = teacher.get();

            return new TeacherDTO(t.getID(),
                    t.getName(),
                    t.getSurname(),
                    t.getPassword(),
                    t.getEmail(),
                    t.getUserType(),
                    t.getPhoneNumber(),
                    t.getAddress(),
                    t.getPriceMin(),
                    t.getPriceMax(),
                    experienceService.getTeachersExperience(ID),
                    ratingService.getTeacherRating(ID),
                    subjectService.getTeachersSubjects(ID));
        } else {
            throw new UserNotExistException("User with ID was not found");
        }
    }

    @Override
    public TeacherDTO updateTeacher(TeacherDTO teacherDTO) {
        return new TeacherDTO();
    }
}
