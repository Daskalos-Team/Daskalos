package com.freeuni.daskalos.service;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.newsFeed.filters.FilterProcessor;
import com.freeuni.daskalos.service.newsFeed.filters.TeacherFilterProcessor;
import com.freeuni.daskalos.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    private UserService userService;

    public List<TeacherDTO> findTeachers(long studentID, FilterDTO filter) {
        FilterProcessor filterProcessor = new TeacherFilterProcessor(filter, userService, studentID);
        List<TeacherDTO> teachers = userService.getAllTeachersInRadius(filter.getUserAddressDTO(), filter.getRadius());
        Set<Long> studentsFavoriteTeachers = userService.getStudentFavouriteTeachers(studentID).stream().
                map(TeacherDTO::getID).
                collect(Collectors.toSet());
        return teachers.stream().
                filter(teacher -> filterProcessor.checkUser(teacher.getID())).
                peek(teacher -> {
                    if (studentsFavoriteTeachers.contains(teacher.getID())) {
                        teacher.setIsFavoriteForLoggedInStudent(true);
                    }
                }).
                toList();
    }
}
