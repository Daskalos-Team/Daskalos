package com.freeuni.daskalos.repository.entities.teacher;

import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.repository.entities.UserType;
import reactor.util.annotation.NonNull;
import reactor.util.annotation.Nullable;

import java.util.List;
import java.util.Objects;

public class Teacher extends User {

    @NonNull
    private List<Experience> teachersExperience;
    @NonNull
    private List<TeacherRating> teacherRatings;
    private final boolean onPlace;
    private List<String> teacherSubjects;

    public Teacher(int ID, @NonNull String name, @NonNull String secondName, @NonNull String password,
                       @NonNull String mail, @NonNull UserType userType, @NonNull String phoneNumber, int priceMin,
                       int priceMax, @NonNull String address, @Nullable List<String> socialNetworkUrls,
                       @Nullable List<Experience> teachersExperience, boolean onPlace, @Nullable List<TeacherRating> teacherRatings,
                       @Nullable List<String> teacherSubjects) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, priceMin, priceMax, address, socialNetworkUrls);
        this.teachersExperience = !Objects.isNull(teachersExperience) ? teachersExperience : List.of();
        this.teacherRatings = !Objects.isNull(teacherRatings) ? teacherRatings : List.of();
        this.onPlace = onPlace;
        this.teacherSubjects = !Objects.isNull(teacherSubjects) ? teacherSubjects : List.of();
    }

    public Teacher(int ID, @NonNull String name, @NonNull String secondName, @NonNull String password,
                       @NonNull String mail, @NonNull UserType userType, @NonNull String phoneNumber, int priceMin,
                       int priceMax, @NonNull String address, @Nullable String socialNetworkUrls,
                       @Nullable List<Experience> teachersExperience, boolean onPlace, @Nullable List<TeacherRating> teacherRatings,
                       @Nullable List<String> teacherSubjects) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, priceMin, priceMax, address, socialNetworkUrls);
        this.teachersExperience = !Objects.isNull(teachersExperience) ? teachersExperience : List.of();
        this.teacherRatings = !Objects.isNull(teacherRatings) ? teacherRatings : List.of();
        this.onPlace = onPlace;
        this.teacherSubjects = !Objects.isNull(teacherSubjects) ? teacherSubjects : List.of();
    }

    @NonNull
    public List<Experience> getTeachersExperience() {
        return this.teachersExperience;
    }

    @NonNull
    public List<TeacherRating> getTeacherRatings() {
        return teacherRatings;
    }


    @NonNull
    public List<String> getTeacherSubjects() {
        return this.teacherSubjects;
    }

    public boolean getOnPlace() {
        return this.onPlace;
    }
}
