package com.freeuni.daskalos.service.experience;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.repository.ExperienceRepository;
import com.freeuni.daskalos.repository.TeacherToExperienceRepository;
import com.freeuni.daskalos.repository.entities.Experience;
import com.freeuni.daskalos.repository.entities.TeacherToExperience;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private TeacherToExperienceRepository teacherToExperienceRepository;

    public List<ExperienceDTO> getTeachersExperience(Long teacherID) {
        List<TeacherToExperience> teacherToExperienceList = teacherToExperienceRepository.findAllByTeacherID(teacherID);
        List<Experience> teachersExperience = experienceRepository.findAllById(teacherToExperienceList.stream().map(TeacherToExperience::getExperienceID).toList());
        teachersExperience.sort(Comparator.comparing(Experience::getStartDate).reversed());

        return teachersExperience.
                stream().
                map(DaoDtoConversionUtils::toExperienceDTO).
                toList();
    }

    public void removeTeacherExperience(ExperienceDTO experience) {
        experienceRepository.delete(DaoDtoConversionUtils.toExperience(experience));
        teacherToExperienceRepository.deleteByExperienceID(experience.getID());
    }

    public ExperienceDTO addTeacherExperience(Long teacherID, ExperienceDTO experience) {
        Experience addedExperience = experienceRepository.save(DaoDtoConversionUtils.toExperience(experience));
        TeacherToExperience teacherToExperience = new TeacherToExperience()
                .toBuilder()
                .experienceID(addedExperience.getID())
                .teacherID(teacherID)
                .build();
        teacherToExperienceRepository.save(teacherToExperience);
        return DaoDtoConversionUtils.toExperienceDTO(addedExperience);
    }
}
