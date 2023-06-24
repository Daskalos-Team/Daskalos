import React, { useState, useLayoutEffect, useEffect } from "react";
import styled, { Keyframes, keyframes } from "styled-components";
import { SearchComponent } from "./search-component";
import { LeftPanelOption } from "./left-panel-option";
import {
    DimmingProps,
    DropDownArrowProps,
    getStudents,
    getTeachers,
    LeftPanelProps,
    LogoProps,
    MAX_MENU_ON_WINDOW_WIDTH,
    MAX_UNSCALED_ROOT_WIDTH,
    NewsFeedPageColorPalette,
    NewsFeedPageProps,
    ProfileButtonMenuProps,
    RootScaleProps,
    TabProps,
    UserFilters,
    UserProps
} from "../../service/news-feed-page-service";
import { SettingsTab } from "./settings-tab";
import { TopTenTab } from "./top-10-tab";
import { Recommendation } from "./recommended-teacher";
import "./NewsFeedHelperStyles.css";
import { setUserMainData } from "../../service/session-service";

export const NewsFeedPage = (props: NewsFeedPageProps): React.JSX.Element => {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [searchState, setSearchState] = useState("search-hide");
    const [dimmingOpacity, setDimmingOpacity] = useState(0);
    const [arrowRotation, setArrowRotation] = useState(0);
    const [dimmingInteractive, setDimmingInteractive] = useState("none");
    const [selectedOptions, setSelectedOptions] = useState([true, false, false]);
    const [logoVisible, setLogoVisible] = useState(true);
    const [logoAnimation, setLogoAnimation] = useState<Keyframes | null>(null);
    const [leftPanelWidths, setLeftPanelWidths] = useState([250, 330]);
    const [leftPanelAnimation, setLeftPanelAnimation] = useState<Keyframes | null>(null);
    const [menuButtonDisabled, setMenuButtonDisabled] = useState(document.body.offsetWidth < MAX_MENU_ON_WINDOW_WIDTH);
    const [rootScale, setRootScale] = useState(1);
    const [tabAnimation, setTabAnimation] = useState<Keyframes | null>(null);
    const [profileButtonMenuOpen, setProfileButtonMenuOpen] = useState(false);
    const [profileButtonMenuAnimation, setProfileButtonMenuAnimation] = useState<Keyframes | null>(null);
    const [recommendations, setRecommendations] = useState<UserProps[]>([]);
    const [filters, setFilters] = useState<UserFilters>({
        name: "",
        surname: "",
        minPrice: -1,
        maxPrice: 1000000,
        favouritesOnly: false,
        onPlace: null,
        subjectsOnly: [],
        weekdays: [],
        userAddressDTO: {
            fullAddress: "",
            latitude: 0,
            longitude: 0
        },
        radius: 0
    });

    async function updateRecommendations() {
        const teachers = await getTeachers(props.userId, filters);
        const students = await getStudents(filters);
        const teachersProps: UserProps[] = [];
        const studentsProps: UserProps[] = [];
        for (let i = 0; i < teachers.data.length; i++) {
            const teacher = teachers.data[i];
            if (teacher.id == props.userId) {
                continue;
            }
            teachersProps.push({
                userId: teacher.id,
                name: teacher.name,
                surname: teacher.surname,
                userType: teacher.userType,
                description: teacher.description,
                rating: teacher.teacherRatings.length == 0 ? 0 :
                    teacher.teacherRatings.reduce((sum: number, curr: any) => sum + curr.rating) / teacher.teacherRatings.length,
                subjects: teacher.teacherSubjects.map((subject: any) => subject.name),
                isFavourite: teacher.isFavoriteForLoggedInStudent
            });
        }
        if (!filters.favouritesOnly) {
            for (let i = 0; i < students.data.length; i++) {
                const student = students.data[i];
                if (student.id == props.userId) {
                    continue;
                }
                studentsProps.push({
                    userId: student.id,
                    name: student.name,
                    surname: student.surname,
                    userType: student.userType,
                    description: student.description,
                    rating: 0,
                    subjects: student.studentSubjects.map((subject: any) => subject.name),
                    isFavourite: false
                });
            }
        }
        setRecommendations(props.userType == "STUDENT" ? teachersProps.concat(studentsProps) : studentsProps.concat(teachersProps));
        return teachers;
    }

    const SearchButtonFunction = () => {
        if (filtersOpen) {
            setSearchState("search-hide");
        } else {
            setSearchState("search-show");
        }
        setFiltersOpen(!filtersOpen);
        setArrowRotation(filtersOpen ? 0 : 180);
        setDimmingOpacity(filtersOpen ? 0 : 0.95);
        setDimmingInteractive(dimmingInteractive == "none" ? "auto" : "none");
    };

    const SetOptionSelected = (option_id: number) => {
        if (selectedOptions[option_id]) {
            return;
        }
        if (option_id == 0) {
            updateRecommendations().catch(err => console.log(err));
        }
        const newSelectedOptions = [false, false];
        newSelectedOptions[option_id] = true;
        setTabAnimation(TabSwitch);
        setTimeout(() => setSelectedOptions(newSelectedOptions), 250);
        setTimeout(() => setTabAnimation(null), 500);
    };

    const ToggleMenu = (on: boolean) => {
        setLogoVisible(on);
        setLogoAnimation(logoVisible ? ShrinkLogo : GrowLogo);
        setLeftPanelAnimation(logoVisible ? ShrinkLeftPanel : GrowLeftPanel);
        setLeftPanelWidths(logoVisible ? [110, 110] : [250, 330]);
    };

    const ToggleProfileButtonMenu = () => {
        setProfileButtonMenuAnimation(profileButtonMenuOpen ? FadeUp : FadeDown);
        setProfileButtonMenuOpen(!profileButtonMenuOpen);
    };

    const LogOut = () => {
        setUserMainData(-1, props.userType).then(_ => {
            window.location.reload();
        }).catch(err => console.log(err));
    };

    useLayoutEffect(() => {
        function CheckForMenuResize() {
            const currWidth = document.body.offsetWidth;
            if (currWidth < MAX_UNSCALED_ROOT_WIDTH) {
                setRootScale(currWidth / MAX_UNSCALED_ROOT_WIDTH);
            } else {
                setRootScale(1);
            }
            if (currWidth >= MAX_MENU_ON_WINDOW_WIDTH) {
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

    useEffect(() => {
        if (recommendations.length == 0) {
            updateRecommendations().catch(err => console.log(err));
        }
    }, [filters]);

    return (
        <NewsFeedPageRoot scale={rootScale}>
            <Dimming opacity={dimmingOpacity} interactive={dimmingInteractive}/>
            <Header>
                <Logo src="/images/news-feed-page/Logo.png" alt="Logo" visible={logoVisible} animation={logoAnimation}/>
                {!menuButtonDisabled && <ShowMenuButton onClick={() => ToggleMenu(!logoVisible)}/>}
                <SearchButton
                    onClick={() => SearchButtonFunction()}
                >
                    <SearchLabel>მოძებნე მასწავლებელი</SearchLabel>
                    <DropDownArrow src="/images/news-feed-page/DownArrow.png" alt="Drop down" rotation={arrowRotation}/>
                </SearchButton>
                <div className={searchState}>
                    <SearchComponent userId={props.userId}/>
                </div>
                <ProfileButton
                    onClick={() => ToggleProfileButtonMenu()}
                />
                <ProfileButtonMenu open={profileButtonMenuOpen} animation={profileButtonMenuAnimation}>
                    <ProfileButtonMenuTop>
                        <ProfilePicture src="/images/news-feed-page/AccountIcon.png" alt="Profile Picture"/>
                        <UserName>სახელი გვარი</UserName>
                    </ProfileButtonMenuTop>
                    <ProfileButtonMenuOption>ჩემი პროფილი</ProfileButtonMenuOption>
                    <ProfileButtonMenuOption onClick={() => LogOut()}>ანგარიშიდან გამოსვლა</ProfileButtonMenuOption>
                </ProfileButtonMenu>
            </Header>
            <Content scale={rootScale}>
                <LeftPanel minWidth={leftPanelWidths[0]} maxWidth={leftPanelWidths[1]}
                    animation={leftPanelAnimation}>
                    <div onClick={() => SetOptionSelected(0)}>
                        <LeftPanelOption isSelected={selectedOptions[0]}
                            imageSrc="/images/news-feed-page/TeachersIcon.png"
                            labelText="რეკომენდაციები"/>
                    </div>
                    <div onClick={() => SetOptionSelected(1)}>
                        <LeftPanelOption isSelected={selectedOptions[1]}
                            imageSrc="/images/news-feed-page/SettingsIcon.png"
                            labelText="პარამეტრები"/>
                    </div>
                    <div onClick={() => SetOptionSelected(2)}>
                        <LeftPanelOption isSelected={selectedOptions[2]}
                            imageSrc="/images/news-feed-page/TopTenIcon.png"
                            labelText="Top 10"/>
                    </div>
                </LeftPanel>
                <MainContentContainer>
                    <TabContainer animation={tabAnimation}>
                        {selectedOptions[0] && (
                            <React.Fragment>
                                <TabTitle>რეკომენდაციები</TabTitle>
                                <TabContent>
                                    {recommendations.map((r) => (
                                        <React.Fragment key={r.userId}>
                                            <Recommendation currUserId={props.userId} currUserType={props.userType} isFavourite={r.isFavourite} rootScale={rootScale} userType={r.userType} userId={r.userId} name={r.name} surname={r.surname} rating={r.rating} description={r.description} subjects={r.subjects}/>
                                        </React.Fragment>
                                    ))}
                                </TabContent>
                            </React.Fragment>
                        )}
                        {selectedOptions[1] && (
                            <React.Fragment>
                                <TabTitle>პარამეტრები</TabTitle>
                                <TabContent>
                                    <SettingsTab currUserType={props.userType} filters={filters} filtersSetFn={setFilters}/>
                                </TabContent>
                            </React.Fragment>
                        )}
                        {selectedOptions[2] && (
                            <React.Fragment>
                                <TabTitle>Top 10</TabTitle>
                                <TabContent>
                                    <TopTenTab/>
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

const TabSwitch = keyframes`
  0% {transform: translateX(0); scale: 1; opacity: 1; pointer-events: none}
  45% {transform: translateX(0); scale: 0.8; opacity: 0; pointer-events: none}
  55% {transform: translateX(100%); scale: 1; opacity: 0; pointer-events: none}
  100% {transform: translateX(0); scale: 1; opacity: 1; pointer-events: auto}
`;

const FadeDown = keyframes`
  0% {opacity: 0; transform: translateY(-40%);}
  100% {opacity: 1; transform: translateY(0)}
`;

const FadeUp = keyframes`
  0% {opacity: 1; transform: translateY(0)}
  70% {opacity: 0}
  100% {opacity: 0; transform: translateY(-40%)}
`;

const NewsFeedPageRoot = styled.div<RootScaleProps>`
  width: ${props => 100 / props.scale}%;
  height: ${props => 1100 / props.scale}px;
  gap: 12.6px;
  background: ${NewsFeedPageColorPalette.secondaryColor};
  overflow: hidden;
  transform-origin: top left;
  scale: ${props => props.scale};
  color: black;
  position: absolute;
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
  width: 60px;
  height: 60px;
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
  background-image: url("/images/news-feed-page/AccountIcon.png");
  cursor: pointer;
  transform: translateY(-50%);
  border-radius: 50%;
  transform-origin: top;
  transition-property: scale;
  transition-duration: 200ms;
  &:hover {
    scale: 1.07;
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

const ProfileButtonMenu = styled.div<ProfileButtonMenuProps>`
  width: 400px;
  opacity: ${props => props.open ? 1 : 0};
  pointer-events: ${props => props.open ? "auto" : "none"};
  height: 300px;
  animation: ${props => props.animation} 300ms;
  background: ${NewsFeedPageColorPalette.profileButtonMenuBG};
  z-index: 1;
  position: absolute;
  right: 20px;
  top: 90px;
  border: 4px solid ${NewsFeedPageColorPalette.profileButtonMenuBorder};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  font-family: "Noto Serif Georgian";
`;

const ProfileButtonMenuTop = styled.div`
  margin-left: 10px;
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
`;

const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  padding: 14px;
`;

const UserName = styled.p`
  width: 260px;
  margin-right: auto;
  font-weight: 800;
  text-align: center;
  font-size: 1.4rem;
  margin-block: auto;
  border-radius: 50%;
  padding-inline: 10px;
`;

const ProfileButtonMenuOption = styled.p`
  width: 100%;
  height: 33%;
  line-height: 80px;
  padding-left: 30px;
  text-align: start;
  justify-self: end;
  border-block: 4px solid transparent;
  box-sizing: content-box;
  font-weight: 550;
  transition-property: border-color;
  transition-duration: 100ms;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    border-color: ${NewsFeedPageColorPalette.profileButtonMenuBorder};
  }
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
  width: 200px;
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
  color: black;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  }
;
`;

const SearchLabel = styled.div`
  width: 78%;
  height: 85%;
  left: 45%;
  top: 50%;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-family: Noto Serif Georgian;
  text-align: center;
  text-transform: uppercase;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
`;

const DropDownArrow = styled.img<DropDownArrowProps>`
  width: 20px;
  top: 50%;
  right: 10%;
  position: absolute;
  box-sizing: border-box;
  transition-property: transform;
  transition-duration: 300ms;
  transform: translateY(-50%) rotate(${props => props.rotation}deg);
`;

const Content = styled.div<RootScaleProps>`
  height: ${props => (1000 + 100 * (1 - props.scale)) / props.scale}px;
  margin-right: 20px;
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
  padding-top: 130px;
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
  };
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
  overflow: hidden;
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
  margin: 40px 0 40px 0;
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
