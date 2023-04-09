import React from "react";
import styled from "styled-components";

export const ExperienceComponent = (props: any) => {
    return (
        <Experience>
            <JobPosition>position</JobPosition>
            <br/>
            <EmployerName>company name</EmployerName>
            <br/>
            <JobDuration>from date - to date</JobDuration>
            <br/>
            <JobSummary>short job description</JobSummary>
            <br/>
        </Experience>
    );
};

export const Experience = styled.div`
  width: 50em;
  font-size: 1.5em;
  display: flex;
  margin-top: -1em;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1em;
  border-width: 5px;
  border-radius: 30px;
  border-style: solid;
  border-color: #6a60a6;
  box-sizing: border-box;
  background-color: #ffffff;
`;
const JobPosition = styled.div`
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const EmployerName = styled.div`
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const JobDuration = styled.div`
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const JobSummary = styled.div`
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
