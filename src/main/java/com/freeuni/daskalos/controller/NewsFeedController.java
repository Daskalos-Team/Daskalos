package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.StudentDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.newsFeed.NewsFeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news_feed")
public class NewsFeedController {

    @Autowired
    private NewsFeedService newsFeedService;

    @PostMapping("/get_filtered_students/")
    public ResponseEntity<List<StudentDTO>> getStudents(@RequestBody FilterDTO filter) {
        try {
            List<StudentDTO> students = newsFeedService.getStudents(filter);
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/get_filtered_teachers/{studentID}")
    public ResponseEntity<List<TeacherDTO>> getTeachers(@PathVariable long studentID, @RequestBody FilterDTO filter) {
        try {
            List<TeacherDTO> teachers = newsFeedService.getTeachers(studentID, filter);
            return new ResponseEntity<>(teachers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/get_top_ten_teacher/")
    public ResponseEntity<List<TeacherDTO>> getTeachers() {
        try {
            List<TeacherDTO> teachers = newsFeedService.getTopTenTeacherByRating();
            return new ResponseEntity<>(teachers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
