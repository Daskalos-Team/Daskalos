package com.freeuni.daskalos.service;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.UserRepository;
import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public String addUser(UserDTO user) {
        Optional<User> currentUser = repository.findByMail(user.getMail());
        if (user.isUsingGoogle()) {
            if (currentUser.isEmpty()) {
                repository.save(UserUtils.toUserEntity(user));
                return "User registered successfully";
            }
        } else {
            if (currentUser.isEmpty()) {
                return "User with this mail not found";
            } else if (!currentUser.get().getPassword().equals(user.getPassword())) {
                return "Wrong password";
            }
        }
        return "Successful authorization";
    }

    public List<UserDTO> findAll() {
        Iterable<User> all = repository.findAll();
        return StreamSupport.stream(all.spliterator(), false).map(UserUtils::toUserDao).collect(Collectors.toList());
    }
}
