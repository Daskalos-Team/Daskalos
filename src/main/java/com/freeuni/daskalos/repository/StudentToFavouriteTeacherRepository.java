package com.freeuni.daskalos.repository;

import com.freeuni.daskalos.repository.entities.StudentToFavouriteTeacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentToFavouriteTeacherRepository extends JpaRepository<StudentToFavouriteTeacher, Long> {

    List<Long> getStudentFavouriteTeacherByStudentID(Long studentID);

    void deleteByStudentIDAndTeacherID(Long studentID, Long teacherID);
}
