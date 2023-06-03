package com.freeuni.daskalos.service.newsFeed;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.StudentDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.newsFeed.filters.FilterProcessor;
import com.freeuni.daskalos.service.newsFeed.filters.StudentFilterProcessor;
import com.freeuni.daskalos.service.newsFeed.filters.TeacherFilterProcessor;
import com.freeuni.daskalos.service.teacher.UserService;
import com.freeuni.daskalos.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


@Service
public class NewsFeedService {

    @Autowired
    private UserService userService;

    public List<TeacherDTO> getTeachers(Long studentID, FilterDTO filter) {
        FilterProcessor filterProcessor = new TeacherFilterProcessor(filter, userService, studentID);
        List<TeacherDTO> teachers = userService.getAllTeachers();
        return teachers.stream().filter(teacher -> filterProcessor.checkUser(teacher.getID())).toList();
    }

    public List<StudentDTO> getStudents(Long teacherID, FilterDTO filter) {
        FilterProcessor filterProcessor = new StudentFilterProcessor(filter, userService, teacherID);
        List<StudentDTO> studentS = userService.getAllStudents();
        return new ArrayList<>();
    }

    public List<TeacherDTO> getTopTenTeacherByRating() {
        List<TeacherDTO> allTeachers = userService.getAllTeachers();
        allTeachers.sort(Comparator.comparing(UserUtils::teacherAverageRating).reversed());
        int sizeToReturn = Math.min(allTeachers.size(), 10);
        return allTeachers.subList(0, sizeToReturn);
    }
}
