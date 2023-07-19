import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTopTenTeachers, NewsFeedPageColorPalette, TopTeacherData } from "../../../service/news-feed-page-service";
import { useNavigate } from "react-router-dom";

export const TopTenTab = (): React.JSX.Element => {
    const [topTeachers, setTopTeachers] = useState<TopTeacherData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function updateTopTen() {
            const topTeachersData = await getTopTenTeachers();
            const newTopTeachers: TopTeacherData[] = [];
            for (let i = 0; i < topTeachersData.data.length; i++) {
                const teacher = topTeachersData.data[i];
                newTopTeachers.push({
                    teacherId: teacher.id,
                    name: teacher.name,
                    surname: teacher.surname,
                    rating: teacher.teacherRatings.length == 0 ? 0 :
                        teacher.teacherRatings.reduce((sum: number, curr: any) => sum + curr.rating, 0) / teacher.teacherRatings.length,
                    voterNum: teacher.teacherRatings.length,
                    profileImage: teacher.profileImage
                });
            }
            setTopTeachers(newTopTeachers);
            return topTeachersData;
        }
        updateTopTen().catch(err => console.log(err));
    }, []);
    const starIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const getStarFill = (rating: number, starIndex: number) => {
        if (rating >= starIndex) {
            if (rating >= (starIndex + 1)) {
                return 10;
            } else {
                return rating * 10 % 10;
            }
        }
        return 0;
    };

    const moveToTeachersPage = (teacherId: number) => {
        navigate(`/${teacherId}/TEACHER/`);
    };

    return (
        <TopTenRoot>
            {topTeachers.map((teacher) => (
                <TopTeacher key={teacher.teacherId} onClick={() => moveToTeachersPage(teacher.teacherId)}>
                    <TopTeacherPicture src={teacher.profileImage || "/images/news-feed-page/TopTenIcon.png"}/>
                    <TopTeacherName>{teacher.name + " " + teacher.surname}</TopTeacherName>
                    <Rating>
                        <TopTeacherRatingNumeric>{teacher.rating.toFixed(1)}/10.0</TopTeacherRatingNumeric>
                        <TopTeacherVoterNum>({teacher.voterNum} შეფასება)</TopTeacherVoterNum>
                        <StarsContainer>
                            {starIndices.map((index) => (
                                <RatingStar key={index} src={"/images/news-feed-page/stars/star_" + getStarFill(teacher.rating, index) + ".png"}/>
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
  object-fit: cover;
  width: 6em;
  height: 6em;
  background-size: cover;
  margin-left: 1%;
  border-radius: 50%;
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
  font-family: sans-serif;
  grid-area: rating;
`;

const TopTeacherVoterNum = styled.p`
  grid-area: voters;
`;
