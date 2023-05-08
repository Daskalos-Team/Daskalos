import React, { useState } from "react";
import styled, { Keyframes, keyframes } from "styled-components";
import { RecommendedTeacher } from "./recommended-teacher";
import { Filters } from "./filters-button";
import { LeftPanelOption } from "./left-panel-option";

interface DimmingProps {
    opacity: number;
    interactive: string;
}

interface LogoProps {
    visible: boolean;
    animation: Keyframes | null;
}

interface LeftPanelProps {
    minWidth: number;
    maxWidth: number;
    animation: Keyframes | null;
}

const mainColor = "rgba(1,157,209,1)";
const secondaryColor = "#f0f6f7";

export const NewsFeedPage = () => {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [dimmingOpacity, setDimmingOpacity] = useState(0);
    const [arrowSrc, setArrowSrc] = useState("/DownArrow.png");
    const [dimmingInteractive, setDimmingInteractive] = useState("none");
    const [selectedOptions, setSelectedOptions] = useState([true, false, false, false]);
    const [logoVisible, setLogoVisible] = useState(true);
    const [logoAnimation, setLogoAnimation] = useState<Keyframes | null>(null);
    const [leftPanelWidths, setLeftPanelWidths] = useState([220, 300]);
    const [leftPanelAnimation, setLeftPanelAnimation] = useState<Keyframes | null>(null);
    const ProfileButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };
    const SearchButtonFunction = () => {
        setFiltersOpen(!filtersOpen);
        setArrowSrc(filtersOpen ? "/DownArrow.png" : "/UpArrow.png");
        setDimmingOpacity(filtersOpen ? 0 : 0.8);
        setDimmingInteractive(dimmingInteractive == "none" ? "auto" : "none");
    };
    const SetOptionSelected = (option_id: number) => {
        const newSelectedOptions = [false, false, false, false];
        newSelectedOptions[option_id] = true;
        setSelectedOptions(newSelectedOptions);
    };
    const ToggleMenu = () => {
        setLogoVisible(!logoVisible);
        setLogoAnimation(logoVisible ? ShrinkLogo : GrowLogo);
        setLeftPanelWidths(logoVisible ? [85, 85] : [220, 300]);
        setLeftPanelAnimation(logoVisible ? ShrinkLeftPanel : GrowLeftPanel);
    };
    return (
        <NewsFeedPageRoot>
            <Dimming opacity={dimmingOpacity} interactive={dimmingInteractive}/>
            <Header>
                <Logo src="/Logo.png" alt="Logo" visible={logoVisible} animation={logoAnimation}/>
                <ShowMenuButton onClick={() => ToggleMenu()}/>
                <SearchButton
                    onClick={() => SearchButtonFunction()}
                >
                    <SearchLabel>ძებნა</SearchLabel>
                    <DropDownArrow src={arrowSrc} alt="Drop down"/>
                </SearchButton>
                {filtersOpen && (<Filters/>)}
                <ProfileButton
                    onClick={(e) => ProfileButtonFunction(e, "Profile Button")}
                />
            </Header>
            <Content>
                <LeftPanel minWidth={leftPanelWidths[0]} maxWidth={leftPanelWidths[1]}
                    animation={leftPanelAnimation}>
                    <div onClick={() => SetOptionSelected(0)}>
                        <LeftPanelOption isSelected={selectedOptions[0]} imageSrc="/TeachersLogo.png"
                            labelText="მასწავლებლები" mainColor={mainColor} secondaryColor={secondaryColor}/>
                    </div>
                    <div onClick={() => SetOptionSelected(1)}>
                        <LeftPanelOption isSelected={selectedOptions[1]} imageSrc="/FavouritesLogo.png"
                            labelText="ფავორიტები" mainColor={mainColor} secondaryColor={secondaryColor}/>
                    </div>
                    <div onClick={() => SetOptionSelected(2)}>
                        <LeftPanelOption isSelected={selectedOptions[2]} imageSrc="/LogOut.png"
                            labelText="ანგარიში" mainColor={mainColor} secondaryColor={secondaryColor}/>
                    </div>
                    <div onClick={() => SetOptionSelected(3)}>
                        <LeftPanelOption isSelected={selectedOptions[3]} imageSrc="/Settings.png"
                            labelText="პარამეტრები" mainColor={mainColor} secondaryColor={secondaryColor}/>
                    </div>
                </LeftPanel>
                <MainContentContainer>
                    <TeacherFeedLabel>თქვენთვის რეკომენდებული მასწავლებლები</TeacherFeedLabel>
                    <NewsFeed>
                        <RecommendedTeacher isFavourite={true} color={secondaryColor}/>
                        <RecommendedTeacher isFavourite={true} color={secondaryColor}/>
                        <RecommendedTeacher isFavourite={false} color={secondaryColor}/>
                        <RecommendedTeacher isFavourite={false} color={secondaryColor}/>
                        <RecommendedTeacher isFavourite={true} color={secondaryColor}/>
                        <RecommendedTeacher isFavourite={false} color={secondaryColor}/>
                        <RecommendedTeacher isFavourite={false} color={secondaryColor}/>
                        <RecommendedTeacher isFavourite={true} color={secondaryColor}/>
                    </NewsFeed>
                </MainContentContainer>
            </Content>
        </NewsFeedPageRoot>
    );
};

const ShrinkLogo = keyframes`
  0% { width: 240px }
  100% { width: 0 }
`;
const GrowLogo = keyframes`
  0% { width: 0 }
  100% { width: 240px }
`;
const ShrinkLeftPanel = keyframes`
  0% { min-width: 220px; max-width: 300px}
  100% { min-width: 85px; max-width: 85px }
`;
const GrowLeftPanel = keyframes`
  0% { min-width: 85px; max-width: 85px}
  100% { min-width: 220px; max-width: 300px }
`;
const Shimmer = keyframes`
  0% {left: -200px}
  40% {left: 100%}
  100% {left: 100%}
`;

const NewsFeedPageRoot = styled.div`
  width: 100%;
  gap: 12.6px;
  background: ${secondaryColor};
  overflow: hidden;
`;
const Dimming = styled.div<DimmingProps>`
  position: fixed;
  width: 100%;
  min-height: 100%;
  background-color: black;
  z-index: 2;
  opacity: ${props => props.opacity};
  transition-property: opacity;
  transition-duration: 0.4s;
  pointer-events: ${props => props.interactive};
`;
const Header = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  box-sizing: border-box;
  background: linear-gradient(90deg, ${mainColor} 0%, ${mainColor} 20%, rgba(14, 99, 161, 1) 100%);
  display: flex;
  align-items: center;
`;
const Logo = styled.img<LogoProps>`
  width: ${props => props.visible ? 240 : 0}px;
  top: 10px;
  margin: 0 ${props => props.visible ? 40 : 0}px 0 ${props => props.visible ? 30 : 0}px;
  position: relative;
  box-sizing: border-box;
  animation: ${props => props.animation} 300ms;
  z-index: 1;
`;
const ProfileButton = styled.button`
  width: 70px;
  height: 70px;
  right: 22px;
  top: 50%;
  position: absolute;
  flex-shrink: 0;
  vertical-align: center;
  padding: 0;
  border-width: 0;
  box-sizing: content-box;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-image: url("/MyProfile.png");
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    box-shadow: inset 0 0 100px 100px #ffef9a40;
  };
`;
const ShowMenuButton = styled.button`
  width: 60px;
  height: 60px;
  margin-left: 20px;
  background-color: transparent;
  background-size: cover;
  border: none;
  background-image: url("/ShowMenuLogo.png");
  cursor: pointer;
`;
const SearchButton = styled.button`
  width: 100px;
  left: 40px;
  height: 0;
  position: relative;
  padding: 25px 40px 25px;
  border-width: 0;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #ece9e9;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  z-index: 3;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  }
;
`;
const SearchLabel = styled.div`
  width: 78%;
  height: 85%;
  left: 50%;
  top: 50%;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: Noto Serif Georgian;
  text-align: center;
  letter-spacing: 1.63px;
  text-transform: uppercase;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
`;
const DropDownArrow = styled.img`
  width: 25px;
  top: 50%;
  right: 10%;
  position: absolute;
  box-sizing: border-box;
  transform: translateY(-50%);
`;
const Content = styled.div`
  height: 1000px;
  margin: 0 20px 0 0;
  display: flex;
`;
const LeftPanel = styled.div<LeftPanelProps>`
  min-width: ${props => props.minWidth}px;
  max-width: ${props => props.maxWidth}px;
  margin-right: 30px;
  height: 100%;
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  background: ${mainColor};
  border: none;
  animation: ${props => props.animation} 300ms;
  position: relative;
  &:before {
    background-color: transparent;
    content: "";
    height: 60px;
    width: 60px;
    top: 0;
    right: -60px;
    position: absolute;
    border-top-left-radius: 30px;
    box-shadow: -15px -15px 0 ${mainColor};
    pointer-events: none;
  };
`;
const MainContentContainer = styled.div`
  flex-basis: 80%;
  flex-grow: 1;
  min-width: 500px;
  margin-bottom: 100px;
`;
const TeacherFeedLabel = styled.p`
  font-family: "Noto Serif Georgian";
  font-weight: 800;
  letter-spacing: 1px;
  font-size: 27px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  margin: 20px 0 20px 0;
  max-height: 80px;
  overflow-x: hidden;
  overflow-y: hidden;
  transition-property: color, scale;
  transition-duration: 0.3s;
  cursor: default;
  position: relative;
  transform-origin: left;
  &:hover {
    transition-property: color, scale;
    transition-duration: 0.3s;
    scale: 1.07;
    color: lightskyblue;
  };
  &:before {
    background: linear-gradient(100deg, #00000000 20%, ${secondaryColor + "80"} 50%, #00000000 80%);
    position: absolute;
    content: "";
    display: block;
    width: 200px;
    height: 100%;
    animation: ${Shimmer} 4.5s infinite linear;
  };
`;
const NewsFeed = styled.div`
  margin: 20px 0 20px 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  scroll-behavior: auto;
  overflow-y: scroll;
  padding: 5px;
  border-left: 2px solid #9c9c9c40;
  border-radius: 50px;
  position: relative;
`;
