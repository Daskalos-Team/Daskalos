package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name="experience", schema = "daskalos")
@Entity
public class Experience {

    @Id()
    @Column(name="ID")
    @SequenceGenerator(name = "idGenerator", schema="daskalos", sequenceName = "experience_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenerator")
    private Long ID;

    @Basic
    @Column(name="employer")
    private String employer;

    @Basic
    @Column(name="job_description")
    private String jobDescription;

    @Basic
    @Column(name="start_date")
    private Date startDate;

    @Basic
    @Column(name="end_date")
    private Date endDate;

}
