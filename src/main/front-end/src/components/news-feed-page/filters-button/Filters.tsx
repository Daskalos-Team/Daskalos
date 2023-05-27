import React from "react";
import styled, { keyframes } from "styled-components";

export const Filters = (): React.JSX.Element => {
    return (
        <FiltersRoot>
            <FilterContainer>
                <FiltersTextField type="text"/>
                <FiltersLabel>სახელი</FiltersLabel>
            </FilterContainer>
            <FilterContainer>
                <FiltersTextField type="text"/>
                <FiltersLabel>საგანი</FiltersLabel>
            </FilterContainer>
            <FilterContainer>
                <FiltersNumberField type="number" min={0}/>
                <FiltersLabel>–</FiltersLabel>
                <FiltersNumberField type="number" min={0}/>
                <FiltersLabel>ფასი</FiltersLabel>
            </FilterContainer>
            <FilterContainer>
                <FilterButton>აირჩიეთ დროები</FilterButton>
                <FiltersLabel>დროები</FiltersLabel>
            </FilterContainer>
            <FilterContainer>
                <FilterButton>აირჩიეთ ლოკაცია</FilterButton>
                <FiltersLabel>ლოკაცია</FiltersLabel>
            </FilterContainer>
            <Map src="/images/news-feed-page/Map.png"/>
            <FilterButton>დადასტურება</FilterButton>
        </FiltersRoot>
    );
};

const slideDown = keyframes`
  0% { opacity: 0; transform: translateY(-50%) }
  50% { opacity: 0; transform: translateY(-5%) }
  100% { opacity: 1; transform: translateY(0); }
`;

const FiltersRoot = styled.div`
  width: max(360px, 55vw);
  left: 40px;
  position: absolute;
  top: 100%;
  padding: 40px 10px 40px 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, auto));
  grid-row-gap: 50px;
  grid-column-gap: 30px;
  justify-items: center;
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 30px;
  background-color: #f6f6f6;
  z-index: 2;
  animation: ${slideDown} 400ms ease-in;
`;

const FilterContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

const FilterButton = styled.div`
  width: 180px;
  height: 48px;
  border-width: 0;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #ece9e9;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-size: 15px;
  font-family: "Noto Serif Georgian";
  text-align: center;
  line-height: 48px;
  max-lines: 1;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  }
;
`;

const FiltersInput = styled.input`
  width: 200px;
  max-height: 10px;
  padding: 20px;
  border-width: 0;
  border-radius: 50px;
  background-color: #ece9e9;
  box-sizing: content-box;
  font-size: 16px;
  font-family: "Noto Serif Georgian";
  text-align: center;
  
  &:hover {
    background-color: #f0f0f0;;
  }
`;

const FiltersTextField = styled(FiltersInput)`
  width: 200px;
`;

const FiltersNumberField = styled(FiltersInput)`
  width: 80px;
`;

const FiltersLabel = styled.p`
  font-size: 16px;
  font-family: "Noto Serif Georgian";
  text-align: center;
  line-height: 48px;
`;

const Map = styled.img`
  width: 320px;
  height: 150px;
  grid-row: span 2;
  cursor: pointer;
`;