package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.newsFeed.filters.FilterProcessor;
import com.freeuni.daskalos.service.newsFeed.filters.TeacherFilterProcessor;
import com.freeuni.daskalos.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private UserService userService;

    @PostMapping("/get_teachers/{studentID}")
    public ResponseEntity<List<TeacherDTO>> getTeachers(@PathVariable long studentID, @RequestBody FilterDTO filter) {
        try {
            FilterProcessor filterProcessor = new TeacherFilterProcessor(filter, userService, studentID);
            List<TeacherDTO> teachers = userService.getAllTeachers();
            Set<Long> studentsFavoriteTeachers = userService.getStudentFavouriteTeachers(studentID).stream().
                    map(TeacherDTO::getID).
                    collect(Collectors.toSet());
            List<TeacherDTO> foundTeachers = teachers.stream().
                    filter(teacher -> filterProcessor.checkUser(teacher.getID())).
                    peek(teacher -> {
                        if (studentsFavoriteTeachers.contains(teacher.getID())) {
                            teacher.setIsFavoriteForLoggedInStudent(true);
                        }
                    }).
                    toList();
            return new ResponseEntity<>(foundTeachers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
