package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.*;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "teacher_to_rating", schema = "daskalos")
public class TeacherToRating {

    @Id()
    @Column(name = "ID")
    @SequenceGenerator(name = "idGenerator", schema = "daskalos", sequenceName = "teacher_to_experience_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenerator")
    private long ID;

    @Basic
    @Column(name = "teacher_id")
    private long teacherID;

    @Basic
    @Column(name = "rating_id")
    private long ratingID;
}
