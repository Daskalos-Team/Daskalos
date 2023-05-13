package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.freeuni.daskalos.repository.entities.Experience;
import com.freeuni.daskalos.repository.entities.Subject;
import com.freeuni.daskalos.repository.entities.TeacherRating;
import com.freeuni.daskalos.utils.UserType;
import lombok.*;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonAutoDetect
public class TeacherDTO {

    private Long ID;

    private String name;

    private String surname;

    private String password;

    private String email;

    private UserType userType;

    private String phoneNumber;

    private String address;

    private int priceMin;

    private int priceMax;

    private List<ExperienceDTO> teachersExperience;

    private List<TeacherRatingDTO> teacherRatings;

    private List<SubjectDTO> teacherSubjects;

}
