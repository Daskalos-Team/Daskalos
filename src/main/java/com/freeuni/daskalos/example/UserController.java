package com.freeuni.daskalos.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController implements ErrorController {

    @Autowired
    private UserService userService;

    @GetMapping("/info/")
    public List<UserDao> getAllUserInfo(){
        return userService.findAll();
    }

    @PostMapping("/info/")
    public UserDao saveUser(UserDao user) {
        return userService.addUser(user);
    }
}
