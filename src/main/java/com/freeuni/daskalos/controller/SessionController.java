package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.UserMainDataDTO;
import com.freeuni.daskalos.service.session.SessionService;
import com.freeuni.daskalos.utils.UserType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/session")
public class SessionController {

    @PostMapping("/user-main-set")
    public ResponseEntity<String> setUserMainData(@RequestBody UserMainDataDTO userData) {
        if (!userData.getUserType().equals("TEACHER") && !userData.getUserType().equals("STUDENT")) {
            return new ResponseEntity<>("invalid user type", HttpStatus.BAD_REQUEST);
        }
        UserType type = userData.getUserType().equals("TEACHER") ? UserType.TEACHER : UserType.STUDENT;

        SessionService.setUserType(type);
        SessionService.setUserId(userData.getUserId());
        return new ResponseEntity<>("success!", HttpStatus.OK);
    }

    @GetMapping("/user-main-get")
    public ResponseEntity<UserMainDataDTO> getUserMainData() {
        UserType userType = SessionService.getUserType();
        Long userId = SessionService.getUserId();
        String userName = SessionService.getUserName();
        String userSurname = SessionService.getUserSurname();
        UserMainDataDTO res = new UserMainDataDTO(userId, userType == null ? "" : userType.name(),
                userName == null ? "" : userName, userSurname == null ? "" : userSurname);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
