package com.freeuni.daskalos.service.rating;

import com.freeuni.daskalos.dto.TeacherRatingDTO;
import com.freeuni.daskalos.repository.TeacherRatingRepository;
import com.freeuni.daskalos.repository.TeacherToRatingRepository;
import com.freeuni.daskalos.repository.UserRepository;
import com.freeuni.daskalos.repository.entities.TeacherRating;
import com.freeuni.daskalos.repository.entities.TeacherToRating;
import com.freeuni.daskalos.repository.entities.User;
import com.freeuni.daskalos.utils.DaoDtoConversionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class RatingService {

    @Autowired
    private TeacherRatingRepository teacherRatingRepository;

    @Autowired
    private TeacherToRatingRepository teacherToRatingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TeacherRatingDTO> getTeacherRating(Long teacherID) {
        List<TeacherToRating> teacherToRatingList = teacherToRatingRepository.findAllByTeacherID(teacherID);
        List<TeacherRating> teachersRatingList = teacherRatingRepository.findAllById(teacherToRatingList.stream().map(TeacherToRating::getRatingID).toList());
        teachersRatingList.sort(Comparator.comparing(TeacherRating::getAddDate).reversed());
        return teachersRatingList.
                stream().
                map(DaoDtoConversionUtils::toTeacherRatingDTO).
                peek(teacherRatingDTO -> {
                    User student = userRepository.findById(teacherRatingDTO.getStudentID()).get();
                    String nameSecondName = student.getName() + " " + student.getSurname();
                    teacherRatingDTO.setNameSecondName(nameSecondName);
                }).
                toList();
    }

    public void removeTeacherRating(TeacherRatingDTO teacherRating) {
        teacherRatingRepository.delete(DaoDtoConversionUtils.toTeacherRating(teacherRating));
        teacherToRatingRepository.deleteByRatingID(teacherRating.getID());
    }

    public TeacherRatingDTO addTeacherRating(Long teacherID, TeacherRatingDTO teacherRating) {
        User student = userRepository.findById(teacherRating.getStudentID()).get();
        TeacherRating addedRating = teacherRatingRepository.save(DaoDtoConversionUtils.toTeacherRating(teacherRating));
        TeacherToRating teacherToRating = TeacherToRating.
                builder().
                teacherID(teacherID).
                ratingID(addedRating.getID()).
                build();
        teacherToRatingRepository.save(teacherToRating);
        TeacherRatingDTO teacherRatingDTO = DaoDtoConversionUtils.toTeacherRatingDTO(addedRating);
        teacherRatingDTO.setNameSecondName(student.getName() + " " + student.getSurname());
        return teacherRatingDTO;
    }
}
