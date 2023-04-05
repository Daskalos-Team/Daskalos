package com.freeuni.daskalos.controller;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
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
    public void saveUser(@RequestBody UserDTO user) {
        userService.addUser(user);
    }
}
