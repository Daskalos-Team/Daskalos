package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.TeacherRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRatingRepository extends JpaRepository<TeacherRating, Long> {

}
