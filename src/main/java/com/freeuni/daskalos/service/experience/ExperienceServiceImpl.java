package com.freeuni.daskalos.service.experience;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.repository.ExperienceRepository;
import com.freeuni.daskalos.repository.TeacherToExperienceRepository;
import com.freeuni.daskalos.repository.entities.Experience;
import com.freeuni.daskalos.repository.entities.TeacherToExperience;
import com.freeuni.daskalos.utils.EntityToDtoUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ExperienceServiceImpl implements ExperienceService {

    private ExperienceRepository experienceRepository;

    private TeacherToExperienceRepository teacherToExperienceRepository;

    @Override
    public List<ExperienceDTO> getTeachersExperience(Long teacherID) {
        List<TeacherToExperience> teacherToExperienceList = teacherToExperienceRepository.findAllByTeacherID(teacherID);
        List<Experience> teachersExperience = experienceRepository.findAllById(teacherToExperienceList.stream().map(TeacherToExperience::getExperienceID).toList());
        return teachersExperience.
                stream().
                map(EntityToDtoUtils::toExperienceDTO).
                toList();
    }

    @Override
    public boolean removeTeacherExperience(Long teacherID, ExperienceDTO experience) {
        // TO DO
        return false;
    }

    @Override
    public ExperienceDTO addTeacherExperience(Long teacherID, ExperienceDTO experience) {
        // TO DO
        return null;
    }
}
