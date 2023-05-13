package com.freeuni.daskalos.service.subject;

import com.freeuni.daskalos.dto.SubjectDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SubjectService {

    public List<SubjectDTO> getTeachersSubjects(Long teacherID);

    public void deleteTeacherSubject(Long teacherID, SubjectDTO subject);

    public void addTeacherSubject(Long teacherID, SubjectDTO subject);
}
