import React from "react";
import styled from "styled-components";
import {
    LeftPanelOptionProps, NewsFeedPageColorPalette,
    OptionContainerProps
} from "../news-feed-page-service/NewsFeedPageOptionsConstants";

export const LeftPanelOption = (props: LeftPanelOptionProps) => {
    return (
        <OptionContainer isSelected={props.isSelected}>
            <OptionImg src={props.imageSrc}/>
            <OptionLabel>{props.labelText}</OptionLabel>
        </OptionContainer>
    );
};

const OptionContainer = styled.div<OptionContainerProps>`
  width: calc(100% - 30px);
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${NewsFeedPageColorPalette.menuBG};
  border: 5px solid transparent;
  border-radius: 50px;
  margin-block: 10px;
  background-clip: padding-box;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  ${props => props.isSelected && `
    border: 5px solid ${NewsFeedPageColorPalette.secondaryColor};
    color: ${NewsFeedPageColorPalette.secondaryColor};
    overflow: visible;
    &:before {
        content: "";
        width: 50%;
        height: 80px;
        right: -5px;
        transform: translateZ(-1px);
        position: absolute;
        background: ${NewsFeedPageColorPalette.secondaryColor};
    };
  `}
`;

const OptionImg = styled.img`
  margin: 30px 40px 30px 12.5px;
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