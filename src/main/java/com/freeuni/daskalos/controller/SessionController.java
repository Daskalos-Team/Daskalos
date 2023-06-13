package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.utils.UserType;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping("/user/session")
public class SessionController {

    private static HttpSession getSession() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attributes.getRequest().getSession(true);
    }

    @PostMapping("/id-set")
    public ResponseEntity<String> setUserID(@RequestBody Long userId) {
        getSession().setAttribute("userId", userId);
        return new ResponseEntity<>("success!", HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<Long> getUserId() {
        Long userId = (Long) getSession().getAttribute("userId");
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }

    @PostMapping("/type-set")
    public ResponseEntity<String> setUserType(@RequestBody UserType userType) {
        getSession().setAttribute("userType", userType);
        return new ResponseEntity<>("success!", HttpStatus.OK);
    }

    @GetMapping("/type")
    public ResponseEntity<String> getUserType() {
        UserType userType = (UserType) getSession().getAttribute("userType");
        if (userType != null) {
            return new ResponseEntity<>(userType.name(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
