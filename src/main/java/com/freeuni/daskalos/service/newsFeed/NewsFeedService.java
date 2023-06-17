package com.freeuni.daskalos.service.newsFeed;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.StudentDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.newsFeed.filters.FilterProcessor;
import com.freeuni.daskalos.service.newsFeed.filters.StudentFilterProcessor;
import com.freeuni.daskalos.service.newsFeed.filters.TeacherFilterProcessor;
import com.freeuni.daskalos.service.user.UserService;
import com.freeuni.daskalos.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class NewsFeedService {

    @Autowired
    private UserService userService;

    public List<TeacherDTO> getTeachers(Long studentID, FilterDTO filter) {
        FilterProcessor filterProcessor = new TeacherFilterProcessor(filter, userService, studentID);
        List<TeacherDTO> teachers = userService.getAllTeachers();
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

    public List<StudentDTO> getStudents(FilterDTO filter) {
        FilterProcessor filterProcessor = new StudentFilterProcessor(filter, userService);
        List<StudentDTO> students = userService.getAllStudents();
        return students.stream().filter(student -> filterProcessor.checkUser(student.getID())).toList();
    }

    public List<TeacherDTO> getTopTenTeacherByRating() {
        List<TeacherDTO> allTeachers = userService.getAllTeachers();
        allTeachers.sort(Comparator.comparing(UserUtils::teacherAverageRating).reversed());
        int sizeToReturn = Math.min(allTeachers.size(), 10);
        return allTeachers.subList(0, sizeToReturn);
    }
}
