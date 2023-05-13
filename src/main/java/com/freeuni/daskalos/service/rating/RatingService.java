package com.freeuni.daskalos.service.rating;

import com.freeuni.daskalos.dto.TeacherRatingDTO;

import java.util.List;

public interface RatingService {

    public List<TeacherRatingDTO> getTeacherRating(Long teacherID);

    public boolean removeTeacherRating(Long teacherID, TeacherRatingDTO teacherRating);

    public TeacherRatingDTO addTeacherRating(Long teacherID, TeacherRatingDTO teacherRating);
}
