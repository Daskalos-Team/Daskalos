package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class FilterDTO {

    private Integer minPrice;

    private Integer maxPrice;

    private Boolean favouritesOnly;

    private Boolean onPlace;

    private List<String> subjectsOnly;

    private String name;

    private String surname;

    private UserAddressDTO userAddressDTO;

    private Integer radius;
}
