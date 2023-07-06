import { Keyframes } from "styled-components";

export interface RootScaleProps {
    scale: number;
}

export interface DimmingProps {
    opacity: number;
    interactive: string;
}

export interface LogoProps {
    visible: boolean;
    animation: Keyframes | null;
}

export interface LeftPanelProps {
    minWidth: number;
    maxWidth: number;
    animation: Keyframes | null;
}

export interface RecommendationProps {
    currUserId: number;
    currUserType: string;
    isFavourite: boolean;
    rootScale: number;
    userType: string;
    userId: number;
    name: string;
    surname: string;
    rating: number;
    description: string;
    subjects: string[];
}

export interface RecommendationRootProps {
    userType: string;
    rootScale: number;
}

export interface RecommendationScaleProps {
    rootScale: number;
}

export interface RecommendationProfilePictureProps {
    userType: string;
}

export interface FavouriteProps {
    imageSrc: string;
    animation: Keyframes | null;
}

export interface LeftPanelOptionProps {
    isSelected: boolean;
    imageSrc: string;
    labelText: string;
}

export interface SettingsProps {
    currUserType: string;
    filters: UserFilters;
    filtersSetFn: (filters: any) => void;
}

export interface OptionContainerProps {
    isSelected: boolean;
}

export interface SettingOptionsProps {
    open: boolean;
    animation: Keyframes | null;
}

export interface SettingArrowProps {
    rotation: number;
    rotationDirection: number;
}

export interface CheckboxProps {
    checked: boolean;
}

export interface TabProps {
    animation: Keyframes | null;
}

export interface ProfileButtonMenuProps {
    open: boolean;
    animation: Keyframes | null;
}

export interface NewsFeedPageProps {
    userId: number;
    userType: string;
    userName: string;
    userSurname: string;
}

export interface TopTeacherData {
    teacherId: number;
    name: string;
    surname: string;
    rating: number;
    voterNum: number;
}

export interface UserFilters {
    minPrice: number,
    maxPrice: number,
    favouritesOnly: boolean,
    onPlace: boolean | null,
    subjectsOnly: string[],
    weekdays: string[]
}

export interface UserProps {
    userId: number,
    name: string,
    surname: string,
    userType: string,
    description: string,
    rating: number,
    subjects: string[],
    isFavourite: boolean
}

export const NewsFeedPageColorPalette = {
    mainColor: "rgba(1,157,209,1)",
    secondaryColor: "#f0f6f7",
    border: "#9c9c9c40",
    menuBG: "linear-gradient(90deg, rgba(50,157,255,1) 0, rgba(130,187,245,1) 15rem, rgba(130,187,245,1) 35rem, rgba(130,187,245,1) 55rem, rgba(1,127,245,1) 100%)",
    profileButtonBeforeBG: "radial-gradient(#f0f6f750 0%, #f0f6f700 65%)",
    shimmerBG: "linear-gradient(100deg, #00000000 20%, #f0f6f780 50%, #00000000 80%)",
    newsFeedBG: "linear-gradient(130deg, #87cefa20 0%, #a7feff90 40%, #87cefa50 100%)",
    searchButtonBG: "#ece9e9",
    searchButtonShadow: "rgba(0, 0, 0, 0.25)",
    recommendedTeacherRootBG: "linear-gradient(130deg, rgba(1,157,255,0.5) 0%, rgba(130,187,255,0.5) 40%, rgba(14,99,221,0.5) 100%)",
    recommendedStudentRootBG: "linear-gradient(130deg, rgba(255,157,1,0.8) 0%, rgba(255,187,130,0.8) 40%, rgba(221,99,14,0.8) 100%)",
    recommendedTeacherPictureBorder: "skyblue",
    recommendedStudentPictureBorder: "orange",
    recommendedTeacherPictureShadow: "powderblue",
    recommendedStudentPictureShadow: "orange",
    recommendationDescriptionBG: "transparent",
    scrollbarTrackBG: "#f0f6f7",
    scrollbarThumbBG: "rgba(1,157,255,0.6)",
    settingBG: "linear-gradient(130deg, rgba(70,207,255,0.3) 0%, rgba(130,187,255,0.3) 40%, rgba(50,157,255,0.3) 100%)",
    checkboxCheckedBorder: "lightgreen",
    checkboxUncheckedBorder: "skyblue",
    profileButtonMenuBG: "linear-gradient(130deg, rgba(210,217,255,1) 0%, rgba(240,247,255,1) 40%, rgba(210,217,255,1) 100%)",
    profileButtonMenuBorder: "#0000ff30",
    topTeacherBG: "linear-gradient(130deg, rgba(70,207,255,0.4) 0%, rgba(130,187,255,0.5) 40%, rgba(50,157,255,0.7) 100%)"
};