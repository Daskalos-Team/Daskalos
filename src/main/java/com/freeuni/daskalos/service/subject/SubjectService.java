package com.freeuni.daskalos.service.subject;

import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.SubjectScheduleDTO;
import com.freeuni.daskalos.repository.SubjectRepository;
import com.freeuni.daskalos.repository.SubjectScheduleRepository;
import com.freeuni.daskalos.repository.UserToSubjectRepository;
import com.freeuni.daskalos.repository.entities.Subject;
import com.freeuni.daskalos.repository.entities.SubjectSchedule;
import com.freeuni.daskalos.repository.entities.UserToSubject;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserToSubjectRepository userToSubjectRepository;

    @Autowired
    private SubjectScheduleRepository subjectScheduleRepository;

    public List<SubjectDTO> getUserSubjects(Long userID) {
        List<UserToSubject> userToSubjects = userToSubjectRepository.findAllByUserID(userID);
        List<Subject> userSubjects = subjectRepository.findAllById(userToSubjects.stream().map(UserToSubject::getSubjectID).collect(Collectors.toList()));
        return userSubjects.
                stream().
                map(subject -> DaoDtoConversionUtils.toSubjectDTO(subject, getSubjectScheduleDTO(subject.getID()))).
                collect(Collectors.toList());
    }

    public void deleteUserSubject(Long userID, SubjectDTO subject) {
        subjectRepository.deleteById(subject.getID());
        userToSubjectRepository.deleteBySubjectIDAndUserID(userID, subject.getID());
    }

    public SubjectDTO addUserSubject(Long userID, SubjectDTO subject) {
        Subject addedSubject = subjectRepository.save(DaoDtoConversionUtils.toSubject(subject));
        UserToSubject teacherToSubject = new UserToSubject().
                toBuilder().
                userID(userID).
                subjectID(addedSubject.getID()).
                build();
        userToSubjectRepository.save(teacherToSubject);
        return DaoDtoConversionUtils.toSubjectDTO(addedSubject, new ArrayList<>());
    }

    public SubjectDTO updateSubject(SubjectDTO subject) {
        subjectScheduleRepository.removeAllBySubjectID(subject.getID());
        List<SubjectScheduleDTO> subjectScheduleDTOList = new ArrayList<>();
        for (SubjectScheduleDTO subjectSchedule : subject.getSubjectSchedule()) {
            SubjectSchedule subSchedule = subjectScheduleRepository.save(DaoDtoConversionUtils.toSubjectSchedule(subjectSchedule));
            subjectScheduleDTOList.add(DaoDtoConversionUtils.toSubjectScheduleDTO(subSchedule));
        }
        subject.setSubjectSchedule(subjectScheduleDTOList);
        return subject;
    }

    private List<SubjectScheduleDTO> getSubjectScheduleDTO(Long subjectID) {
        return DaoDtoConversionUtils.toSubjectScheduleDTOList(subjectScheduleRepository.findSubjectScheduleBySubjectID(subjectID));
    }
}