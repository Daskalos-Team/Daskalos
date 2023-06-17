package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.service.session.SessionService;
import com.freeuni.daskalos.utils.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/session")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/id-set")
    public ResponseEntity<String> setUserId(@RequestBody Long userId) {
        sessionService.setUserId(userId);
        return new ResponseEntity<>("success!", HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<Long> getUserId() {
        Long userId = sessionService.getUserId();
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }

    @PostMapping("/type-set")
    public ResponseEntity<String> setUserType(@RequestBody String userType) {
        UserType type = UserType.fromName(userType);
        if (type == null) {
            return new ResponseEntity<>("invalid user type", HttpStatus.BAD_REQUEST);
        }
        sessionService.setUserType(type);
        return new ResponseEntity<>("success!", HttpStatus.OK);
    }

    @GetMapping("/type")
    public ResponseEntity<UserType> getUserType() {
        UserType userType = sessionService.getUserType();
        if (userType != null) {
            return new ResponseEntity<>(userType, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
