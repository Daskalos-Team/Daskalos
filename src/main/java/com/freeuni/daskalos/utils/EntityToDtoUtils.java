package com.freeuni.daskalos.utils;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.repository.entities.Experience;
import com.freeuni.daskalos.repository.entities.Subject;
import com.freeuni.daskalos.repository.entities.TeacherRating;

public class EntityToDtoUtils {

    public static ExperienceDTO toExperienceDTO(Experience experience) {
        return new ExperienceDTO(experience.getID(),
                experience.getEmployer(),
                experience.getJobDescription(),
                experience.getStartDate(),
                experience.getEndDate());
    }

    public static SubjectDTO toSubjectDTO(Subject subject) {
        return new SubjectDTO(subject.getID(),
                subject.getName());
    }

    public static TeacherRatingDTO toTeacherRatingDTO(TeacherRating teacherRating) {
        return new TeacherRatingDTO(teacherRating.getID(),
                teacherRating.getStudentID(),
                teacherRating.getStudentComment(),
                teacherRating.getRating());
    }
}
