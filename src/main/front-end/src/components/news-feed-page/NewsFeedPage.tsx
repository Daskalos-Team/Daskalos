import React, { useState, useLayoutEffect } from "react";
import styled, { Keyframes, keyframes } from "styled-components";
import { RecommendedTeacher } from "./recommended-teacher";
import { Filters } from "./filters-button";
import { LeftPanelOption } from "./left-panel-option";
import {
    DimmingProps,
    IconCreditsProps,
    LeftPanelProps,
    LogoProps,
    NewsFeedPageColorPalette, RootScaleProps, TabProps
} from "./news-feed-page-service/NewsFeedPageOptionsConstants";
import { SettingsTab } from "./settings-tab";

export const NewsFeedPage = () => {
    const maxMenuOnWindowWidth = 1180;
    const maxUnscaledRootWidth = 700;

    const [filtersOpen, setFiltersOpen] = useState(false);
    const [dimmingOpacity, setDimmingOpacity] = useState(0);
    const [arrowSrc, setArrowSrc] = useState("/images/news-feed-page/DownArrow.png");
    const [dimmingInteractive, setDimmingInteractive] = useState("none");
    const [selectedOptions, setSelectedOptions] = useState([true, false, false, false]);
    const [logoVisible, setLogoVisible] = useState(true);
    const [logoAnimation, setLogoAnimation] = useState<Keyframes | null>(null);
    const [leftPanelWidths, setLeftPanelWidths] = useState([250, 330]);
    const [leftPanelAnimation, setLeftPanelAnimation] = useState<Keyframes | null>(null);
    const [menuButtonDisabled, setMenuButtonDisabled] = useState(document.body.offsetWidth
        < maxMenuOnWindowWidth);
    const [creditsVisible, setCreditsVisible] = useState(!menuButtonDisabled);
    const [creditsAnimation, setCreditsAnimation] = useState<Keyframes | null>(null);
    const [rootScale, setRootScale] = useState(1);
    const [tabAnimation, setTabAnimation] = useState<Keyframes | null>(null);

    const ProfileButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };

    const SearchButtonFunction = () => {
        setFiltersOpen(!filtersOpen);
        setArrowSrc(filtersOpen ? "/images/news-feed-page/DownArrow.png" : "/images/news-feed-page/UpArrow.png");
        setDimmingOpacity(filtersOpen ? 0 : 0.8);
        setDimmingInteractive(dimmingInteractive == "none" ? "auto" : "none");
    };

    const SetOptionSelected = (option_id: number) => {
        if (selectedOptions[option_id]) {
            return;
        }
        const newSelectedOptions = [false, false, false, false];
        newSelectedOptions[option_id] = true;
        setTabAnimation(TabSwitch);
        setTimeout(() => setSelectedOptions(newSelectedOptions), 250);
        setTimeout(() => setTabAnimation(null), 500);
    };

    const ToggleMenu = (on: boolean) => {
        setLogoVisible(on);
        setLogoAnimation(logoVisible ? ShrinkLogo : GrowLogo);
        setLeftPanelAnimation(logoVisible ? ShrinkLeftPanel : GrowLeftPanel);
        setCreditsAnimation(logoVisible ? CollapseIconCredits : RestoreIconCredits);
        setLeftPanelWidths(logoVisible ? [110, 110] : [250, 330]);
        setCreditsVisible(!logoVisible);
    };

    useLayoutEffect(() => {
        function CheckForMenuResize() {
            const currWidth = document.body.offsetWidth;
            if (currWidth < maxUnscaledRootWidth) {
                setRootScale(currWidth / maxUnscaledRootWidth);
            } else {
                setRootScale(1);
            }
            if (currWidth >= maxMenuOnWindowWidth) {
                setMenuButtonDisabled(false);
                return;
            }
            setMenuButtonDisabled(true);
            ToggleMenu(false);
        }

        window.addEventListener("resize", CheckForMenuResize);
        CheckForMenuResize();
        return () => window.removeEventListener("resize", CheckForMenuResize);
    }, []);

    return (
        <NewsFeedPageRoot scale={rootScale}>
            <Dimming opacity={dimmingOpacity} interactive={dimmingInteractive}/>
            <Header>
                <Logo src="/images/news-feed-page/Logo.png" alt="Logo" visible={logoVisible} animation={logoAnimation}/>
                {!menuButtonDisabled && <ShowMenuButton onClick={() => ToggleMenu(!logoVisible)}/>}
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
            <Content scale={rootScale}>
                <LeftPanel minWidth={leftPanelWidths[0]} maxWidth={leftPanelWidths[1]}
                    animation={leftPanelAnimation}>
                    <div onClick={() => SetOptionSelected(0)}>
                        <LeftPanelOption isSelected={selectedOptions[0]}
                            imageSrc="/images/news-feed-page/TeachersIcon.png"
                            labelText="მასწავლებლები"/>
                    </div>
                    <div onClick={() => SetOptionSelected(1)}>
                        <LeftPanelOption isSelected={selectedOptions[1]}
                            imageSrc="/images/news-feed-page/FavouritesIcon.png"
                            labelText="ფავორიტები"/>
                    </div>
                    <div onClick={() => SetOptionSelected(2)}>
                        <LeftPanelOption isSelected={selectedOptions[2]}
                            imageSrc="/images/news-feed-page/AccountIcon.png"
                            labelText="ანგარიში"/>
                    </div>
                    <div onClick={() => SetOptionSelected(3)}>
                        <LeftPanelOption isSelected={selectedOptions[3]}
                            imageSrc="/images/news-feed-page/SettingsIcon.png"
                            labelText="პარამეტრები"/>
                    </div>
                    <IconCredits visible={creditsVisible} animation={creditsAnimation}>
                        <p>
                            Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik
                            </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                        </p>
                        <p>
                            Icons made by <a href="https://www.flaticon.com/authors/laisa-islam-ani" title="Laisa Islam Ani">
                            Laisa Islam Ani</a> from <a href="https://www.flaticon.com/" title="Flaticon">
                            www.flaticon.com</a>
                        </p>
                    </IconCredits>
                </LeftPanel>
                <MainContentContainer>
                    <TabContainer animation={tabAnimation}>
                        {selectedOptions[0] && (
                            <React.Fragment>
                                <TabTitle>თქვენთვის რეკომენდებული მასწავლებლები</TabTitle>
                                <TabContent>
                                    <RecommendedTeacher isFavourite={true} rootScale={rootScale}/>
                                    <RecommendedTeacher isFavourite={true} rootScale={rootScale}/>
                                    <RecommendedTeacher isFavourite={false} rootScale={rootScale}/>
                                    <RecommendedTeacher isFavourite={false} rootScale={rootScale}/>
                                    <RecommendedTeacher isFavourite={true} rootScale={rootScale}/>
                                    <RecommendedTeacher isFavourite={false} rootScale={rootScale}/>
                                    <RecommendedTeacher isFavourite={false} rootScale={rootScale}/>
                                    <RecommendedTeacher isFavourite={true} rootScale={rootScale}/>
                                </TabContent>
                            </React.Fragment>
                        )}
                        {selectedOptions[1] && (
                            <React.Fragment>
                                <TabTitle>ფავორიტები</TabTitle>
                                <TabContent>
                                </TabContent>
                            </React.Fragment>
                        )}
                        {selectedOptions[2] && (
                            <React.Fragment>
                                <TabTitle>ანგარიში</TabTitle>
                                <TabContent>
                                </TabContent>
                            </React.Fragment>
                        )}
                        {selectedOptions[3] && (
                            <React.Fragment>
                                <TabTitle>პარამეტრები</TabTitle>
                                <TabContent>
                                    <SettingsTab/>
                                </TabContent>
                            </React.Fragment>
                        )}
                    </TabContainer>
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
  0% { min-width: 250px; max-width: 330px}
  100% { min-width: 110px; max-width: 110px }
`;

const GrowLeftPanel = keyframes`
  0% { min-width: 110px; max-width: 110px}
  100% { min-width: 250px; max-width: 330px }
`;

const Shimmer = keyframes`
  0% {left: -200px}
  40% {left: 100%}
  100% {left: 100%}
`;

const CollapseIconCredits = keyframes`
  0% {font-size: 12px}
  100% {font-size: 0}
`;

const RestoreIconCredits = keyframes`
  0% {font-size: 0}
  100% {font-size: 12px}
`;

const TabSwitch = keyframes`
  0% {transform: translateX(0); scale: 1; opacity: 1; pointer-events: auto}
  45% {transform: translateX(0); scale: 0.8; opacity: 0; pointer-events: none}
  55% {transform: translateX(100%); scale: 1; opacity: 0; pointer-events: none}
  100% {transform: translateX(0); scale: 1; opacity: 1; pointer-events: auto}
`;

const NewsFeedPageRoot = styled.div<RootScaleProps>`
  width: ${props => 100 / props.scale}%;
  gap: 12.6px;
  background: ${NewsFeedPageColorPalette.secondaryColor};
  overflow: hidden;
  transform-origin: top left;
  scale: ${props => props.scale};
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
  background: ${NewsFeedPageColorPalette.menuBG};
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
  background-image: url("/images/news-feed-page/MyProfile.png");
  cursor: pointer;
  transform: translateY(-50%);
  border-radius: 50%;

  &:hover {
    &:before {
      content: "";
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${NewsFeedPageColorPalette.profileButtonBeforeBG};
    }
  ;
  }
;
`;

const ShowMenuButton = styled.button`
  width: 60px;
  height: 60px;
  margin-left: 20px;
  background-color: transparent;
  background-size: cover;
  border: none;
  background-image: url("/images/news-feed-page/ShowMenuLogo.png");
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
  background-color: ${NewsFeedPageColorPalette.searchButtonBG};
  box-shadow: 0 4px 4px 0 ${NewsFeedPageColorPalette.searchButtonShadow};
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

const Content = styled.div<RootScaleProps>`
  height: ${props => 1000 / props.scale}px;
  margin: 0 20px 0 0;
  display: flex;
`;

const LeftPanel = styled.div<LeftPanelProps>`
  min-width: ${props => props.minWidth}px;
  max-width: ${props => props.maxWidth}px;
  margin-right: 30px;
  height: calc(100% + 2px);
  top: -2px;
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  background: ${NewsFeedPageColorPalette.menuBG};
  animation: ${props => props.animation} 300ms;
  position: relative;
  &:before {
    background-color: ${NewsFeedPageColorPalette.secondaryColor};
    content: "";
    height: 100%;
    width: 32px;
    top: 2px;
    right: -2px;
    position: absolute;
    border-top-left-radius: 30px;
    pointer-events: none;
  };
`;

const IconCredits = styled.div<IconCreditsProps>`
  position: absolute;
  bottom: 50px;
  margin: 0 40px 0 10px;
  font-size: ${props => props.visible ? 12 : 0}px;
  font-weight: 700;
  text-align: center;
  color: darkblue;
  animation: ${props => props.animation} 300ms;
`;

const MainContentContainer = styled.div`
  flex-basis: 80%;
  flex-grow: 1;
  min-width: 500px;
  margin-bottom: 100px;
`;

const TabContainer = styled.div<TabProps>`
  height: 100%;
  animation: ${props => props.animation} 500ms;
`;

const TabTitle = styled.p`
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
    scale: 1.07;
    color: lightskyblue;
  };
  &:before {
    background: ${NewsFeedPageColorPalette.shimmerBG};
    position: absolute;
    content: "";
    display: block;
    width: 200px;
    height: 100%;
    animation: ${Shimmer} 4.5s infinite linear;
  };
`;

const TabContent = styled.div`
  margin: 20px 0 20px 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  scroll-behavior: auto;
  overflow-y: auto;
  padding: 5px;
  border-left: 2px solid ${NewsFeedPageColorPalette.border};
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  position: relative;
  background: ${NewsFeedPageColorPalette.newsFeedBG};
  &::-webkit-scrollbar {
    width: .8rem;
  }
  &::-webkit-scrollbar-thumb {
    background: ${NewsFeedPageColorPalette.scrollbarThumbBG};
  }
`;
