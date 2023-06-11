package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.*;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "subject", schema = "daskalos")
@Builder
@Entity
public class Subject {

    @Id()
    @Column(name = "ID")
    @SequenceGenerator(name = "idGenerator", schema = "daskalos", sequenceName = "subject_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenerator")
    private Long ID;

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "description")
    private String description;

    @Basic
    @Column(name = "price")
    private Integer price;
}
