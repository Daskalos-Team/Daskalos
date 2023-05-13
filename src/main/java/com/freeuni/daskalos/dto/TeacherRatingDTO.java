package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

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

    private int studentID;

    private String studentComment;

    private int rating;
}
