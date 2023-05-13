package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.service.teacher.TeacherServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
public class TeachersController implements ErrorController {

    @Autowired
    private TeacherServiceImpl teacherService;

    @PostMapping("/{id}")
    public ResponseEntity<TeacherDTO> getTeacherData(@PathVariable long id) {
        try {
            TeacherDTO teacherDTO = teacherService.getTeacher(id);
            return new ResponseEntity<>(teacherDTO, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }



}
