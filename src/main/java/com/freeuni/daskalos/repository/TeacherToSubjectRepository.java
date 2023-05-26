package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.TeacherToSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherToSubjectRepository extends JpaRepository<TeacherToSubject, Long> {

    public List<TeacherToSubject> findAllByTeacherID(Long teacherID);

    public void deleteBySubjectIDAndTeacherID(Long teacherID, Long subjectID);
}