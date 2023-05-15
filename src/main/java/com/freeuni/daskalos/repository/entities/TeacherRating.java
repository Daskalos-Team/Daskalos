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
@Table(name = "teacher_rating", schema = "daskalos")
public class TeacherRating {

    @Id()
    @Column(name = "ID")
    @SequenceGenerator(name = "idGenerator", schema = "daskalos", sequenceName = "teacher_rating_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenerator")
    private Long ID;

    @Basic
    @Column(name = "student_id")
    private Long studentID;

    @Basic
    @Column(name = "student_comment")
    private String studentComment;

    @Basic
    @Column(name = "rating")
    private int rating;
}
