package com.freeuni.daskalos.service.subject;

import com.freeuni.daskalos.dto.SubjectDTO;

import java.util.List;

public interface SubjectService {

    public List<SubjectDTO> getTeachersSubjects(Long teacherID);

    public boolean deleteTeacherSubject(Long teacherID, SubjectDTO subject);

    public SubjectDTO addTeacherSubject(Long teacherID, SubjectDTO subject);
}
