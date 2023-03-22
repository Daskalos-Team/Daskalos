package com.freeuni.daskalos.repository.entities;

import jakarta.annotation.Nonnull;
import reactor.util.annotation.NonNull;
import reactor.util.annotation.Nullable;

import java.util.List;
import java.util.Objects;

public class Student extends User {

    @NonNull
    private final List<Teacher> favouriteTeachers;

    public Student(int ID, @NonNull String name, @NonNull String secondName, @NonNull String password,
                   @NonNull String mail, @NonNull UserType userType, @NonNull String phoneNumber, int priceMin,
                   int priceMax, @NonNull String address, @Nullable List<String> socialNetworkUrls, List<Teacher> favouriteTeachers) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, priceMin, priceMax, address, socialNetworkUrls);
        this.favouriteTeachers = !Objects.isNull(favouriteTeachers) ? favouriteTeachers : List.of();
    }

    @Nonnull
    public List<Teacher> getStudentFavourites() {
        return this.favouriteTeachers;
    }
}