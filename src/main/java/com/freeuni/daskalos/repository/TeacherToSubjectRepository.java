package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.TeacherToSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherToSubjectRepository extends JpaRepository<TeacherToSubject, Long> {

    public List<TeacherToSubject> findAllByTeacherID(Long teacherID);

}
