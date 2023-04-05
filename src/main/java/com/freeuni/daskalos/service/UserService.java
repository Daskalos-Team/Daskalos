package com.freeuni.daskalos.service;

import com.freeuni.daskalos.dto.UserDTO;
import com.freeuni.daskalos.repository.UserRepository;
import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void addUser(UserDTO user) {
        repository.save(UserUtils.toUserEntity(user));
    }

    public List<UserDTO> findAll() {
        Iterable<User> all = repository.findAll();
        return StreamSupport.stream(all.spliterator(), false).map(UserUtils::toUserDao).collect(Collectors.toList());
    }
}
