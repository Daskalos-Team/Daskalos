package com.freeuni.daskalos.service.teacher;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import org.springframework.stereotype.Service;

@Service
public interface TeacherService {

    public TeacherDTO getTeacherDTO(Long id);

    public void updateTeacher(TeacherDTO teacherDTO);

    public ExperienceDTO addExperience(Long teacherID, ExperienceDTO experience);

    public void removeExperience(ExperienceDTO experience);

    public TeacherRatingDTO addRating(Long teacherID, TeacherRatingDTO teacherRating);

    public void removeRating(TeacherRatingDTO teacherRating);

    public SubjectDTO addSubject(Long teacherID, SubjectDTO subject);

    public void removeSubject(Long teacherID, SubjectDTO subject);
}