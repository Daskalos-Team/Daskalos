package com.freeuni.daskalos.repository.entities;

import org.apache.logging.log4j.util.Strings;
import reactor.util.annotation.NonNull;
import reactor.util.annotation.Nullable;

import java.util.Objects;

public class TeacherRating {

    private int ID;

    private int studentID;

    @NonNull
    private String studentComment;

    private int rating;

    public TeacherRating(int ID, int studentID, @Nullable String studentComment, int rating) {
        this.ID = ID;
        this.studentID = studentID;
        this.studentComment = !Objects.isNull(studentComment) ? studentComment : Strings.EMPTY;
        this.rating = rating;
    }

    public int getID() {
        return this.ID;
    }

    public int getStudentID() {
        return this.studentID;
    }

    @NonNull
    public String getStudentComment() {
        return this.studentComment;
    }

    public int getRating() {
        return this.rating;
    }
}