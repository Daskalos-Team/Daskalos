package com.freeuni.daskalos.service.subject;

import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.repository.SubjectRepository;
import com.freeuni.daskalos.repository.TeacherToSubjectRepository;
import com.freeuni.daskalos.repository.entities.Subject;
import com.freeuni.daskalos.repository.entities.TeacherToSubject;
import com.freeuni.daskalos.utils.EntityToDtoUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SubjectServiceImpl implements SubjectService {

    private SubjectRepository subjectRepository;

    private TeacherToSubjectRepository teacherToSubjectRepository;

    @Override
    public List<SubjectDTO> getTeachersSubjects(Long teacherID) {
        List<TeacherToSubject> teacherToSubjects = teacherToSubjectRepository.findAllByTeacherID(teacherID);
        List<Subject> teachersSubjects = subjectRepository.findAllById(teacherToSubjects.stream().map(TeacherToSubject::getSubjectID).collect(Collectors.toList()));
        return teachersSubjects.
                stream().
                map(EntityToDtoUtils::toSubjectDTO).
                toList();
    }

    @Override
    public boolean deleteTeacherSubject(Long teacherID, SubjectDTO subject) {
        // TO DO
        return false;
    }

    @Override
    public SubjectDTO addTeacherSubject(Long teacherID, SubjectDTO subject) {
        // TO DO
        return null;
    }
}
