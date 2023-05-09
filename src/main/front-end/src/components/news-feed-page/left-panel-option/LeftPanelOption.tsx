import React from "react";
import styled from "styled-components";

interface Props {
    isSelected: boolean;
    imageSrc: string;
    labelText: string;
    mainColor: string;
    secondaryColor: string;
}

interface OuterContainerProps {
    isSelected: boolean;
    color: string;
}

interface InnerContainerProps {
    color: string;
}

export const LeftPanelOption = (props: Props) => {
    return (
        <OptionOuterContainer isSelected={props.isSelected} color={props.secondaryColor}>
            <OptionInnerContainer color={props.mainColor}>
                <OptionImg src={props.imageSrc}/>
                <OptionLabel>{props.labelText}</OptionLabel>
            </OptionInnerContainer>
        </OptionOuterContainer>
    );
};

const OptionOuterContainer = styled.div<OuterContainerProps>`
  width: 100%;
  height: 80px;
  padding: 0 5px 0 5px;
  margin-left: 5px;
  background: transparent;
  display: flex;
  align-items: center;
  border-radius: 50px 0 0 50px;
  cursor: pointer;
  &:hover{
    color: ${props => props.color};
  }
  ${props => props.isSelected && `
    background: ${props.color};
    color: ${props.color};
  `}
`;

const OptionInnerContainer = styled.div<InnerContainerProps>`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${props => props.color};
  border-radius: 50px;
  overflow: hidden;
`;

const OptionImg = styled.img`
  margin: 30px 50px 30px 15px;
  width: 45px;
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