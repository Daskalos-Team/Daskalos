package com.freeuni.daskalos.repository.entities;

import reactor.util.annotation.NonNull;

import java.util.Date;

public class ExperienceBuilder {

    private int ID;

    private String employer;

    private String jobDescription;

    private Date startDate;

    private Date endDate;

    public ExperienceBuilder(@NonNull Experience experience) {
        this.ID = experience.getID();
        this.employer = experience.getEmployer();
        this.jobDescription = experience.getJobDescription();
        this.startDate = experience.getStartDate();
        this.endDate = experience.getEndDate();
    }

    public ExperienceBuilder setID(int ID) {
        this.ID = ID;
        return this;
    }

    public int getID() {
        return this.ID;
    }

    public ExperienceBuilder setEmployer(String employer) {
        this.employer = employer;
        return this;
    }

    public String getEmployer() {
        return this.employer;
    }

    public ExperienceBuilder setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
        return this;
    }

    public String getJobDescription() {
        return this.jobDescription;
    }

    public ExperienceBuilder setStartSDate(Date startDate) {
        this.startDate = startDate;
        return this;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public ExperienceBuilder setEndDate(Date endDate) {
        this.endDate = endDate;
        return this;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public Experience toExperience() {
        return new Experience(this.ID, this.employer, this.jobDescription, this.startDate, this.endDate);
    }
}