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
    color: string;
}

export interface RecommendedTeacherRootProps {
    color: string;
}

export interface LeftPanelOptionProps {
    isSelected: boolean;
    imageSrc: string;
    labelText: string;
    mainColor: string;
    secondaryColor: string;
}

export interface OptionOuterContainerProps {
    isSelected: boolean;
    color: string;
}

export interface OptionInnerContainerProps {
    color: string;
}