package com.freeuni.daskalos.service.experience;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.repository.ExperienceRepository;
import com.freeuni.daskalos.repository.TeacherToExperienceRepository;
import com.freeuni.daskalos.repository.entities.Experience;
import com.freeuni.daskalos.repository.entities.TeacherToExperience;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ExperienceServiceImpl implements ExperienceService {

    private ExperienceRepository experienceRepository;

    private TeacherToExperienceRepository teacherToExperienceRepository;

    @Override
    public List<ExperienceDTO> getTeachersExperience(Long teacherID) {
        List<TeacherToExperience> teacherToExperienceList = teacherToExperienceRepository.findAllByTeacherID(teacherID);
        List<Experience> teachersExperience = experienceRepository.findAllById(teacherToExperienceList.stream().map(TeacherToExperience::getExperienceID).toList());
        return teachersExperience.
                stream().
                map(DaoDtoConversionUtils::toExperienceDTO).
                toList();
    }

    @Override
    public void removeTeacherExperience(ExperienceDTO experience) {
        experienceRepository.delete(DaoDtoConversionUtils.toExperience(experience));
        teacherToExperienceRepository.deleteByExperienceID(experience.getID());
    }

    @Override
    public void addTeacherExperience(Long teacherID, ExperienceDTO experience) {
        Experience addedExperience = experienceRepository.save(DaoDtoConversionUtils.toExperience(experience));
        TeacherToExperience teacherToExperience = new TeacherToExperience()
                .toBuilder()
                .experienceID(addedExperience.getID())
                .teacherID(teacherID)
                .build();
        teacherToExperienceRepository.save(teacherToExperience);
    }
}
