package com.freeuni.daskalos.service.teacher;

import com.freeuni.daskalos.dto.TeacherDTO;

public interface TeacherService {

    public TeacherDTO getTeacher(Long id);

    public TeacherDTO updateTeacher(TeacherDTO teacherDTO);

}
