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
@JsonAutoDetect
public class SubjectDTO {
    private Long ID;

    private String name;
}
