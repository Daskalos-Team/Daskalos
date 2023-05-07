package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.apache.logging.log4j.util.Strings;
import reactor.util.annotation.Nullable;

import java.util.Objects;

@Entity
public class TeacherRating {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long ID;

    private int studentID;

    private String studentComment;

    private int rating;

    public TeacherRating(Long ID, int studentID, @Nullable String studentComment, int rating) {
        this.ID = ID;
        this.studentID = studentID;
        this.studentComment = !Objects.isNull(studentComment) ? studentComment : Strings.EMPTY;
        this.rating = rating;
    }

    public TeacherRating() {

    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public int getStudentID() {
        return studentID;
    }

    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }

    public String getStudentComment() {
        return studentComment;
    }

    public void setStudentComment(String studentComment) {
        this.studentComment = studentComment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
