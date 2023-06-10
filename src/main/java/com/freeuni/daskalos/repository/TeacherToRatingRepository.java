package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.TeacherToRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherToRatingRepository extends JpaRepository<TeacherToRating, Long> {

    List<TeacherToRating> findAllByTeacherID(Long teacherID);

    void deleteByRatingID(Long teacherRatingID);
}
