import React from "react";
import styled from "styled-components";
import { NewsFeedPageColorPalette } from "../../../service/news-feed-page-service";

export const TopTenTab = (): React.JSX.Element => {
    const topTeachers = new Map([
        ["სახელი გვარი ა", (10.0).toFixed(1)],
        ["სახელი გვარი ბ", (8.9).toFixed(1)],
        ["სახელი გვარი გ", (7.7333).toFixed(1)],
        ["სახელი გვარი დ", (6.4).toFixed(1)],
        ["სახელი გვარი ე", (5.333).toFixed(1)],
        ["სახელი გვარი ვ", (4.0).toFixed(1)],
        ["სახელი გვარი ზ", (3.7).toFixed(1)],
        ["სახელი გვარი თ", (2.3).toFixed(1)],
        ["სახელი გვარი ი", (1.5).toFixed(1)],
        ["სახელი გვარი კ", (0.0).toFixed(1)]
    ]);
    const voterNums = new Map([
        ["სახელი გვარი ა", 103],
        ["სახელი გვარი ბ", 95],
        ["სახელი გვარი გ", 72],
        ["სახელი გვარი დ", 107],
        ["სახელი გვარი ე", 128],
        ["სახელი გვარი ვ", 56],
        ["სახელი გვარი ზ", 28],
        ["სახელი გვარი თ", 88],
        ["სახელი გვარი ი", 60],
        ["სახელი გვარი კ", 17]
    ]);
    const starIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const getStarFill = (teacher: string, starIndex: number) => {
        const rating = Number(topTeachers.get(teacher));
        if (rating >= starIndex) {
            if (rating >= (starIndex + 1)) {
                return 10;
            } else {
                return rating * 10 % 10;
            }
        }
        return 0;
    };

    return (
        <TopTenRoot>
            {Array.from(topTeachers.keys()).map((teacher) => (
                <TopTeacher key={teacher}>
                    <TopTeacherPicture src="/images/news-feed-page/TopTenIcon.png"/>
                    <TopTeacherName>{teacher}</TopTeacherName>
                    <Rating>
                        <TopTeacherRatingNumeric>{topTeachers.get(teacher)}/10.0</TopTeacherRatingNumeric>
                        <TopTeacherVoterNum>({voterNums.get(teacher)} შეფასება)</TopTeacherVoterNum>
                        <StarsContainer>
                            {starIndices.map((index) => (
                                <RatingStar key={index} src={"/images/news-feed-page/stars/star_" + getStarFill(teacher, index) + ".png"}/>
                            ))}
                        </StarsContainer>
                    </Rating>
                </TopTeacher>
            ))}
        </TopTenRoot>
    );
};

const TopTenRoot = styled.div`
  width: 90%;
  margin-block: 20px;
`;

const TopTeacher = styled.div`
  padding-block: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${NewsFeedPageColorPalette.topTeacherBG};
  border: 3px solid lightskyblue;
  border-radius: 20px;
  cursor: pointer;
  transition-property: scale;
  transition-duration: 300ms;
  &:hover {
    scale: 1.03;
  }
`;

const TopTeacherPicture = styled.img`
  width: 6em;
  height: 6em;
  background-size: cover;
  margin-left: 1%;
`;

const TopTeacherName = styled.p`
  margin-inline: 3%;
  margin-top: 10px;
  font-weight: 900;
  font-size: 1.2em;
  font-style: italic;
  align-self: start;
`;

const Rating = styled.div`
  margin-right: 3%;
  margin-left: auto;
  width: fit-content;
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr 2fr;
  justify-items: end;
  align-items: center;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-areas:
    "rating voters" 
    "stars stars";
`;

const StarsContainer = styled.div`
  margin-right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-area: stars;
`;

const RatingStar = styled.img`
  background-size: cover;
  width: 1.5em;
  height: 1.5em;
`;

const TopTeacherRatingNumeric = styled.p`
  font-size: 1.3em;
  font-weight: 600;
  font-family: Inter;
  grid-area: rating;
`;

const TopTeacherVoterNum = styled.p`
  grid-area: voters;
`;