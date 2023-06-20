package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonAutoDetect
public class UserMainDataDTO implements Serializable {

    private Long userId;

    private String userType;
}
