package com.freeuni.daskalos.repository.entities;


import jakarta.persistence.*;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="teacher_to_experience", schema = "daskalos")
public class TeacherToExperience {

    @Id()
    @Column(name="ID")
    @SequenceGenerator(name = "idGenerator", schema="daskalos", sequenceName = "teacher_to_experience_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenerator")
    Long ID;

    @Basic
    @Column(name="teacher_id")
    Long teacherID;

    @Basic
    @Column(name="experience_id")
    Long experienceID;

}
