package com.freeuni.daskalos.service.teacher;

import com.freeuni.daskalos.dto.TeacherDTO;
import org.springframework.stereotype.Service;

@Service
public interface TeacherService {

    public TeacherDTO getTeacher(Long id);

    public TeacherDTO updateTeacher(TeacherDTO teacherDTO);

}
