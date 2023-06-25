package com.freeuni.daskalos.dto;

import lombok.*;

import java.io.Serializable;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SubjectScheduleDTO implements Serializable {

    Long ID;

    String start;

    String end;
}
