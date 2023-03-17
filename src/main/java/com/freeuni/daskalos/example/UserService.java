package com.freeuni.daskalos.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserDao addUser(UserDao user) {
        repository.save(UserHelper.toUserEntity(user));
        return user;
    }

    public List<UserDao> findAll() {
        Iterable<UserEntity> all = repository.findAll();
        return StreamSupport.stream(all.spliterator(), false).map(UserHelper::toUserDao).collect(Collectors.toList());
    }
}
