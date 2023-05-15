package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.ExperienceDTO;
import com.freeuni.daskalos.dto.SubjectDTO;
import com.freeuni.daskalos.dto.TeacherDTO;
import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.service.teacher.TeacherService;
import com.freeuni.daskalos.service.teacher.TeacherServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
public class TeacherController implements ErrorController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("/{id}")
    public ResponseEntity<TeacherDTO> getTeacherData(@PathVariable long id) {
        try {
            TeacherDTO teacherDTO = teacherService.getTeacherDTO(id);
            return new ResponseEntity<>(teacherDTO, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<HttpStatus> updateTeacherData(@RequestBody TeacherDTO teacher) {
        try {
            teacherService.updateTeacher(teacher);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add_experience/{id}")
    public ResponseEntity<HttpStatus> addExperience(@PathVariable long id, @RequestBody ExperienceDTO experienceDTO) {
        try {
            teacherService.addExperience(id, experienceDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("remove_experience")
    public ResponseEntity<TeacherDTO> removeExperience(ExperienceDTO experienceDTO) {
        try {
            teacherService.removeExperience(experienceDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add_rating/{id}")
    public ResponseEntity<TeacherDTO> addTeacherRating(@PathVariable long id, @RequestBody TeacherRatingDTO teacherRating) {
        try {
            teacherService.addRating(id, teacherRating);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("remove_rating")
    public ResponseEntity<TeacherDTO> removeTeacherRating(@RequestBody TeacherRatingDTO teacherRating) {
        try {
            teacherService.removeRating(teacherRating);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add_subject/{id}")
    public ResponseEntity<TeacherDTO> addTeacherSubject(@PathVariable long id, @RequestBody SubjectDTO subject) {
        try {
            teacherService.addSubject(id, subject);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/remove_subject/{id}")
    public ResponseEntity<TeacherDTO> removeTeacherSubject(@PathVariable long id, @RequestBody SubjectDTO subject) {
        try {
            teacherService.removeSubject(id, subject);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
