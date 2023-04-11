package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.*;
import reactor.util.annotation.NonNull;
import reactor.util.annotation.Nullable;

import java.util.List;
import java.util.Objects;

@Entity
public class Teacher extends User {

    @ManyToMany
    private List<Experience> teachersExperience;

    @ManyToMany
    private List<TeacherRating> teacherRatings;

    @ManyToMany
    private List<Subject> teacherSubjects;

    private boolean onPlace;

    public Teacher(Long ID,
                   @NonNull String name,
                   @NonNull String secondName,
                   @NonNull String password,
                   @NonNull String mail,
                   @NonNull UserType userType,
                   @NonNull String phoneNumber,
                   @NonNull String address,
                   @Nullable List<Experience> teachersExperience,
                   @Nullable List<TeacherRating> teacherRatings,
                   @Nullable List<Subject> teacherSubjects,
                   boolean onPlace,
                   int priceMin,
                   int priceMax) {
        super(ID, name, secondName, password, mail, userType, address, phoneNumber, priceMin, priceMax);
        this.teachersExperience = !Objects.isNull(teachersExperience) ? teachersExperience : List.of();
        this.teacherRatings = !Objects.isNull(teacherRatings) ? teacherRatings : List.of();
        this.onPlace = onPlace;
        this.teacherSubjects = !Objects.isNull(teacherSubjects) ? teacherSubjects : List.of();
    }

    public Teacher(@NonNull String mail,
                   @NonNull String password,
                   @NonNull String name,
                   @NonNull String surname,
                   @NonNull UserType userType) {
        super(mail, password, name, surname, userType);
    }

    public Teacher() {
        super();
    }

    public List<Experience> getTeachersExperience() {
        return teachersExperience;
    }

    public void setTeachersExperience(List<Experience> teachersExperience) {
        this.teachersExperience = teachersExperience;
    }

    public List<TeacherRating> getTeacherRatings() {
        return teacherRatings;
    }

    public void setTeacherRatings(List<TeacherRating> teacherRatings) {
        this.teacherRatings = teacherRatings;
    }

    public List<Subject> getTeacherSubjects() {
        return teacherSubjects;
    }

    public void setTeacherSubjects(List<Subject> teacherSubjects) {
        this.teacherSubjects = teacherSubjects;
    }

    public boolean isOnPlace() {
        return onPlace;
    }

    public void setOnPlace(boolean onPlace) {
        this.onPlace = onPlace;
    }
}
