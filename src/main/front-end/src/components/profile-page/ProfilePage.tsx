import React from "react";
import styled from "styled-components";
import {Experience} from "./experience/Experience";
import {StudentComment} from "./student-comment/StudentComment";

export const ProfilePage = (props: any) => {

    const ProfileNavigationButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };

    const AccountNavigationButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };

    return (
        <ProfilePageContainerRootRoot>
            <Header>
                <WebsiteLogo src="https://file.rendit.io/n/ek3gDZei38I8w65o4fxE.png"/>
                <Buttons>
                    <ProfileNavigationButton
                        onClick={(e) =>
                            ProfileNavigationButtonFunction(e, "ProfileNavigationButton")
                        }
                    />
                    <AccountNavigationButton
                        onClick={(e) =>
                            AccountNavigationButtonFunction(e, "AccountNavigationButton")
                        }
                    />
                </Buttons>
            </Header>
            <ImagePersonalInfoGroup>
                <ProfileImage src="https://file.rendit.io/n/abZR5YgvmYE642DpW2Ce.svg"/>
                <SubjectJobRatingGroup>
                    <SubjectsContainer>
                        subjects: Subject1, subject2, subject3
                    </SubjectsContainer>
                    <CurrentWorkingPlaces>
                        <CurrentOccupation1>
                            Current working place 1
                        </CurrentOccupation1>
                        <CurrentOccupation2>
                            Current working place 2<br/>
                        </CurrentOccupation2>
                    </CurrentWorkingPlaces>
                    <AverageRating>
                        average rating 5.0/5.0
                    </AverageRating>
                </SubjectJobRatingGroup>
            </ImagePersonalInfoGroup>
            <NameCityGroup>
                <FullName>name / second name</FullName>
                <Location1>Country, city</Location1>
            </NameCityGroup>
            <LeftComponentGroup>
                <ProfileBio>personal info</ProfileBio>
                <PersonalInfoCompGroup>
                    <PhoneNumberField>
                        phone number: 0000000000000
                    </PhoneNumberField>
                    <AddressField>
                        address : bla bla bla
                        <br/>
                    </AddressField>
                </PersonalInfoCompGroup>
                <AboutComponent>
                    <AboutTitle>about</AboutTitle>
                    <AboutContent>
                        bla bla bla bla bla bla bla bla bla bla bla
                        <br/>
                        bla bla bla bla bla bla bla bla bla bla bla
                        <br/>
                        bla bla bla bla bla bla bla bla bla bla bla
                    </AboutContent>
                </AboutComponent>
            </LeftComponentGroup>
            <Calendar src="https://file.rendit.io/n/nW9w16yCUimarohagWmR.svg"/>
            <ExperienceTitle>Experience</ExperienceTitle>
            <ExperienceSection>
                <Experience>
                    Job Position: {"DEV"}
                    Employer: {"TBC"}
                    Job Duration: {"6 months"}
                    Job Summary: {"bla bla bla bla bla"}
                </Experience>
            </ExperienceSection>
            <CommentTitle>comments section</CommentTitle>
            <StudentCommentSection>
                <StudentComment>
                    Name1: {"student name"}
                    Rating: {"student rating"}
                    SecondName: {"second name"}
                </StudentComment>
            </StudentCommentSection>
        </ProfilePageContainerRootRoot>
    );
};

const CurrentOccupation2 = styled.div`
  font-family: Abhaya Libre Medium;
  text-align: right;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const AverageRating = styled.div`
  font-size: 1.5em;
  font-family: Abhaya Libre Medium;
  text-align: right;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;

const ProfilePageContainerRootRoot = styled.div`
  gap: 3em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-width: 1px;
  border-style: solid;
  border-color: #000000;
  box-sizing: border-box;
  background-color: #fdfffa;
`;
const Header = styled.div`
  width: 100.1%;
  max-height: 10em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 0px 122px -1px;
  padding: 7.7px 17px;
  box-sizing: border-box;
  background-color: #ffef9a;
`;
const Buttons = styled.div`

`;
const WebsiteLogo = styled.img`
  max-width: 10em;
  max-height: 10em;
  margin-top: 0px; 
  box-sizing: border-box;
`;
const ProfileNavigationButton = styled.button`
  width: 5em;
  height: 5em;
  padding: 0px;
  margin-right: 1em;
  border-width: 0px;
  box-sizing: content-box;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/PgUJaTVIXc1rDQGRfrH7.svg");
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const AccountNavigationButton = styled.button`
  width: 5em;
  height: 5em;
  padding: 0px;
  border-width: 0px;
  box-sizing: content-box;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/wGKEjHFvkzSMJEQiCx7a.svg");
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const ImagePersonalInfoGroup = styled.div`
  width: 93.01%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: flex-start;
  box-sizing: border-box;
`;
const ProfileImage = styled.img`
  width: 15em;
  height: 15em;
  margin-top: -7em;
  box-sizing: initial;
  mix-blend-mode: normal;
  margin-left: 4em;
`;
const SubjectJobRatingGroup = styled.div`
  width: 46.52%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  box-sizing: border-box;
`;
const SubjectsContainer = styled.div`
  align-self: stretch;
  color: #6a60a6;
  font-size: 2em;
  margin-top: -2em;
  margin-bottom: 2em;
  font-family: Abhaya Libre Medium;
  text-align: right;
  white-space: nowrap;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const CurrentWorkingPlaces = styled.div`
    font-size: 1.5em;
`;
const CurrentOccupation1 = styled.div`
  font-family: Abhaya Libre Medium;
  text-align: right;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const NameCityGroup = styled.div`
  text-align: right;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 2.5em;
  box-sizing: border-box;
`;
const FullName = styled.div`
  width: 30rem;
  height: 3rem;
  margin-top: 2em;
  margin-bottom: 2em;
  margin-left: 0.5em;
  position: absolute;
  align-self: stretch;
  color: #695fa5;
  font-size: 2em;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 4.16px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Location1 = styled.div`
  position: relative;
  color: #6a60a6;
  margin-left: 4.5rem;
  font-size: 2em;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const ProfileBio = styled.div`
  color: #6a60a6;  
  margin-top: 3rem;
  margin-bottom: 2em;
  margin-left: 3.4em;
  align-self: flex-start;
  font-size: 1.5em;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const LeftComponentGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;
const PersonalInfoCompGroup = styled.div`
  margin-left: -1.2em;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: flex-start;
  box-sizing: border-box;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/mg4wuYLwYBWcGf9TVX0a.svg");
`;
const PhoneNumberField = styled.div`
  width: 5em;
  height: 2rem;
  margin-left: 2rem;
  margin-top: 3em;
  position: absolute;
  font-size: 1.5em;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const AddressField = styled.div`
  margin-top: 2rem;
  margin-bottom: 100px;
  margin-right: 150px;
  margin-left: 2rem;
  position: relative;
  font-size: 1.5em;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;

const AboutComponent = styled.div`
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-top: 2em;
    margin-left: 3em;
`;
const AboutTitle = styled.div`
  margin-bottom: 10rem;
  margin-left: 2rem;    
  margin-bottom: 2rem;
  color: #6a60a6;
  font-size: 1.5rem;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const AboutContent = styled.div`
  padding: 1em;
  margin-left: 2.5em;
  font-size: 1.5em;
  font-family: Abhaya Libre Medium;
  text-transform: uppercase;
  box-sizing: border-box;
  border: #6A60A6 3.5px solid; 
  background-color: #EBEAEA;
  border-radius: 30px;
`;
const Calendar = styled.img`
  width: 30em;
  height: 30em;
  margin-top: -40rem;
  margin-right: 5rem;
  min-height: 0px;
  flex-shrink: 0;
  align-self: flex-end;
  box-sizing: border-box;
`;
const ExperienceTitle = styled.div`
  color: #6a60a6;
  font-size: 1.5rem;
  max-width: 40rem;
  margin-left: 5rem;
  margin-top: 5em;
  font-family: Abhaya Libre Medium;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const ExperienceSection = styled.div`
    margin-left: 6.8em;
`;
const CommentTitle = styled.div`
  color: #6a60a6;
  font-size: 1.5rem;
  margin-left: 5rem;
  margin-top: 1em;
  margin-bottom: 1em;
  max-width: 40rem;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const StudentCommentSection = styled.div`
  margin-left: 6.8em;
`;