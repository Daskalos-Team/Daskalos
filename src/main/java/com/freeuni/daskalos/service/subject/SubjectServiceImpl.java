package com.freeuni.daskalos.service.subject;

import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.repository.SubjectRepository;
import com.freeuni.daskalos.repository.TeacherToSubjectRepository;
import com.freeuni.daskalos.repository.entities.Subject;
import com.freeuni.daskalos.repository.entities.TeacherToSubject;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl {

    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private TeacherToSubjectRepository teacherToSubjectRepository;

    public List<SubjectDTO> getTeachersSubjects(Long teacherID) {
        List<TeacherToSubject> teacherToSubjects = teacherToSubjectRepository.findAllByTeacherID(teacherID);
        List<Subject> teachersSubjects = subjectRepository.findAllById(teacherToSubjects.stream().map(TeacherToSubject::getSubjectID).collect(Collectors.toList()));
        return teachersSubjects.
                stream().
                map(DaoDtoConversionUtils::toSubjectDTO).
                toList();
    }

    public void deleteTeacherSubject(Long teacherID, SubjectDTO subject) {
        subjectRepository.deleteById(subject.getID());
        teacherToSubjectRepository.deleteBySubjectIDAndTeacherID(teacherID, subject.getID());
    }

    public SubjectDTO addTeacherSubject(Long teacherID, SubjectDTO subject) {
        Subject addedSubject = subjectRepository.save(DaoDtoConversionUtils.toSubject(subject));
        TeacherToSubject teacherToSubject = new TeacherToSubject().
                toBuilder().
                teacherID(teacherID).
                subjectID(addedSubject.getID()).
                build();
        teacherToSubjectRepository.save(teacherToSubject);
        return DaoDtoConversionUtils.toSubjectDTO(addedSubject);
    }
}
