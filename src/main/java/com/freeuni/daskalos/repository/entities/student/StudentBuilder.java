package com.freeuni.daskalos.repository.entities.student;

import com.freeuni.daskalos.repository.entities.UserBuilder;
import com.freeuni.daskalos.repository.entities.UserType;
import com.freeuni.daskalos.repository.entities.teacher.Teacher;

import java.util.List;

public class StudentBuilder extends UserBuilder {

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
    private List<Teacher> favouriteTeachers;

    public StudentBuilder(StudentImpl student) {
        super(student);
        this.favouriteTeachers = student.getStudentFavourites();

    }

    public StudentBuilder setFavouriteTeachers(List<Teacher> favouriteTeachers) {
        this.favouriteTeachers = List.copyOf(favouriteTeachers);
        return this;
    }

    public StudentBuilder addFavouriteTeacher(Teacher favouriteTeacher) {
        this.favouriteTeachers.add(favouriteTeacher);
        return this;
    }

    public StudentBuilder addFavouriteTeachers(Teacher... favouriteTeachers) {
        this.favouriteTeachers.addAll(List.of(favouriteTeachers));
        return this;
    }

    public List<Teacher> getFavouriteTeachers() {
        return this.favouriteTeachers;
    }

    public Student toStudent() {
        return new StudentImpl(this.ID,
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
                this.favouriteTeachers
        );
    }

}
