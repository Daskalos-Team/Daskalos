import { Keyframes } from "styled-components";

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

export interface IconCreditsProps {
    visible: boolean;
    animation: Keyframes | null;
}

export interface RecommendedTeacherProps {
    isFavourite: boolean;
}

export interface LeftPanelOptionProps {
    isSelected: boolean;
    imageSrc: string;
    labelText: string;
}

export interface OptionOuterContainerProps {
    isSelected: boolean;
}

export const NewsFeedPageColorPalette = {
    mainColor: "rgba(1,157,209,1)",
    secondaryColor: "#f0f6f7",
    border: "#9c9c9c40",
    headerBG: "linear-gradient(130deg, rgba(1,157,209,1) 0%, rgba(1,157,209,1) 300px, rgba(14, 99, 161, 1) 100%)",
    profileButtonBeforeBG: "radial-gradient(#f0f6f720 0%, #f0f6f700 65%)",
    shimmerBG: "linear-gradient(100deg, #00000000 20%, #f0f6f780 50%, #00000000 80%)",
    newsFeedBG: "linear-gradient(130deg, #87cefa20 0%, #a7feff90 40%, #87cefa50 100%)",
    searchButtonBG: "#ece9e9",
    searchButtonShadow: "rgba(0, 0, 0, 0.25)",
    recommendedTeacherRootBG: "linear-gradient(130deg, rgba(1,157,255,0.5) 0%, rgba(130,187,255,0.5) 40%, rgba(14,99,221,0.5) 100%)",
    recommendedTeacherPictureShadow: "powderblue",
    recommendedTeacherDescriptionBG: "transparent",
    scrollbarTrackBG: "#f0f6f7",
    scrollbarThumbBG: "rgba(1,157,255,0.6)"
};