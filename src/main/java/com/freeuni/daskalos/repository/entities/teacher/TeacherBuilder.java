package com.freeuni.daskalos.repository.entities.teacher;

import com.freeuni.daskalos.repository.entities.UserBuilder;
import com.freeuni.daskalos.repository.entities.UserType;
import reactor.util.annotation.NonNull;

import java.util.List;

public class TeacherBuilder extends UserBuilder {
    private int ID;
    private String name;
    private String secondName;
    private String password;
    private String mail;
    private UserType userType;
    private String phoneNumber;
    private int priceMin;
    private int priceMax;
    private String address;
    private List<String> socialNetworkUrls;
    private List<Experience> teachersExperience;
    private List<TeacherRating> teacherRatings;
    private boolean onPlace;
    private List<String> teacherSubjects;

    public TeacherBuilder(@NonNull TeacherImpl teacher) {
        super(teacher);
        this.teachersExperience = teacher.getTeachersExperience();
        this.teacherRatings = teacher.getTeacherRatings();
        this.onPlace = teacher.getOnPlace();
        this.teacherSubjects = teacher.getTeacherSubjects();
    }

    public TeacherBuilder setTeachersExperience(List<Experience> teachersExperience) {
        this.teachersExperience = List.copyOf(teachersExperience);
        return this;
    }

    public TeacherBuilder addTeachersExperience(Experience teacherExperience) {
        this.teachersExperience.add(teacherExperience);
        return this;
    }

    public TeacherBuilder addTeachersExperiences(Experience... teachersExperiences) {
        this.teachersExperience.addAll(List.of(teachersExperiences));
        return this;
    }

    public List<Experience> getTeachersExperience() {
        return this.teachersExperience;
    }

    public TeacherBuilder setTeacherRatings(List<TeacherRating> teacherRatings) {
        this.teacherRatings = List.copyOf(teacherRatings);
        return this;
    }

    public TeacherBuilder addTeacherRating(TeacherRating teacherRating) {
        this.teacherRatings.add(teacherRating);
        return this;
    }

    public TeacherBuilder addTeacherRatings(TeacherRating... teacherRatings) {
        this.teacherRatings.addAll(List.of(teacherRatings));
        return this;
    }

    public List<TeacherRating> getTeacherRatings() {
        return this.teacherRatings;
    }

    public TeacherBuilder setOnPlace(boolean onPlace) {
        this.onPlace = onPlace;
        return this;
    }

    public boolean getOnPlace() {
        return this.onPlace;
    }

    public TeacherBuilder setTeacherSubjects(List<String> teacherSubjects) {
        this.teacherSubjects = List.copyOf(teacherSubjects);
        return this;
    }

    public TeacherBuilder addTeacherSubject(String teacherSubject) {
        this.teacherSubjects.add(teacherSubject);
        return this;
    }

    public TeacherBuilder addTeacherSubjects(String... teacherSubjects) {
        this.teacherSubjects.addAll(List.of(teacherSubjects));
        return this;
    }

    public List<String> getTeacherSubjects() {
        return this.teacherSubjects;
    }

    public Teacher toTeacher() {
        return new TeacherImpl(this.ID,
                this.name,
                this.secondName,
                this.password,
                this.mail,
                this.userType,
                this.phoneNumber,
                this.priceMin,
                this.priceMax,
                this.address,
                this.socialNetworkUrls,
                this.teachersExperience,
                this.onPlace,
                this.teacherRatings,
                this.teacherSubjects);
    }

}
