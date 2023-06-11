package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.*;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "subject_schedule", schema = "daskalos")
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
    @Column(name = "start_time")
    String startTime;

    @Basic
    @Column(name = "end_time")
    String endTime;
}
