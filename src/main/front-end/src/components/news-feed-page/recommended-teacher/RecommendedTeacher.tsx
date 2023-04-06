import React from "react";
import styled from "styled-components";

export const RecommendedTeacher = (props: any) => {
    const FavouriteFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };
    return (
        <RecommendedTeacherRoot>
            <RecommendedTeacherTop>
                <ProfilePicture />
                <RecommendedTeacherTopRight>
                    <Name>Name</Name>
                    <SubjectsLabel>Subjects</SubjectsLabel>
                    <SubjectList>
                        <Subject>subject 1</Subject>
                        <Subject>subject 2</Subject>
                        <Subject>subject 3</Subject>
                        <Subject>subject 4</Subject>
                        <Subject>subject 5</Subject>
                        <Subject>subject 6</Subject>
                        <Subject>subject 7</Subject>
                        <Subject>subject 8</Subject>
                    </SubjectList>
                </RecommendedTeacherTopRight>
            </RecommendedTeacherTop>
            <DescriptionLabel>Description</DescriptionLabel>
            <DescriptionTextfield>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </DescriptionTextfield>
            <RecommendedTeacherBottom>
                <PriceRangeLabel>Price Range:</PriceRangeLabel>
                <PriceRangeValue>####-####</PriceRangeValue>
                <Favourite onClick={(e: any) => FavouriteFunction(e, "Favourite")}
                    src="/FavouriteUnselected.png" alt="Heart" />
            </RecommendedTeacherBottom>
        </RecommendedTeacherRoot>
    );
};

const RecommendedTeacherRoot = styled.div`
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
const RecommendedTeacherTop = styled.div`
  width: 100%;
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
const RecommendedTeacherTopRight = styled.div`
  width: 56%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  box-sizing: border-box;
`;
const Name = styled.p`
  width: 100%;
  height: 24%;
  font-size: 22px;
  font-weight: 700;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const SubjectsLabel = styled.p`
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
  height: 75px;
  overflow-y: auto;
  box-sizing: border-box;
`;
const Subject = styled.p`
  font-size: 16px;
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
  overflow-y: auto;
  word-wrap: break-word;
  border-left: 2px solid #9c9c9c40;
  border-radius: 10px;
  box-sizing: border-box;
`;
const RecommendedTeacherBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const PriceRangeLabel = styled.p`
  width: 80px;
  max-lines: 1;
  overflow-y: hidden;
  text-wrap: normal;
  height: 100%;
  font-size: 13px;
  font-family: Inter;
  box-sizing: border-box;
`;
const PriceRangeValue = styled.p`
  width: 80px;
  max-lines: 1;
  height: 100%;
  text-align: start;
  font-size: 13px;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const Favourite = styled.img`
  width: 23px;
  margin-left: auto;
  box-sizing: border-box;
  cursor: pointer;
`;