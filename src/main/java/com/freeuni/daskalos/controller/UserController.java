package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.*;
import com.freeuni.daskalos.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user_data")
public class UserController implements ErrorController {

    @Autowired
    private UserService userService;

    @PostMapping("/get_teacher/{id}")
    public ResponseEntity<TeacherDTO> getTeacherData(@PathVariable long id) {
        try {
            TeacherDTO teacherDTO = userService.getTeacherDTO(id);
            return new ResponseEntity<>(teacherDTO, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/get_student/{id}")
    public ResponseEntity<StudentDTO> getStudentData(@PathVariable long id) {
        try {
            StudentDTO studentDTO = userService.getStudentDTO(id);
            return new ResponseEntity<>(studentDTO, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update_teacher")
    public ResponseEntity<HttpStatus> updateTeacherData(@RequestBody TeacherDTO teacher) {
        try {
            userService.updateTeacher(teacher);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update_student")
    public ResponseEntity<HttpStatus> updateStudentData(@RequestBody StudentDTO studentDTO) {
        try {
            userService.updateStudent(studentDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add_experience/{id}")
    public ResponseEntity<ExperienceDTO> addExperience(@PathVariable long id, @RequestBody ExperienceDTO experience) {
        try {
            ExperienceDTO experienceDTO = userService.addTeachersExperience(id, experience);
            return new ResponseEntity<>(experienceDTO, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/remove_experience")
    public ResponseEntity<TeacherDTO> removeExperience(ExperienceDTO experienceDTO) {
        try {
            userService.removeTeachersExperience(experienceDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add_rating/{id}")
    public ResponseEntity<TeacherRatingDTO> addTeacherRating(@PathVariable long id, @RequestBody TeacherRatingDTO teacherRating) {
        try {
            TeacherRatingDTO teacherRatingDTO = userService.addTeachersRating(id, teacherRating);
            return new ResponseEntity<>(teacherRatingDTO, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/remove_rating")
    public ResponseEntity<TeacherDTO> removeTeacherRating(@RequestBody TeacherRatingDTO teacherRating) {
        try {
            userService.removeTeacherRating(teacherRating);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add_teacher_subjects/{id}")
    public ResponseEntity<?> addTeacherSubjects(@PathVariable long id, @RequestBody List<SubjectDTO> subjects) {
        userService.clearSubjects(id);
        for (SubjectDTO subjectDTO : subjects) {
            ResponseEntity<SubjectDTO> result = addTeacherSubject(id, subjectDTO);
            if (result.getStatusCode() == HttpStatus.BAD_REQUEST) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/add_teacher_subject/{id}")
    public ResponseEntity<SubjectDTO> addTeacherSubject(@PathVariable long id, @RequestBody SubjectDTO subject) {
        try {
            SubjectDTO subjectDTO = userService.addSubject(id, subject);
            return new ResponseEntity<>(subjectDTO, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/remove_teacher_subject/{id}")
    public ResponseEntity<TeacherDTO> removeTeacherSubject(@PathVariable long id, @RequestBody SubjectDTO subject) {
        try {
            userService.removeSubject(id, subject);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{student_id}/add_student_favourite/{teacher_id}")
    public ResponseEntity<HttpStatus> addStudentsFavouriteTeacher(@PathVariable long student_id, @PathVariable long teacher_id) {
        try {
            userService.addStudentFavouriteTeacher(student_id, teacher_id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{student_id}/remove_student_favourite/{teacher_id}")
    public ResponseEntity<HttpStatus> removeStudentsFavouriteTeacher(@PathVariable long student_id, @PathVariable long teacher_id) {
        try {
            userService.removeStudentFavouriteTeacher(student_id, teacher_id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
