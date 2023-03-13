package com.freeuni.daskalos.repository.entities.teacher;

import reactor.util.annotation.NonNull;

public class TeacherRatingBuilder {
    private int ID;
    private int studentID;
    private String studentComment;
    private int rating;

    public TeacherRatingBuilder(@NonNull TeacherRating teacherRating) {
        this.ID = teacherRating.getID();
        this.studentID = teacherRating.getStudentID();
        this.studentComment = teacherRating.getStudentComment();
        this.rating = teacherRating.getRating();
    }

    public TeacherRatingBuilder setID(int ID) {
        this.ID = ID;
        return this;
    }

    public int getID() {
        return this.ID;
    }

    public TeacherRatingBuilder setStudentID(int studentID) {
        this.studentID = studentID;
        return this;
    }

    public int getStudentID() {
        return this.studentID;
    }

    public TeacherRatingBuilder setStudentComment(String studentComment) {
        this.studentComment = studentComment;
        return this;
    }

    public String getStudentComment() {
        return this.studentComment;
    }

    public TeacherRatingBuilder setRating(int rating) {
        this.rating = rating;
        return this;
    }

    public int getRating() {
        return this.rating;
    }

    public TeacherRating toTeacherRating() {
        return new TeacherRating(this.ID, this.studentID, this.studentComment, this.rating);
    }

}
