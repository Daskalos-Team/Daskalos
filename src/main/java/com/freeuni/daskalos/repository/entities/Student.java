package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.utils.*;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import reactor.util.annotation.NonNull;

import java.util.List;
import java.util.Objects;

@Entity
public class Student extends User {

    @ManyToMany
    private List<Teacher> favouriteTeachers;

    public Student(Long ID,
                   @NonNull String name,
                   @NonNull String secondName,
                   @NonNull String password,
                   @NonNull String mail,
                   @NonNull UserType userType,
                   @NonNull String phoneNumber,
                   @NonNull UserAddress address,
                   int priceMin,
                   int priceMax,
                   List<Teacher> favouriteTeachers) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, address, priceMin, priceMax);
        this.favouriteTeachers = !Objects.isNull(favouriteTeachers) ? favouriteTeachers : List.of();
    }

    public Student(@NonNull String mail,
                   @NonNull String password,
                   @NonNull String name,
                   @NonNull String surname,
                   @NonNull UserAddress address,
                   @NonNull UserType userType) {
        super(mail, password, name, surname, address, userType);
    }

    public Student() {

    }

    public List<Teacher> getFavouriteTeachers() {
        return favouriteTeachers;
    }

    public void setFavouriteTeachers(List<Teacher> favouriteTeachers) {
        this.favouriteTeachers = favouriteTeachers;
    }
}
