import React, { useState } from "react";
import styled from "styled-components";
import {
    NewsFeedPageColorPalette,
    RecommendedTeacherProps, RecommendedTeacherScaleProps
} from "../news-feed-page-service/NewsFeedPageOptionsConstants";

export const RecommendedTeacher = (props: RecommendedTeacherProps) => {
    const [imageSrc, setImageSrc] = useState(props.isFavourite ?
        "/images/news-feed-page/FavouriteSelected.png" : "/images/news-feed-page/FavouriteUnselected.png");
    const FavouriteFunction = () => {
        setImageSrc(imageSrc == "/images/news-feed-page/FavouriteUnselected.png" ?
            "images/news-feed-page/FavouriteSelected.png" :
            "/images/news-feed-page/FavouriteUnselected.png");
    };
    const SelectTeacher = () => {
        alert("Teacher Recommendation was clicked");
    };
    return (
        <RecommendedTeacherRoot rootScale={props.rootScale}>
            <RecommendedTeacherTop>
                <ProfilePicture src="/images/news-feed-page/TeachersIcon.png"
                    onClick={() => SelectTeacher()}/>
                <RecommendedTeacherTopRight>
                    <Name onClick={() => SelectTeacher()}>Name</Name>
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
            <DescriptionTextfield rootScale={props.rootScale}>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </DescriptionTextfield>
            <RecommendedTeacherBottom rootScale={props.rootScale}>
                <PriceRangeLabel>Price Range:</PriceRangeLabel>
                <PriceRangeValue>####-####</PriceRangeValue>
                <Favourite onClick={() => FavouriteFunction()}
                    src={imageSrc} alt="Heart"/>
            </RecommendedTeacherBottom>
        </RecommendedTeacherRoot>
    );
};

const CustomScrollbarComponent = styled.div`
  &::-webkit-scrollbar {
    width: .8rem;
  }
  &::-webkit-scrollbar-track {
    background: ${NewsFeedPageColorPalette.scrollbarTrackBG};
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${NewsFeedPageColorPalette.scrollbarThumbBG};
    background-clip: padding-box;
    border: .08rem solid transparent;
    border-radius: 20px;
  }
`;

const RecommendedTeacherRoot = styled.div<RecommendedTeacherScaleProps>`
  width: 450px;
  height: ${props => 360 / Math.pow(props.rootScale, 0.38)}px;
  padding: 21px 19px 26px 19px;
  margin: 10px;
  border-width: 1px;
  border-radius: 30px;
  border-style: solid;
  border-color: ${NewsFeedPageColorPalette.border};
  box-sizing: border-box;
  background: ${NewsFeedPageColorPalette.recommendedTeacherRootBG};
  overflow: hidden;
  color: darkblue;
`;

const RecommendedTeacherTop = styled.div`
  width: 100%;
  gap: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 2px;
  box-sizing: border-box;
`;

const ProfilePicture = styled.img`
  width: 170px;
  height: 150px;
  border: 5px solid skyblue;
  border-radius: 50%;
  box-shadow: 0 0 70px 10px ${NewsFeedPageColorPalette.recommendedTeacherPictureShadow};
  cursor: pointer;
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
  height: 65px;
  font-size: 22px;
  font-weight: 800;
  font-style: italic;
  text-decoration: black underline;
  line-height: normal;
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
  cursor: pointer;
`;

const SubjectsLabel = styled.p`
  width: 100%;
  height: 18%;
  font-size: 19px;
  font-weight: 600;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: default;
`;

const SubjectList = styled(CustomScrollbarComponent)`
  width: 100%;
  height: 55px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const Subject = styled.p`
  font-size: 16px;
  cursor: default;
`;

const DescriptionLabel = styled.div`
  width: 52%;
  height: 8%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 2px;
  font-size: 16px;
  font-weight: 600;
  font-family: Inter;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: default;
`;

const DescriptionTextfield = styled(CustomScrollbarComponent)<RecommendedTeacherScaleProps>`
  width: 100%;
  height: ${props => 90 / props.rootScale}px;
  margin: 5px 0 5px 0;
  padding: 5px;
  font-size: ${props => 1 / Math.pow(props.rootScale, 0.55)}rem;
  font-family: Inter;
  overflow-y: auto;
  word-wrap: break-word;
  border-left: 2px solid ${NewsFeedPageColorPalette.border};
  border-radius: 10px;
  box-sizing: border-box;
  background: ${NewsFeedPageColorPalette.recommendedTeacherDescriptionBG};
`;

const RecommendedTeacherBottom = styled.div<RecommendedTeacherScaleProps>`
  width: 100%;
  margin-top: 15px;
  padding-left: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${props => .8 / Math.pow(props.rootScale, 0.2)}rem;
  font-weight: 600;
`;

const PriceRangeLabel = styled.p`
  width: 100px;
  margin-right: 10px;
  overflow-y: hidden;
  text-wrap: normal;
  height: 100%;
  font-style: italic;
  box-sizing: border-box;
  cursor: default;
`;

const PriceRangeValue = styled.p`
  width: 120px;
  height: 100%;
  text-align: start;
  box-sizing: border-box;
  cursor: default;
`;

const Favourite = styled.img`
  width: 27px;
  margin-left: auto;
  box-sizing: border-box;
  cursor: pointer;
`;