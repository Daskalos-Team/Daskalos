package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.*;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="teacher_to_subject", schema = "daskalos")
public class TeacherToSubject {

    @Id()
    @Column(name="ID")
    @SequenceGenerator(name = "idGenerator", schema="daskalos", sequenceName = "teacher_to_subject_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenerator")
    private long ID;

    @Basic
    @Column(name="teacher_id")
    private long teacherID;

    @Basic
    @Column(name="subject_id")
    private long subjectID;

}