package com.freeuni.daskalos.repository.entities.student;

import com.freeuni.daskalos.repository.entities.teacher.Teacher;

import java.util.List;

public interface Student {

    List<Teacher> getStudentFavourites();

}
