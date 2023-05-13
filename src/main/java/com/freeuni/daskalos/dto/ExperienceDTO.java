package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonAutoDetect
public class ExperienceDTO implements Serializable {

    private long ID;
    private String employer;
    private String jobDescription;
    private Date startDate;
    private Date endDate;

}

