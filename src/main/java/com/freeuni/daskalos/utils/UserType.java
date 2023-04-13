package com.freeuni.daskalos.utils;

import jakarta.annotation.Nullable;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.collectingAndThen;

public enum UserType {
    TEACHER("Teacher"),
    STUDENT("Student");

    private final String name;

    UserType(String name) {
        this.name = name;
    }

    private static final Map<String, UserType> nameToEnum = Stream.of(values())
            .collect(collectingAndThen(Collectors.toMap(st -> st.name, Function.identity()), Map::copyOf));

    @Nullable
    public static UserType fromName(String name) {
        return nameToEnum.get(name);
    }
}
