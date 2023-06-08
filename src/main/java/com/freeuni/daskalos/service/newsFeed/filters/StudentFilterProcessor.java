package com.freeuni.daskalos.service.newsFeed.filters;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.StudentDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.service.teacher.UserService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class StudentFilterProcessor implements FilterProcessor {

    private UserService userService;

    private FilterDTO filter;

    public StudentFilterProcessor(FilterDTO filter, UserService userService) {
        this.filter = filter;
        this.userService = userService;
    }

    @Override
    public boolean checkUser(Long userID) {
        return checkSubjects(userID) && checkOnPlace(userID);
    }

    private boolean checkSubjects(Long userID) {
        Set<String> userSubjects = userService.getStudentDTO(userID).getStudentSubjects().stream().map(SubjectDTO::getName).collect(Collectors.toSet());
        List<String> chosenSubjects = filter.getSubjectsOnly();
        for (String subject : chosenSubjects) {
            if (!userSubjects.contains(subject)) {
                return false;
            }
        }
        return true;
    }

    private boolean checkOnPlace(Long userID) {
        StudentDTO student = userService.getStudentDTO(userID);
        return student.getOnPlace();
    }
}
