package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.FilterDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @PostMapping("/get_teachers/{studentID}")
    public ResponseEntity<List<TeacherDTO>> getTeachers(@PathVariable long studentID,
                                                        @RequestBody FilterDTO filter) {
        try {
            List<TeacherDTO> foundTeachers = searchService.findTeachers(studentID, filter);
            return new ResponseEntity<>(foundTeachers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
