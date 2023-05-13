package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.TeacherToExperience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherToExperienceRepository extends JpaRepository<TeacherToExperience, Long> {
    public List<TeacherToExperience> findAllByTeacherID(Long teacherID);
}
