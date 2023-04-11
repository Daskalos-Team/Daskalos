package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.service.UserService;
import com.freeuni.daskalos.utils.AuthorizationStatus;
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

    @PostMapping("/check")
    public ResponseEntity<String> checkUserWithEMail(@RequestBody UserDTO user) {
        String message = userService.checkUserWithEMailAndPassword(user.getEmail(), user.getPassword());
        if (message.equals(AuthorizationStatus.ALREADY_EXISTS.name())) {
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO user) {
        String message = userService.addUser(user);
        if (message.equals(AuthorizationStatus.SUCCESSFUL_REGISTRATION.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDTO user) {
        String message = userService.authorizeUser(user);
        if (message.equals(AuthorizationStatus.SUCCESSFUL_LOGIN.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/info")
    public List<UserDTO> getAllUserInfo() {
        return userService.getAllUsers();
    }
}
