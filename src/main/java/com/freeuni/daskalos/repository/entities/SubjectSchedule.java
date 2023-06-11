package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.*;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class SubjectSchedule {

    @Id()
    @Column(name = "ID")
    @SequenceGenerator(name = "idGenerator", schema = "daskalos", sequenceName = "subject_schedule_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenerator")
    Long ID;

    @Basic
    @Column(name = "subject_id")
    Long subjectID;

    @Basic
    @Column(name = "monday")
    String monday;

    @Basic
    @Column(name = "tuesday")
    String tuesday;

    @Basic
    @Column(name = "wednesday")
    String wednesday;

    @Basic
    @Column(name = "thursday")
    String thursday;

    @Basic
    @Column(name = "friday")
    String friday;

    @Basic
    @Column(name = "saturday")
    String saturday;

    @Basic
    @Column(name = "sunday")
    String sunday;
}
