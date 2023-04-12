package com.freeuni.daskalos.repository.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.apache.logging.log4j.util.Strings;
import reactor.util.annotation.NonNull;
import reactor.util.annotation.Nullable;

import java.util.Date;
import java.util.Objects;

@Entity
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long ID;

    private String employer;

    private String jobDescription;

    private Date startDate;

    private Date endDate;

    public Experience(Long ID, @NonNull String employer, @Nullable String jobDescription, @NonNull Date startDate, @Nullable Date endDate) {
        this.ID = ID;
        this.employer = employer;
        this.jobDescription = !Objects.isNull(jobDescription) ? jobDescription : Strings.EMPTY;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Experience() {

    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    @NonNull
    public String getEmployer() {
        return employer;
    }

    public void setEmployer(@NonNull String employer) {
        this.employer = employer;
    }

    @NonNull
    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(@NonNull String jobDescription) {
        this.jobDescription = jobDescription;
    }

    @NonNull
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(@NonNull Date startDate) {
        this.startDate = startDate;
    }

    @Nullable
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(@Nullable Date endDate) {
        this.endDate = endDate;
    }
}
