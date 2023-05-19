package com.freeuni.daskalos.service.rating;

import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.repository.TeacherRatingRepository;
import com.freeuni.daskalos.repository.TeacherToRatingRepository;
import com.freeuni.daskalos.repository.entities.TeacherRating;
import com.freeuni.daskalos.repository.entities.TeacherToRating;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class RatingServiceImpl implements RatingService {
    @Autowired
    private TeacherRatingRepository teacherRatingRepository;
    @Autowired
    private TeacherToRatingRepository teacherToRatingRepository;

    @Override
    public List<TeacherRatingDTO> getTeacherRating(Long teacherID) {
        List<TeacherToRating> teacherToRatingList = teacherToRatingRepository.findAllByTeacherID(teacherID);
        List<TeacherRating> teachersRatingList = teacherRatingRepository.findAllById(teacherToRatingList.stream().map(TeacherToRating::getRatingID).toList());
        return teachersRatingList.
                stream().
                map(DaoDtoConversionUtils::toTeacherRatingDTO).
                toList();
    }

    @Override
    public void removeTeacherRating(TeacherRatingDTO teacherRating) {
        teacherRatingRepository.delete(DaoDtoConversionUtils.toTeacherRating(teacherRating));
        teacherToRatingRepository.deleteByRatingID(teacherRating.getID());
    }

    @Override
    public TeacherRatingDTO addTeacherRating(Long teacherID, TeacherRatingDTO teacherRating) {
        TeacherRating addedRating = teacherRatingRepository.save(DaoDtoConversionUtils.toTeacherRating(teacherRating));
        TeacherToRating teacherToRating = TeacherToRating.
                builder().
                teacherID(teacherID).
                ratingID(addedRating.getID()).
                build();
        teacherToRatingRepository.save(teacherToRating);
        return DaoDtoConversionUtils.toTeacherRatingDTO(addedRating);
    }
}
