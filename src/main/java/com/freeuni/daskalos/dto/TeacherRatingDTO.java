package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@JsonAutoDetect
public class TeacherRatingDTO {

    private Long ID;

    private Long studentID;

    private String studentComment;

    private int rating;

    private String nameSecondName;

    private Date addDate;
}
