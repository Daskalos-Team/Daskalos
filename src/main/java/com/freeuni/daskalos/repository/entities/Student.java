package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.utils.UserType;
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
                   @NonNull String address,
                   int priceMin,
                   int priceMax,
                   List<Teacher> favouriteTeachers) {
        super(ID, name, secondName, password, mail, userType, address, phoneNumber, priceMin, priceMax);
        this.favouriteTeachers = !Objects.isNull(favouriteTeachers) ? favouriteTeachers : List.of();
    }

    public Student(@NonNull String mail,
                   @NonNull String password,
                   @NonNull String name,
                   @NonNull String surname,
                   @NonNull UserType userType) {
        super(mail, password, name, surname, userType);
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
