import styled from "styled-components";
import { CheckboxProps, NewsFeedPageColorPalette } from "../../service/news-feed-page-service";

export const CheckboxComponent = styled.div<CheckboxProps>`
  background: ${NewsFeedPageColorPalette.secondaryColor};
  border: 3px solid ${props => props.checked ? NewsFeedPageColorPalette.checkboxCheckedBorder :
        NewsFeedPageColorPalette.checkboxUncheckedBorder};
  border-radius: 7px;
  cursor: pointer;
  transition-property: border-color;
  transition-duration: 200ms;
  background-size: cover;
  ${props => props.checked ? "background-image: url(\"/images/news-feed-page/Check.png\")" : ""};
  &:hover {
    border-color: ${props => props.checked ? NewsFeedPageColorPalette.checkboxUncheckedBorder :
        NewsFeedPageColorPalette.checkboxCheckedBorder};
  };
`;