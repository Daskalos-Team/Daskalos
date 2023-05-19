package com.freeuni.daskalos.service.rating;

import com.freeuni.daskalos.dto.TeacherRatingDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RatingService {

    public List<TeacherRatingDTO> getTeacherRating(Long teacherID);

    public void removeTeacherRating(TeacherRatingDTO teacherRating);

    public TeacherRatingDTO addTeacherRating(Long teacherID, TeacherRatingDTO teacherRating);
}
