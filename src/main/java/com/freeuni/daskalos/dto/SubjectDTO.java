package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@JsonAutoDetect
public class SubjectDTO {

    private Long ID;

    private String name;

    private String description;

    private Integer price;

    private List<SubjectScheduleDTO> days;
}
