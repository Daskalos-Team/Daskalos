package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.service.AuthorizationService;
import com.freeuni.daskalos.utils.AuthorizationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class AuthorizationController implements ErrorController {

    @Autowired
    private AuthorizationService authorizationService;

    @PostMapping("/exists")
    public ResponseEntity<String> checkUserWithEmail(@RequestBody UserDTO user) {
        String message = authorizationService.checkUserWithEmail(user.getEmail());
        if (message.equals(AuthorizationStatus.OK.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/check")
    public ResponseEntity<String> checkEmailAndPassword(@RequestBody UserDTO user) {
        String message = authorizationService.checkUserWithEmailAndPassword(user.getEmail(), user.getPassword());
        if (message.equals(AuthorizationStatus.OK.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO user) {
        String message = authorizationService.addUser(user);
        if (message.equals(AuthorizationStatus.SUCCESSFUL_REGISTRATION.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<String[]> loginUser(@RequestBody UserDTO user) {
        String[] results = authorizationService.authorizeUser(user);
        if (results[0].equals(AuthorizationStatus.SUCCESSFUL_LOGIN.name())) {
            return new ResponseEntity<>(results, HttpStatus.OK);
        }
        return new ResponseEntity<>(results, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("change")
    public ResponseEntity<String> changePassword(@RequestBody UserDTO user) {
        String message = authorizationService.changePassword(user.getEmail(), user.getPassword());
        if (message.equals(AuthorizationStatus.SUCCESSFUL_CHANGE.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/info")
    public List<UserDTO> getAllUsersInfo() {
        return authorizationService.getAllUsers();
    }
}
