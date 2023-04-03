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
    return (
        <NewsFeedPageRootRootRoot>
            <Header>
                <Logo src="https://file.rendit.io/n/lPwUIopu41wY2u9k18GO.png" />
                <ProfileButton
                    onClick={(e: any) => ProfileButtonFunction(e, "ProfileButton")}
                />
                <AccountButton
                    onClick={(e: any) => AccountButtonFunction(e, "AccountButton")}
                />
            </Header>
            <Horizontal>
                <Rectangles>
                    <SearchButton
                        onClick={(e: any) => SearchButtonFunction(e, "SearchButton")}
                    >
                        <SearchLabel>ძებნა</SearchLabel>
                        <DropDownArrow src="https://file.rendit.io/n/axgFbCb9Vay0sesgfUVr.svg" />
                    </SearchButton>
                    <TopLabel>Top 10</TopLabel>
                    <Rectangle />
                    <Rectangle />
                </Rectangles>
                <TeacherPage5>
                    <Group>
                        <ProfilePicture5 />
                        <Group3>
                            <Name6>Name</Name6>
                            <Subjects5>Subjects</Subjects5>
                            <SubjectList5>
                                subject 1<br />
                                subject 2<br />
                                subject 3<br />
                                subject 4
                            </SubjectList5>
                        </Group3>
                    </Group>
                    <Description5>Description</Description5>
                    <DescriptionTextfield5>
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </DescriptionTextfield5>
                    <Group4>
                        <PriceRangeText10>Price Range</PriceRangeText10>
                        <PriceRangeText11>####-####</PriceRangeText11>
                        <Heart5 src="https://file.rendit.io/n/5kEWfvFar2LDdSgJDzHh.svg" />
                    </Group4>
                </TeacherPage5>
                <TeacherPage5>
                    <Group>
                        <ProfilePicture5 />
                        <Group3>
                            <Name6>Name</Name6>
                            <Subjects5>Subjects</Subjects5>
                            <SubjectList5>
                                subject 1<br />
                                subject 2<br />
                                subject 3<br />
                                subject 4
                            </SubjectList5>
                        </Group3>
                    </Group>
                    <Description5>Description</Description5>
                    <DescriptionTextfield5>
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </DescriptionTextfield5>
                    <Group4>
                        <PriceRangeText10>Price Range</PriceRangeText10>
                        <PriceRangeText11>####-####</PriceRangeText11>
                        <Heart5 src="https://file.rendit.io/n/5kEWfvFar2LDdSgJDzHh.svg" />
                    </Group4>
                </TeacherPage5>
            </Horizontal>
            <Horizontal1>
                <Rectangles1>
                    <Rectangle2 />
                    <Rectangle3 />
                    <Rectangle9 />
                    <Rectangle4 />
                </Rectangles1>
                <TeacherPage5>
                    <Group>
                        <ProfilePicture5 />
                        <Group3>
                            <Name6>Name</Name6>
                            <Subjects5>Subjects</Subjects5>
                            <SubjectList5>
                                subject 1<br />
                                subject 2<br />
                                subject 3<br />
                                subject 4
                            </SubjectList5>
                        </Group3>
                    </Group>
                    <Description5>Description</Description5>
                    <DescriptionTextfield5>
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </DescriptionTextfield5>
                    <Group4>
                        <PriceRangeText10>Price Range</PriceRangeText10>
                        <PriceRangeText11>####-####</PriceRangeText11>
                        <Heart5 src="https://file.rendit.io/n/5kEWfvFar2LDdSgJDzHh.svg" />
                    </Group4>
                </TeacherPage5>
                <TeacherPage5>
                    <Group>
                        <ProfilePicture5 />
                        <Group3>
                            <Name6>Name</Name6>
                            <Subjects5>Subjects</Subjects5>
                            <SubjectList5>
                                subject 1<br />
                                subject 2<br />
                                subject 3<br />
                                subject 4
                            </SubjectList5>
                        </Group3>
                    </Group>
                    <Description5>Description</Description5>
                    <DescriptionTextfield5>
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </DescriptionTextfield5>
                    <Group4>
                        <PriceRangeText10>Price Range</PriceRangeText10>
                        <PriceRangeText11>####-####</PriceRangeText11>
                        <Heart5 src="https://file.rendit.io/n/5kEWfvFar2LDdSgJDzHh.svg" />
                    </Group4>
                </TeacherPage5>
            </Horizontal1>
            <Horizontal2>
                <Rectangles2>
                    <Rectangle />
                    <Rectangle6 />
                    <Rectangle />
                    <Rectangle />
                </Rectangles2>
                <TeacherPage5>
                    <Group>
                        <ProfilePicture5 />
                        <Group3>
                            <Name6>Name</Name6>
                            <Subjects5>Subjects</Subjects5>
                            <SubjectList5>
                                subject 1<br />
                                subject 2<br />
                                subject 3<br />
                                subject 4
                            </SubjectList5>
                        </Group3>
                    </Group>
                    <Description5>Description</Description5>
                    <DescriptionTextfield5>
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </DescriptionTextfield5>
                    <Group4>
                        <PriceRangeText10>Price Range</PriceRangeText10>
                        <PriceRangeText11>####-####</PriceRangeText11>
                        <Heart5 src="https://file.rendit.io/n/5kEWfvFar2LDdSgJDzHh.svg" />
                    </Group4>
                </TeacherPage5>
                <TeacherPage5>
                    <Group>
                        <ProfilePicture5 />
                        <Group3>
                            <Name6>Name</Name6>
                            <Subjects5>Subjects</Subjects5>
                            <SubjectList5>
                                subject 1<br />
                                subject 2<br />
                                subject 3<br />
                                subject 4
                            </SubjectList5>
                        </Group3>
                    </Group>
                    <Description5>Description</Description5>
                    <DescriptionTextfield5>
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </DescriptionTextfield5>
                    <Group4>
                        <PriceRangeText10>Price Range</PriceRangeText10>
                        <PriceRangeText11>####-####</PriceRangeText11>
                        <Heart5 src="https://file.rendit.io/n/5kEWfvFar2LDdSgJDzHh.svg" />
                    </Group4>
                </TeacherPage5>
            </Horizontal2>
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
        </NewsFeedPageRootRootRoot>
    );
};

const Rectangle = styled.div`
  width: 100%;
  height: 116px;
  flex-shrink: 0;
  border-radius: 40px;
  box-sizing: border-box;
  background-color: #f7f6f6;
`;
const TeacherPage5 = styled.div`
  width: 612px;
  height: 541px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 21px 19px 26px 19px;
  border-width: 1px;
  border-radius: 30px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  background-color: #f6f6f6;
  overflow: hidden;
`;
const Group = styled.div`
  width: 98.25%;
  gap: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0 6px 2px;
  box-sizing: border-box;
`;
const ProfilePicture5 = styled.div`
  width: 43.68%;
  height: 228px;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: #d9d9d9;
`;
const Group3 = styled.div`
  width: 56.32%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  box-sizing: border-box;
`;
const Name6 = styled.div`
  width: 99.66%;
  height: 24.42%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 2px 0;
  font-size: 33px;
  font-weight: 700;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Subjects5 = styled.div`
  width: 99.66%;
  height: 17.97%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-self: flex-start;
  align-items: center;
  font-size: 23px;
  font-weight: 600;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const SubjectList5 = styled.div`
  width: 99.66%;
  height: 56.68%;
  font-size: 18px;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Description5 = styled.div`
  width: 51.22%;
  height: 7.93%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0 2px;
  font-size: 23px;
  font-weight: 600;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const DescriptionTextfield5 = styled.div`
  width: 99.65%;
  height: 33.33%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-self: flex-end;
  align-items: center;
  margin: 0 0 10px 0;
  font-size: 18px;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Group4 = styled.div`
  width: 97.55%;
  gap: 13px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0 0 2px;
  box-sizing: border-box;
`;
const PriceRangeText10 = styled.div`
  width: 23.48%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const PriceRangeText11 = styled.div`
  width: 23.48%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 244px 0 0;
  font-size: 18px;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Heart5 = styled.img`
  width: 7.31%;
  min-width: 0;
  max-width: 100%;
  min-height: 0;
  align-self: flex-end;
  margin: 0 0 0.51px 0;
  box-sizing: border-box;
`;
const NewsFeedPageRootRootRoot = styled.div`
  gap: 12.6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: hidden;
`;
const Header = styled.div`
  width: 100%;
  gap: 56px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-self: stretch;
  align-items: flex-start;
  margin: 0 0 35.5px 0;
  padding: 39.3px 50px 39.3px 35.7px;
  box-sizing: border-box;
  background-color: #ffef9a;
  overflow: hidden;
`;
const Logo = styled.img`
  min-width: 0;
  min-height: 0;
  margin: 0 1021px 2.9px 0;
  box-sizing: border-box;
`;
const ProfileButton = styled.button`
  width: 124px;
  height: 122px;
  flex-shrink: 0;
  margin: 9.83px 0 0 0;
  padding: 0;
  border-width: 0;
  box-sizing: content-box;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/uKXogKCeJwQL1wrKdkuV.svg");
  cursor: pointer;
  //&: hover {
  //  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  //} ;
`;
const AccountButton = styled.button`
  width: 124px;
  height: 122px;
  flex-shrink: 0;
  margin: 9.83px 0 0 0;
  padding: 0;
  border-width: 0;
  box-sizing: content-box;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/oeLNFbM0EF4spQjBirvI.svg");
  cursor: pointer;
  //&: hover {
  //  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  //} ;
`;
const Horizontal = styled.div`
  width: 96.01%;
  gap: 43px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
`;
const Rectangles = styled.div`
  width: 30.08%;
  gap: 25.4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-end;
  margin: 5px 29px 0 0;
  box-sizing: border-box;
`;
const SearchButton = styled.button`
  width: 81.45%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
  align-items: flex-end;
  margin: 0 0 52.2px 0;
  padding: 27.4px 91.5px 46.2px;
  border-width: 0;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #ece9e9;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;

  //&: hover {
  //  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  //}
;
`;
const SearchLabel = styled.div`
  width: 77.9%;
  height: 85%;
  left: 23.891143798828125px;
  top: 7px;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-family: Noto Serif Georgian;
  text-align: center;
  letter-spacing: 1.63px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const DropDownArrow = styled.img`
  width: 10.19%;
  min-width: 0;
  max-width: 100%;
  min-height: 0;
  position: relative;
  box-sizing: border-box;
`;
const TopLabel = styled.div`
  align-self: flex-start;
  margin: 0 0 53.1px 170px;
  font-size: 54px;
  font-family: Archivo Black;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
`;
const Horizontal1 = styled.div`
  width: 96.22%;
  gap: 43px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0 7.73px -3.51px;
  box-sizing: border-box;
`;
const Rectangles1 = styled.div`
  width: 30.24%;
  gap: 25.4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-end;
  align-items: flex-start;
  margin: 12.8px 29px 0 0;
  box-sizing: border-box;
`;
const Rectangle2 = styled.div`
  width: 99.35%;
  height: 116px;
  flex-shrink: 0;
  align-self: flex-end;
  border-radius: 40px;
  box-sizing: border-box;
  background-color: #f7f6f6;
`;
const Rectangle3 = styled.div`
  width: 99.35%;
  height: 116px;
  flex-shrink: 0;
  margin: 0 0 0 1.75px;
  border-radius: 40px;
  box-sizing: border-box;
  background-color: #f7f6f6;
`;
const Rectangle9 = styled.div`
  width: 99.35%;
  height: 116px;
  flex-shrink: 0;
  border-radius: 40px;
  box-sizing: border-box;
  background-color: #f7f6f6;
`;
const Rectangle4 = styled.div`
  width: 99.35%;
  height: 116px;
  flex-shrink: 0;
  align-self: flex-end;
  border-radius: 40px;
  box-sizing: border-box;
  background-color: #f7f6f6;
`;
const Horizontal2 = styled.div`
  width: 96.01%;
  gap: 43px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0 32.5px 0;
  box-sizing: border-box;
`;
const Rectangles2 = styled.div`
  width: 30.08%;
  gap: 25.4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-end;
  margin: 5.08px 29px 0 0;
  box-sizing: border-box;
`;
const Rectangle6 = styled.div`
  width: 100%;
  height: 116px;
  flex-shrink: 0;
  border-radius: 40px;
  box-sizing: border-box;
  background-color: #f7f6f6;
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  align-items: flex-start;
  margin: 0 0 0 -4px;
  padding: 20.6px 196px 20.6px 89.2px;
  box-sizing: border-box;
  background-color: #ffef9a;
  overflow: hidden;
`;
const ContactInfo = styled.div`
  width: 19.09%;
  gap: 15.7px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 0 0 12.3px 0;
  box-sizing: border-box;
`;
const ContactInfoLabel = styled.div`
  width: 98.75%;
  margin: 0 1.76px 0 0;
  font-size: 30px;
  font-family: Noto Serif Georgian;
  text-align: center;
  letter-spacing: 1.95px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const ContactInfoData = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-self: stretch;
  padding: 40.7px 0 0 0;
  box-sizing: border-box;
`;
const PhoneNumber = styled.div`
  width: 275px;
  height: 41px;
  left: 22.45001220703125px;
  top: 0;
  position: absolute;
  font-size: 30px;
  font-family: Noto Serif Georgian;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 1.95px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Email = styled.div`
  position: relative;
  font-size: 30px;
  font-family: Noto Serif Georgian;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 1.95px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const DaskalosLabel = styled.div`
  margin: 3.89px 0 0 0;
  color: #626262;
  font-size: 130px;
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
`;
