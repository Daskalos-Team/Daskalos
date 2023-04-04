import React from "react";
import styled from "styled-components";

export const NewsFeedPage = (props: any) => {
    const ProfileButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };
    const AccountButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };
    const SearchButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };
    const FavouriteFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };
    return (
        <NewsFeedPageRoot>
            <Header>
                <Logo src="https://file.rendit.io/n/lPwUIopu41wY2u9k18GO.png" />
                <ProfileButton
                    onClick={(e: any) => ProfileButtonFunction(e, "ProfileButton")}
                />
                <AccountButton
                    onClick={(e: any) => AccountButtonFunction(e, "AccountButton")}
                />
            </Header>
            <BelowHeader>
                <SearchButton
                    onClick={(e: any) => SearchButtonFunction(e, "SearchButton")}
                >
                    <SearchLabel>ძებნა</SearchLabel>
                    <DropDownArrow src="https://file.rendit.io/n/axgFbCb9Vay0sesgfUVr.svg" />
                </SearchButton>
                <TeacherFeedLabel>თქვენთვის რეკომენდირებული მასწავლებლები</TeacherFeedLabel>
            </BelowHeader>
            <Content>
                <LeftPanel>
                    <Top10Label>Top 10</Top10Label>
                    <Top10>
                        <TopTeacher/>
                        <TopTeacher/>
                        <TopTeacher/>
                        <TopTeacher/>
                        <TopTeacher/>
                        <TopTeacher/>
                        <TopTeacher/>
                        <TopTeacher/>
                        <TopTeacher/>
                        <TopTeacher/>
                    </Top10>
                </LeftPanel>
                <NewsFeed>
                    <TeacherRecommendation>
                        <TeacherRecommendationTop>
                            <ProfilePicture />
                            <TeacherRecommendationTopRight>
                                <Name>Name</Name>
                                <Subjects>Subjects</Subjects>
                                <SubjectList>
                                    subject 1<br />
                                    subject 2<br />
                                    subject 3<br />
                                    subject 4
                                </SubjectList>
                            </TeacherRecommendationTopRight>
                        </TeacherRecommendationTop>
                        <DescriptionLabel>Description</DescriptionLabel>
                        <DescriptionTextfield>
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </DescriptionTextfield>
                        <TeacherRecommendationBottom>
                            <PriceRangeLabel>Price Range:</PriceRangeLabel>
                            <PriceRangeValue>####-####</PriceRangeValue>
                            <Favourite onClick={(e: any) => FavouriteFunction(e, "Favourite")}
                                src="https://file.rendit.io/n/5kEWfvFar2LDdSgJDzHh.svg" />
                        </TeacherRecommendationBottom>
                    </TeacherRecommendation>
                    <TeacherRecommendation/>
                    <TeacherRecommendation/>
                    <TeacherRecommendation/>
                    <TeacherRecommendation/>
                    <TeacherRecommendation/>
                    <TeacherRecommendation/>
                    <TeacherRecommendation/>
                </NewsFeed>
            </Content>
            <Footer>
                <ContactInfo>
                    <ContactInfoLabel>საკონაქტო ინფორმაცია</ContactInfoLabel>
                    <ContactInfoData>
                        <PhoneNumber>ტელ:5** ** ** **</PhoneNumber>
                        <Email>e-mail:***@***.***</Email>
                    </ContactInfoData>
                </ContactInfo>
                <DaskalosLabel>Daskalos</DaskalosLabel>
            </Footer>
        </NewsFeedPageRoot>
    );
};

const NewsFeedPageRoot = styled.div`
  width: 100%;
  gap: 12.6px;
  background-color: #ffffff;
  overflow: hidden;
`;
const Header = styled.div`
  width: 100%;
  height: 170px;
  position: relative;
  box-sizing: border-box;
  background-color: #ffef9a;
  overflow: hidden;
`;
const Logo = styled.img`
  width: 240px;
  height: 112px;
  margin-left: 20px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  box-sizing: border-box;
`;
const ProfileButton = styled.button`
  width: 62px;
  height: 62px;
  top: 30%;
  right: 110px;
  position: absolute;
  align-self: end;
  flex-shrink: 0;
  padding: 0;
  border-width: 0;
  box-sizing: content-box;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/uKXogKCeJwQL1wrKdkuV.svg");
  cursor: pointer;
  transform: translateY(-50%);
  &:hover {
    box-shadow: inset 0 0 100px 100px #ffef9a30;
  } ;
`;
const AccountButton = styled.button`
  width: 62px;
  height: 62px;
  right: 22px;
  top: 30%;
  position: absolute;
  flex-shrink: 0;
  vertical-align: center;
  padding: 0;
  border-width: 0;
  box-sizing: content-box;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/oeLNFbM0EF4spQjBirvI.svg");
  cursor: pointer;
  transform: translateY(-50%);
  &:hover {
    box-shadow: inset 0 0 100px 100px #ffef9a40;
  } ;
`;
const BelowHeader = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  border-bottom: #00000010 solid 2px;
`;
const SearchButton = styled.button`
  width: 100px;
  left: 40px;
  top: 50%;
  position: relative;
  padding: 25px 60px 25px;
  border-width: 0;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #ece9e9;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  };
`;
const SearchLabel = styled.div`
  width: 77.9%;
  height: 85%;
  left: 23.891143798828125px;
  top: 50%;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: Noto Serif Georgian;
  text-align: center;
  letter-spacing: 1.63px;
  text-transform: uppercase;
  box-sizing: border-box;
  transform: translateY(-50%);
`;
const DropDownArrow = styled.img`
  width: 25px;
  top: 50%;
  right: 10%;
  position: absolute;
  box-sizing: border-box;
  transform: translateY(-50%);
`;
const TeacherFeedLabel = styled.p`
  font-family: "Noto Serif Georgian";
  font-weight: bold;
  font-size: 27px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: max(30%, 270px);
  width: max(75%, 500px);
  max-height: 80px;
  padding-right: 50px;
  overflow-x: hidden;
  overflow-y: hidden;
  transform: translateY(-50%);
`;
const Content = styled.div`
  height: 1000px;
  margin: 20px 20px 20px 0;
  display: flex;
`;
const LeftPanel = styled.div`
  margin-right: 30px;
  height: 100%;
  flex-basis: 28%;
  min-width: 220px;
`;
const Top10Label = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  align-self: center;
  font-size: 30px;
  font-family: Archivo Black;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
  border: red 2px solid;
  border-radius: 20px;
  background-color: #ff000070;
`;
const Top10 = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const TopTeacher = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
  height: 50px;
  align-self: flex-end;
  border-radius: 40px;
  box-sizing: border-box;
  background-color: #f7f6f6;
`;
const NewsFeed = styled.div`
  min-width: 500px;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 72%;
  align-content: start;
  justify-content: space-evenly;
  scroll-behavior: auto;
  overflow-y: scroll;
  padding: 5px;
  margin-bottom: 10px;
  border-left: 2px solid #9c9c9c40;
  border-radius: 50px;
`;
const TeacherRecommendation = styled.div`
  width: 450px;
  height: 350px;
  padding: 21px 19px 26px 19px;
  margin: 10px;
  border-width: 1px;
  border-radius: 30px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  background-color: #f6f6f6;
  overflow: hidden;
`;
const TeacherRecommendationTop = styled.div`
  width: 98.25%;
  gap: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0 6px 2px;
  box-sizing: border-box;
`;
const ProfilePicture = styled.div`
  width: 170px;
  height: 150px;
  border-radius: 30px;
  background-color: #d9d9d9;
`;
const TeacherRecommendationTopRight = styled.div`
  width: 56.32%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  box-sizing: border-box;
`;
const Name = styled.p`
  width: 100%;
  height: 24.42%;
  margin: 0 0 2px 0;
  font-size: 22px;
  font-weight: 700;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Subjects = styled.p`
  width: 100%;
  height: 18%;
  font-size: 19px;
  font-weight: 600;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const SubjectList = styled.div`
  width: 100%;
  height: 57%;
  font-size: 14px;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const DescriptionLabel = styled.div`
  width: 52%;
  height: 8%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0 0 2px;
  font-size: 16px;
  font-weight: 600;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const DescriptionTextfield = styled.p`
  width: 100%;
  height: 33%;
  margin: 5px 0 5px 0;
  padding: 5px;
  font-size: 13px;
  font-family: Inter;
  overflow-y: scroll;
  word-wrap: break-word;
  border-left: 2px solid #9c9c9c40;
  border-radius: 10px;
  box-sizing: border-box;
`;
const TeacherRecommendationBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 0 0;
  box-sizing: border-box;
`;
const PriceRangeLabel = styled.div`
  width: 170px;
  height: 100%;
  margin-top: 5px;
  font-size: 13px;
  font-family: Inter;
  box-sizing: border-box;
`;
const PriceRangeValue = styled.div`
  width: 170px;
  height: 100%;
  margin: 5px 244px 0 0;
  font-size: 13px;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Favourite = styled.img`
  width: 23px;
  align-self: flex-end;
  margin: 2px 0 5px 0;
  box-sizing: border-box;
  cursor: pointer;
`;
const Footer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  padding: 20.6px 196px 20.6px 89.2px;
  box-sizing: border-box;
  background-color: #ffef9a;
  overflow: hidden;
`;
const ContactInfo = styled.div`
  width: 199%;
  gap: 15.7px;
  top: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 15px 0 12px 0;
  box-sizing: border-box;
`;
const ContactInfoLabel = styled.div`
  width: 170px;
  align-self: stretch;
  font-size: 15px;
  font-family: Noto Serif Georgian;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const ContactInfoData = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: stretch;
  box-sizing: border-box;
`;
const PhoneNumber = styled.div`
  height: 41px;
  font-size: 15px;
  font-family: Noto Serif Georgian;
  white-space: nowrap;
  letter-spacing: 2px;
  text-align: start;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Email = styled.div`
  font-size: 15px;
  font-family: Noto Serif Georgian;
  text-align: start;
  white-space: nowrap;
  letter-spacing: 1.95px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const DaskalosLabel = styled.div`
  left: max(30%, 300px);
  top: 50%;
  position: absolute;
  color: #626262;
  font-size: 90px;
  font-family: Inika;
  -webkit-text-stroke-color: transparent;
  -webkit-text-stroke-width: 6px;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 44.2px;
  text-transform: uppercase;
  -webkit-background-clip: text;
  box-sizing: border-box;
  background-image: linear-gradient(180deg, #000000 0%, #000000 100%);
  transform: translateY(-50%);
`;
