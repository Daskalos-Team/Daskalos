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

export interface RecommendedTeacherProps {
    isFavourite: boolean;
    rootScale: number;
}

export interface RecommendedTeacherScaleProps {
    rootScale: number;
}

export interface LeftPanelOptionProps {
    isSelected: boolean;
    imageSrc: string;
    labelText: string;
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
    recommendedTeacherPictureShadow: "powderblue",
    recommendedTeacherDescriptionBG: "transparent",
    scrollbarTrackBG: "#f0f6f7",
    scrollbarThumbBG: "rgba(1,157,255,0.6)",
    settingBG: "linear-gradient(130deg, rgba(70,207,255,0.3) 0%, rgba(130,187,255,0.3) 40%, rgba(50,157,255,0.3) 100%)",
    checkboxCheckedBorder: "lightgreen",
    checkboxUncheckedBorder: "skyblue",
    profileButtonMenuBG: "linear-gradient(130deg, rgba(210,217,255,1) 0%, rgba(240,247,255,1) 40%, rgba(210,217,255,1) 100%)",
    profileButtonMenuBorder: "#0000ff30"
};