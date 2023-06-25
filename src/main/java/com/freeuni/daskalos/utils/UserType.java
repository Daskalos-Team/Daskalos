package com.freeuni.daskalos.utils;

public enum UserType {
    TEACHER("TEACHER"),
    STUDENT("STUDENT");

    private final String name;

    UserType(String name) {
        this.name = name;
    }
}
