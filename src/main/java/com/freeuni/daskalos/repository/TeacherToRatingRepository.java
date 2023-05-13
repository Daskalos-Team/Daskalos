package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.TeacherToRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherToRatingRepository extends JpaRepository<TeacherToRating, Long> {
    public List<TeacherToRating> findAllByTeacherID(Long teacherID);
}
