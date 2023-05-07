package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.UserAddressDTO;
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

    @PostMapping("/exists")
    public ResponseEntity<String> checkUserWithEmail(@RequestBody UserDTO user) {
        String message = userService.checkUserWithEmail(user.getEmail());
        if (message.equals(AuthorizationStatus.OK.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/check")
    public ResponseEntity<String> checkEmailAndPassword(@RequestBody UserDTO user) {
        String message = userService.checkUserWithEmailAndPassword(user.getEmail(), user.getPassword());
        if (message.equals(AuthorizationStatus.OK.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
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

    @PostMapping("change")
    public ResponseEntity<String> changePassword(@RequestBody UserDTO user) {
        String message = userService.changePassword(user.getEmail(), user.getPassword());
        if (message.equals(AuthorizationStatus.SUCCESSFUL_CHANGE.name())) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/address_info")
    public ResponseEntity<?> getAllTeachersInRadius(@RequestBody UserAddressDTO address) {
        List<UserDTO> teachersInRadius = userService.getAllTeachersInRadius(address);
        return new ResponseEntity<>(teachersInRadius, HttpStatus.OK);
    }

    @GetMapping("/info")
    public List<UserDTO> getAllUsersInfo() {
        return userService.getAllUsers();
    }
}
