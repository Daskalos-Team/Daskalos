package com.freeuni.daskalos.example;

public class UserHelper {

    public static UserEntity toUserEntity(UserDao userDao) {
        return new UserEntity(userDao.getFirstName(), userDao.getLastName());
    }

    public static UserDao toUserDao(UserEntity userEntity) {
        return new UserDao(userEntity.getFirstName(), userEntity.getLastName());
    }
}
