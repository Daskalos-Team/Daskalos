import React from "react";
import styled from "styled-components";

export const StudentCommentComponent = (props: any) => {
    return (
        <StudentComment>
            <Name>student name</Name>
            <br/>
            <Rating>student rating 5.0/5.0</Rating>
            <br/>
            <SecondName>student short comment about teacher</SecondName>
            <br/>
        </StudentComment>
    );
};

const Name = styled.div`
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
const SecondName = styled.div`
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
export const StudentComment = styled.div`
  font-size: 1.5em;
  margin-top: -1.5em;
  width: 50em;
  gap: 9px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 53px 80px 53px;
  border-width: 5px;
  border-radius: 30px;
  border-style: solid;
  border-color: #6a60a6;
  box-sizing: border-box;
  background-color: #ffffff;
`;
const Rating = styled.div`
  margin: 0px 0px 50px 0px;
  font-family: Abhaya Libre Medium;
  white-space: nowrap;
  letter-spacing: 2.08px;
  text-transform: uppercase;
  box-sizing: border-box;
`;
