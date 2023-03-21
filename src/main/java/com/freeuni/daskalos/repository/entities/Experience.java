package com.freeuni.daskalos.repository.entities;


import org.apache.logging.log4j.util.Strings;
import reactor.util.annotation.NonNull;
import reactor.util.annotation.Nullable;

import java.util.Date;
import java.util.Objects;

public class Experience {

    private int ID;

    @NonNull
    private String employer;

    @NonNull
    private String jobDescription;

    @NonNull
    private Date startDate;

    @Nullable
    private Date endDate;


    public Experience(int ID, @NonNull String employer, @Nullable String jobDescription, @NonNull Date startDate, @Nullable Date endDate) {
        this.ID = ID;
        this.employer = employer;
        this.jobDescription = !Objects.isNull(jobDescription) ? jobDescription : Strings.EMPTY;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public int getID() {
        return this.ID;
    }

    @NonNull
    public String getEmployer() {
        return this.employer;
    }

    @NonNull
    public String getJobDescription() {
        return this.jobDescription;
    }

    @NonNull
    public Date getStartDate() {
        return this.startDate;
    }

    @Nullable
    public Date getEndDate() {
        return this.endDate;
    }
}