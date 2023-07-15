import React, { useState } from "react";
import styled, { Keyframes, keyframes } from "styled-components";
import {
    addFavourite, removeFavourite,
    NewsFeedPageColorPalette, RecommendationProfilePictureProps,
    RecommendationProps, RecommendationRootProps, RecommendationScaleProps, FavouriteProps
} from "../../../service/news-feed-page-service";
import { useNavigate } from "react-router-dom";

export const Recommendation = (props: RecommendationProps): React.JSX.Element => {
    const [imageSrc, setImageSrc] = useState(props.isFavourite ?
        "/images/news-feed-page/FavouriteSelected.png" : "/images/news-feed-page/FavouriteUnselected.png");
    const [favouriteAnimation, setFavouriteAnimation] = useState<Keyframes | null>(null);
    const navigate = useNavigate();

    const FavouriteFunction = () => {
        if (imageSrc == "/images/news-feed-page/FavouriteUnselected.png") {
            addFavourite(props.currUserId, props.userId);
            setFavouriteAnimation(spinClockwise);
        } else {
            removeFavourite(props.currUserId, props.userId);
            setFavouriteAnimation(spinCounterClockwise);
        }
        setImageSrc(imageSrc == "/images/news-feed-page/FavouriteUnselected.png" ?
            "images/news-feed-page/FavouriteSelected.png" :
            "/images/news-feed-page/FavouriteUnselected.png");
    };
    const SelectRecommendation = () => {
        navigate(`/${props.userId}/${props.userType}/`);
    };
    const defaultImage = () => {
        let icon = "../../images/news-feed-page/";
        icon += props.userType === "TEACHER" ? "TeachersIcon.png" : "StudentIcon.png";
        return icon;
    };
    return (
        <RecommendationRoot userType={props.userType} rootScale={props.rootScale}>
            <RecommendationTop>
                <ProfilePicture userType={props.userType} src={props.profileImage || defaultImage()}
                    onClick={() => SelectRecommendation()}/>
                <RecommendationTopRight>
                    <Name onClick={() => SelectRecommendation()}>{props.name + " " + props.surname}</Name>
                    <UserTypeLabel>{props.userType == "STUDENT" ? "სტუდენტი" : "მასწავლებელი"}</UserTypeLabel>
                    <SubjectList>
                        {props.subjects.map(s => (
                            <Subject key={s}>{s}</Subject>
                        ))}
                    </SubjectList>
                </RecommendationTopRight>
            </RecommendationTop>
            <DescriptionLabel>აღწერა</DescriptionLabel>
            <DescriptionTextField rootScale={props.rootScale}>
                {props.description}
            </DescriptionTextField>
            {props.userType == "TEACHER" && (
                <RecommendationBottom rootScale={props.rootScale}>
                    <RatingLabel>რეიტინგი:</RatingLabel>
                    <RatingValue>{props.rating.toFixed(1) + "/10.0"}</RatingValue>
                    {props.currUserType == "STUDENT" && (
                        <Favourite imageSrc={imageSrc} animation={favouriteAnimation} onClick={() => FavouriteFunction()}/>
                    )}
                </RecommendationBottom>
            )}
        </RecommendationRoot>
    );
};

const spinClockwise = keyframes`
  0% { transform: rotateY(0); pointer-events: none; background-image: url("/images/news-feed-page/FavouriteUnselected.png") }
  50% { background-image: url("/images/news-feed-page/FavouriteSelected.png") }
  100% { transform: rotateY(3600deg); pointer-events: auto }
`;

const spinCounterClockwise = keyframes`
  0% { transform: rotateY(0); pointer-events: none; background-image: url("/images/news-feed-page/FavouriteSelected.png") }
  50% { background-image: url("/images/news-feed-page/FavouriteUnselected.png") }
  100% { transform: rotateY(-3600deg); pointer-events: auto }
`;

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

const RecommendationRoot = styled.div<RecommendationRootProps>`
  width: 450px;
  height: ${props => 360 / Math.pow(props.rootScale, 0.38)}px;
  padding: 21px 19px 26px 19px;
  margin: 10px;
  border-width: 1px;
  border-radius: 30px;
  border-style: solid;
  border-color: ${NewsFeedPageColorPalette.border};
  box-sizing: border-box;
  background: ${props => props.userType == "TEACHER" ? NewsFeedPageColorPalette.recommendedTeacherRootBG :
        NewsFeedPageColorPalette.recommendedStudentRootBG};
  overflow: hidden;
  color: darkblue;
`;

const RecommendationTop = styled.div`
  width: 100%;
  gap: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 2px;
  box-sizing: border-box;
`;

const ProfilePicture = styled.img<RecommendationProfilePictureProps>`
  width: 150px;
  height: 150px;
  border: 5px solid ${props => props.userType == "TEACHER" ? NewsFeedPageColorPalette.recommendedTeacherPictureBorder :
        NewsFeedPageColorPalette.recommendedStudentPictureBorder};
  border-radius: 50%;
  box-shadow: 0 0 70px 10px ${NewsFeedPageColorPalette.recommendedTeacherPictureShadow};
  cursor: pointer;
`;

const RecommendationTopRight = styled.div`
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
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
  cursor: pointer;
`;

const UserTypeLabel = styled.p`
  width: 100%;
  height: 18%;
  font-size: 19px;
  font-weight: 600;
  font-family: sans-serif;
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
  font-size: 1em;
  font-weight: 600;
  font-family: sans-serif;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: default;
`;

const DescriptionTextField = styled(CustomScrollbarComponent)<RecommendationScaleProps>`
  width: 100%;
  height: ${props => 90 / props.rootScale}px;
  margin: 5px 0 5px 0;
  padding: 5px;
  font-size: ${props => 1 / Math.pow(props.rootScale, 0.55)}rem;
  font-family: sans-serif;
  overflow-y: auto;
  word-wrap: break-word;
  border-left: 2px solid ${NewsFeedPageColorPalette.border};
  border-radius: 10px;
  box-sizing: border-box;
  background: ${NewsFeedPageColorPalette.recommendationDescriptionBG};
`;

const RecommendationBottom = styled.div<RecommendationScaleProps>`
  width: 100%;
  margin-top: 15px;
  padding-left: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${props => .8 / Math.pow(props.rootScale, 0.2)}rem;
  font-weight: 600;
`;

const RatingLabel = styled.p`
  width: fit-content;
  margin-right: 20px;
  overflow-y: hidden;
  text-wrap: normal;
  height: 100%;
  font-size: 1.1em;
  box-sizing: border-box;
  cursor: default;
`;

const RatingValue = styled.p`
  width: 120px;
  height: fit-content;
  text-align: start;
  box-sizing: border-box;
  cursor: default;
`;

const Favourite = styled.div<FavouriteProps>`
  width: 27px;
  height: 27px;
  margin-left: auto;
  box-sizing: border-box;
  cursor: pointer;
  background-size: cover;
  background-image: url(${props => props.imageSrc});
  animation: ${props => props.animation} 1s;
`;
