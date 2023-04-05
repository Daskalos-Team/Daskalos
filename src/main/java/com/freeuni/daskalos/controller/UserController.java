package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController implements ErrorController {

    @Autowired
    private UserService userService;

    @GetMapping("/info")
    public List<UserDTO> getAllUserInfo() {
        return userService.findAll();
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveUser(@RequestBody UserDTO user) {
        String message = userService.addUser(user);
        if (message.contains("successfully")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
