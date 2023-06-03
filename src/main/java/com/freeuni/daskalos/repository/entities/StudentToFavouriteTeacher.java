package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.*;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "student_to_favourite_teacher", schema = "daskalos")
@Builder
@Entity
public class StudentToFavouriteTeacher {

    @Id()
    @Column(name = "ID")
    @SequenceGenerator(name = "idGenerator", schema = "daskalos", sequenceName = "student_to_favourite_teacher_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenerator")
    Long ID;

    @Basic
    @Column(name = "student_id")
    Long studentID;

    @Basic
    @Column(name = "teacher_id")
    Long teacherID;
}