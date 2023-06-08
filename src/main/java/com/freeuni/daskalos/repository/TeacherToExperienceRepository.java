package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.TeacherToExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherToExperienceRepository extends JpaRepository<TeacherToExperience, Long> {

    List<TeacherToExperience> findAllByTeacherID(Long teacherID);

    void deleteByExperienceID(Long experienceID);
}
