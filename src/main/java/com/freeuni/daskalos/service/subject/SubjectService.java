package com.freeuni.daskalos.service.subject;

import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.repository.SubjectRepository;
import com.freeuni.daskalos.repository.UserToSubjectRepository;
import com.freeuni.daskalos.repository.entities.Subject;
import com.freeuni.daskalos.repository.entities.UserToSubject;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserToSubjectRepository userToSubjectRepository;

    public List<SubjectDTO> getUserSubjects(Long userID) {
        List<UserToSubject> userToSubjects = userToSubjectRepository.findAllByUserID(userID);
        List<Subject> userSubjects = subjectRepository.findAllById(userToSubjects.stream().map(UserToSubject::getSubjectID).collect(Collectors.toList()));
        return userSubjects.
                stream().
                map(DaoDtoConversionUtils::toSubjectDTO).
                toList();
    }

    public void deleteUserSubject(Long userID, SubjectDTO subject) {
        subjectRepository.deleteById(subject.getID());
        userToSubjectRepository.deleteBySubjectIDAndUserID(userID, subject.getID());
    }

    public void clearUserSubjects(Long userID) {
        List<UserToSubject> all = userToSubjectRepository.findAllByUserID(userID);
        for (UserToSubject userToSubject : all) {
            subjectRepository.deleteById(userToSubject.getSubjectID());
            userToSubjectRepository.deleteBySubjectIDAndUserID(userID, userToSubject.getSubjectID());
        }
    }

    public SubjectDTO addUserSubject(Long userID, SubjectDTO subject) {
        Subject addedSubject = subjectRepository.save(DaoDtoConversionUtils.toSubject(subject));
        UserToSubject teacherToSubject = new UserToSubject().
                toBuilder().
                userID(userID).
                subjectID(addedSubject.getID()).
                build();
        userToSubjectRepository.save(teacherToSubject);
        return DaoDtoConversionUtils.toSubjectDTO(addedSubject);
    }
}
