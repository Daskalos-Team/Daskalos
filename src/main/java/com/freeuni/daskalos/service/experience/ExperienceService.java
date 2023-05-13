package com.freeuni.daskalos.service.experience;

import com.freeuni.daskalos.dto.ExperienceDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExperienceService {

    public List<ExperienceDTO> getTeachersExperience(Long teacherID);

    public void removeTeacherExperience(ExperienceDTO experience);

    public void addTeacherExperience(Long teacherID, ExperienceDTO experience);
}
