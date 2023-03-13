package com.freeuni.daskalos.repository.entities.student;

import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.repository.entities.UserType;
import com.freeuni.daskalos.repository.entities.teacher.Teacher;
import jakarta.annotation.Nonnull;
import reactor.util.annotation.NonNull;
import reactor.util.annotation.Nullable;

import java.util.List;
import java.util.Objects;

public class StudentImpl extends User implements Student {

    @NonNull
    private final List<Teacher> favouriteTeachers;


    public StudentImpl(int ID, @NonNull String name, @NonNull String secondName, @NonNull String password,
                       @NonNull String mail, @NonNull UserType userType, @NonNull String phoneNumber, int priceMin,
                       int priceMax, @NonNull String address, @Nullable List<String> socialNetworkUrls, List<Teacher> favouriteTeachers) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, priceMin, priceMax, address, socialNetworkUrls);
        this.favouriteTeachers = !Objects.isNull(favouriteTeachers) ? favouriteTeachers : List.of();
    }

    @Override
    @Nonnull
    public List<Teacher> getStudentFavourites() {
        return this.favouriteTeachers;
    }

}
