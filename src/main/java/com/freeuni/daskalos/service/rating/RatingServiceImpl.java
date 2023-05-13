package com.freeuni.daskalos.service.rating;

import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.repository.TeacherRatingRepository;
import com.freeuni.daskalos.repository.TeacherToRatingRepository;
import com.freeuni.daskalos.repository.entities.TeacherRating;
import com.freeuni.daskalos.repository.entities.TeacherToRating;
import com.freeuni.daskalos.utils.EntityToDtoUtils;

import java.util.List;

public class RatingServiceImpl implements RatingService {

    private TeacherRatingRepository teacherRatingRepository;

    private TeacherToRatingRepository teacherToRatingRepository;

    @Override
    public List<TeacherRatingDTO> getTeacherRating(Long teacherID) {
        List<TeacherToRating> teacherToRatingList = teacherToRatingRepository.findAllByTeacherID(teacherID);
        List<TeacherRating> teachersRatingList = teacherRatingRepository.findAllById(teacherToRatingList.stream().map(TeacherToRating::getRatingID).toList());
        return teachersRatingList.
                stream().
                map(EntityToDtoUtils::toTeacherRatingDTO).
                toList();
    }

    @Override
    public boolean removeTeacherRating(Long teacherID, TeacherRatingDTO teacherRating) {
        // TO DO
        return false;
    }

    @Override
    public TeacherRatingDTO addTeacherRating(Long teacherID, TeacherRatingDTO teacherRating) {
        // TO DO
        return null;
    }
}
