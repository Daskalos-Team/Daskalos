package com.freeuni.daskalos.service.experience;

import com.freeuni.daskalos.dto.ExperienceDTO;

import java.util.List;

public interface ExperienceService {

    public List<ExperienceDTO> getTeachersExperience(Long teacherID);

    public boolean removeTeacherExperience(Long teacherID, ExperienceDTO experience);

    public ExperienceDTO addTeacherExperience(Long teacherID, ExperienceDTO experience);

}
