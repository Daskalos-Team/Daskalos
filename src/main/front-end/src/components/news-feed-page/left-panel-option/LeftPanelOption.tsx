import React from "react";
import styled from "styled-components";

interface Props {
    isSelected: boolean;
    imageSrc: string;
    labelText: string;
}

export const LeftPanelOption = (props: Props) => {
    return (
        <OptionOuterContainer isSelected={props.isSelected} imageSrc={props.imageSrc}
            labelText={props.labelText}>
            <OptionInnerContainer>
                <OptionImg src={props.imageSrc}/>
                <OptionLabel>{props.labelText}</OptionLabel>
            </OptionInnerContainer>
        </OptionOuterContainer>
    );
};

const OptionOuterContainer = styled.div<Props>`
  width: 100%;
  height: 80px;
  padding: 0 5px 0 5px;
  margin-left: 5px;
  background-color: transparent;
  display: flex;
  align-items: center;
  border-radius: 50px 0 0 50px;
  cursor: pointer;
  &:hover{
    color: limegreen;
  }
  ${props => props.isSelected && `
    background-color: white;
    color: limegreen;
  `}
`;
const OptionInnerContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffef9a;
  border-radius: 50px;
  overflow: hidden;
`;
const OptionImg = styled.img`
  margin: 30px 50px 30px 18px;
  width: 40px;
  height: auto;
`;
const OptionLabel = styled.p`
  font-family: "Noto Serif Georgian";
  width: 120px;
  text-align: center;
  font-size: 16px;
  line-height: 80px;
  margin-right: 15px;
`;