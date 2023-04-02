import React from "react";
import styled from "styled-components";

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
            </Header>
            <Group>
                <ProfileImage src="https://file.rendit.io/n/abZR5YgvmYE642DpW2Ce.svg"/>
                <Group3>
                    <SubjectsContainer>
                        subjects: Subject1, cubject2, subject3
                    </SubjectsContainer>
                    <CurrentOccupation>Current working place 1</CurrentOccupation>
                    <PriorOccupation>
                        Current working place 2<br/>
                    </PriorOccupation>
                    <PriorOccupation>average rating 5.0/5.0</PriorOccupation>
                </Group3>
            </Group>
            <Group1>
                <FullName>name / second name</FullName>
                <Location1>Country, city</Location1>
            </Group1>
            <ProfileBio>personal info</ProfileBio>
            <Group2>
                <Group4>
                    <ProfileInfoField>
                        <PhoneNumberField>phone number: 0000000000000</PhoneNumberField>
                        <AddressField>
                            address : bla bla bla
                            <br/>
                        </AddressField>
                    </ProfileInfoField>
                    <AboutTitle>about</AboutTitle>
                    <AboutContainer>
                        <AboutContent>
                            bla bla bla bla bla bla bla bla bla bla bla
                        </AboutContent>
                    </AboutContainer>
                </Group4>
                <Calendar src="https://file.rendit.io/n/nW9w16yCUimarohagWmR.svg"/>
            </Group2>
            <ExperienceSection>Experience</ExperienceSection>
            <CommentSection>comments section</CommentSection>
        </ProfilePageContainerRootRoot>
    );
};

const PriorOccupation = styled.div`
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  text-align: right;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const ProfilePageContainerRootRoot = styled.div`
  gap: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 0px 281px 0px;
  border-width: 1px;
  border-style: solid;
  border-color: #000000;
  box-sizing: border-box;
  background-color: #fdfffa;
`;
const Header = styled.div`
  width: 100.1%;
  gap: 56px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 0px 122px -1px;
  padding: 7.7px 17px;
  box-sizing: border-box;
  background-color: #ffef9a;
`;
const WebsiteLogo = styled.img`
  min-width: 0px;
  min-height: 0px;
  margin: 0px 1013px 0.92px 0px;
  box-sizing: border-box;
`;
const ProfileNavigationButton = styled.button`
  width: 6.99%;
  height: 124px;
  margin: 42.3px 0px 0px 0px;
  padding: 0px;
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
  width: 6.99%;
  height: 124px;
  margin: 42.3px 0px 0px 0px;
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
const Group = styled.div`
  width: 93.01%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-end;
  align-items: flex-start;
  margin: 0px 63px 5px 0px;
  box-sizing: border-box;
`;
const ProfileImage = styled.img`
  min-width: 0px;
  min-height: 0px;
  box-sizing: border-box;
  mix-blend-mode: multiply;
`;
const Group3 = styled.div`
  width: 46.52%;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 14px 0px 0px 0px;
  box-sizing: border-box;
`;
const SubjectsContainer = styled.div`
  align-self: stretch;
  margin: 0px 0px 40px 0px;
  color: #6a60a6;
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  text-align: right;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const CurrentOccupation = styled.div`
  margin: 0px 0px 43px 0px;
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  text-align: right;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Group1 = styled.div`
  width: 701px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 0px 0px 0px 71px;
  padding: 74px 0px 0px 0px;
  box-sizing: border-box;
`;
const FullName = styled.div`
  width: 701px;
  height: 76px;
  left: 0px;
  top: 0px;
  position: absolute;
  align-self: stretch;
  color: #695fa5;
  font-size: 64px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 4.16px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Location1 = styled.div`
  position: relative;
  color: #6a60a6;
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const ProfileBio = styled.div`
  margin: 0px 0px 13px 71px;
  color: #6a60a6;
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Group2 = styled.div`
  width: 93.64%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0px 0px 27px 59px;
  box-sizing: border-box;
`;
const Group4 = styled.div`
  width: 43.6%;
  gap: 39px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
`;
const ProfileInfoField = styled.div`
  width: 780px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-end;
  align-items: flex-start;
  padding: 64px 26px 104px 26px;
  box-sizing: border-box;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/mg4wuYLwYBWcGf9TVX0a.svg");
`;
const PhoneNumberField = styled.div`
  width: 511px;
  height: 38px;
  left: 26px;
  top: 130px;
  position: absolute;
  font-size: 32px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const AddressField = styled.div`
  position: relative;
  font-size: 32px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const AboutTitle = styled.div`
  margin: 0px 0px 8px 9px;
  color: #6a60a6;
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const AboutContainer = styled.div`
  width: 99.62%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 36px 27px 224px 27px;
  box-sizing: border-box;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/YyntBP1DcHb87vs13lmt.svg");
`;
const AboutContent = styled.div`
  width: 624px;
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Calendar = styled.img`
  width: 743px;
  min-width: 0px;
  height: 799px;
  min-height: 0px;
  flex-shrink: 0;
  align-self: flex-end;
  margin: 5px 0px 0px 0px;
  box-sizing: border-box;
`;
const ExperienceSection = styled.div`
  margin: 0px 0px 75px 71px;
  color: #6a60a6;
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const CommentSection = styled.div`
  margin: 0px 0px 0px 71px;
  color: #6a60a6;
  font-size: 40px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.6px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
