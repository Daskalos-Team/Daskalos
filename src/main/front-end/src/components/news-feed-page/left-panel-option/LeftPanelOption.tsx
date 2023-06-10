import React from "react";
import styled from "styled-components";
import {
    LeftPanelOptionProps, NewsFeedPageColorPalette,
    OptionContainerProps
} from "../../../service/news-feed-page-service";

export const LeftPanelOption = (props: LeftPanelOptionProps): React.JSX.Element => {
    return (
        <OptionRoot>
            <OptionContainer isSelected={props.isSelected}>
                <OptionImg src={props.imageSrc}/>
                <OptionLabel>{props.labelText}</OptionLabel>
            </OptionContainer>
            {props.isSelected && <SelectedEnd/>}
        </OptionRoot>
    );
};

const OptionRoot = styled.div`
  position: relative;
`;

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
  ${props => props.isSelected && `
    border: 5px solid ${NewsFeedPageColorPalette.secondaryColor};
    color: ${NewsFeedPageColorPalette.secondaryColor};
  `}
  &:hover {
    color: ${NewsFeedPageColorPalette.secondaryColor};
  }
  z-index: 1;
`;

const SelectedEnd = styled.div`
  top: 0;
  width: calc((100% - 31px) / 2);
  height: 80px;
  right: 29px;
  position: absolute;
  background: ${NewsFeedPageColorPalette.secondaryColor};
`;

const OptionImg = styled.img`
  margin: 30px 35px 30px 12.5px;
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