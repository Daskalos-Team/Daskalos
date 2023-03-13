package com.freeuni.daskalos.repository.entities.teacher;

import reactor.util.annotation.NonNull;

import java.util.List;

public interface Teacher {

    @NonNull
    public List<Experience> getTeachersExperience();

    @NonNull
    public List<TeacherRating> getTeacherRatings();

    public double getTeacherAverageRating();

    @NonNull
    public List<String> getTeacherSubjects();

    public boolean getOnPlace();
}
