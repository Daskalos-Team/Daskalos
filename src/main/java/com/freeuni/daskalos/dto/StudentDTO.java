package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Builder
@JsonAutoDetect
public class StudentDTO {

    private Long ID;

    private String name;

    private String surname;

    private String password;

    private String email;

    private UserType userType;

    private String phoneNumber;

    private List<SubjectDTO> studentSubjects;

    private List<TeacherDTO> studentFavouriteTeachers;

    private UserAddressDTO userAddress;

    private Boolean onPlace;
}
