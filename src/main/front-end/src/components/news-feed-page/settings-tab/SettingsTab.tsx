import React, { useState } from "react";
import styled, { Keyframes, keyframes } from "styled-components";
import {
    CheckboxProps,
    NewsFeedPageColorPalette,
    SettingArrowProps,
    SettingOptionsProps
} from "../../../service/news-feed-page-service";

export const SettingsTab = (): React.JSX.Element => {
    const [settingOptionsOpen, setSettingOptionsOpen] = useState([false, false, false]);
    const [settingOptionsAnimations, setSettingOptionsAnimations] = useState<(Keyframes | null)[]>([null, null]);
    const [arrowRotations, setArrowRotations] = useState([0, 0, 0, 0]);

    const subjects = ["მათემატიკა", "ქართული", "ფიზიკა", "ბიოლოგია", "გეოგრაფია", "ისტორია"];
    const weekdays = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"];
    const checkedInitial = new Map([
        ["ფავორიტები", true],
        ["დისტანციური სწავლება", false],
        ["ფასი", true]
    ]);
    for (const subject in subjects) {
        checkedInitial.set(subject, false);
    }
    for (const weekday in weekdays) {
        checkedInitial.set(weekday, false);
    }
    const [checked, setChecked] = useState(checkedInitial);

    const toggleSettings = (settingId: number) => {
        const newSettingOptionsOpen = settingOptionsOpen.slice();
        newSettingOptionsOpen[settingId] = !newSettingOptionsOpen[settingId];
        const newSettingOptionsAnimations = settingOptionsAnimations.slice();
        newSettingOptionsAnimations[settingId] = newSettingOptionsOpen[settingId] ? RollDown : RollUp;
        const newArrowRotations = arrowRotations.slice();
        newArrowRotations[settingId] = newArrowRotations[settingId] == 0 ? 180 : 0;
        setSettingOptionsOpen(newSettingOptionsOpen);
        setSettingOptionsAnimations(newSettingOptionsAnimations);
        setArrowRotations(newArrowRotations);
    };

    const toggleCheckboxChecked = (checkboxName: string) => {
        const newChecked = new Map(checked);
        newChecked.set(checkboxName, !newChecked.get(checkboxName));
        setChecked(newChecked);
    };

    return (
        <SettingsRoot>
            <Setting>
                <SettingTitleContainer onClick={() => toggleSettings(0)}>
                    <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[0]} rotationDirection={1}/>
                    <SettingTitle>რეკომენდირებული მასწავლებლების ფილტრები</SettingTitle>
                    <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[0]} rotationDirection={-1}/>
                </SettingTitleContainer>
                <SettingOptionsContainer open={settingOptionsOpen[0]} animation={settingOptionsAnimations[0]}>
                    <SettingOptions>
                        <SettingOption>
                            <OptionLabel>ფავორიტები</OptionLabel>
                            <Checkbox checked={checked.get("ფავორიტები") as boolean} onClick={() => toggleCheckboxChecked("ფავორიტები")}/>
                        </SettingOption>
                        <SettingOption>
                            <OptionLabel>დისტანციური სწავლება</OptionLabel>
                            <Checkbox checked={checked.get("დისტანციური") as boolean} onClick={() => toggleCheckboxChecked("დისტანციური")}/>
                        </SettingOption>
                        <SettingOption>
                            <OptionLabel>ფასი</OptionLabel>
                            <PriceRangeContainer>
                                <FiltersNumberField type="number" min={0}/>
                                <FiltersDash>–</FiltersDash>
                                <FiltersNumberField type="number" min={0}/>
                            </PriceRangeContainer>
                            <Checkbox checked={checked.get("ფასი") as boolean} onClick={() => toggleCheckboxChecked("ფასი")}/>
                        </SettingOption>
                        <SettingOption onClick={() => toggleSettings(2)}>
                            <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[2]} rotationDirection={1}/>
                            <SettingTitle>საგნები</SettingTitle>
                            <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[2]} rotationDirection={-1}/>
                        </SettingOption>
                        <SettingOptionsContainer open={settingOptionsOpen[2]} animation={settingOptionsAnimations[2]}>
                            <SettingOptions>
                                {subjects.map((subject) => (
                                    <SettingOption key={subject}>
                                        <OptionLabel>{subject}</OptionLabel>
                                        <Checkbox checked={checked.get(subject) as boolean} onClick={() => toggleCheckboxChecked(subject)}/>
                                    </SettingOption>
                                ))}
                            </SettingOptions>
                        </SettingOptionsContainer>
                        <SettingOption onClick={() => toggleSettings(3)}>
                            <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[3]} rotationDirection={1}/>
                            <SettingTitle>თავისუფალი დღეები</SettingTitle>
                            <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[3]} rotationDirection={-1}/>
                        </SettingOption>
                        <SettingOptionsContainer open={settingOptionsOpen[3]} animation={settingOptionsAnimations[3]}>
                            <SettingOptions>
                                {weekdays.map((weekday) => (
                                    <SettingOption key={weekday}>
                                        <OptionLabel>{weekday}</OptionLabel>
                                        <Checkbox checked={checked.get(weekday) as boolean} onClick={() => toggleCheckboxChecked(weekday)}/>
                                    </SettingOption>
                                ))}
                            </SettingOptions>
                        </SettingOptionsContainer>
                    </SettingOptions>
                </SettingOptionsContainer>
            </Setting>
        </SettingsRoot>
    );
};

const RollDown = keyframes`
  0% {grid-template-rows: 0fr}
  100% {grid-template-rows: 1fr}
`;

const RollUp = keyframes`
  0% {grid-template-rows: 1fr}
  100% {grid-template-rows: 0fr}
`;

const SettingsRoot = styled.div`
  width: 90%;
  margin: 50px 0 20px 0;
  display: flex;
  flex-direction: column;
`;

const Setting = styled.div`
    margin-bottom: 50px;
`;

const SettingTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  background: ${NewsFeedPageColorPalette.settingBG};
  border: 3px solid lightskyblue;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 0 10px lightcyan;
  };
`;

const Arrows = styled.img<SettingArrowProps>`
  height: 10px;
  width: auto;
  margin-inline: 20px;
  transition-property: transform;
  transition-duration: 300ms;
  transform: rotate(${props => props.rotation * props.rotationDirection}deg);
  cursor: pointer;
`;

const SettingTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: black;
  font-weight: 600;
  margin-block: 10px;
  justify-self: center;
  cursor: pointer;
`;

const SettingOptionsContainer = styled.div<SettingOptionsProps>`
  display: grid;
  animation: ${props => props.animation} 300ms;
  grid-template-rows: ${props => props.open ? 1 : 0}fr;
`;

const SettingOptions = styled.div`
  margin-inline: 5%;
  transform-origin: top;
  overflow: hidden;
`;

const SettingOption = styled.div`
  margin-bottom: 30px;
  background: ${NewsFeedPageColorPalette.settingBG};
  border: 3px solid lightskyblue;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-inline: 20px;
`;

const OptionLabel = styled.p`
  font-size: 1.2rem;
  color: black;
  font-weight: 600;
  margin-block: 10px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: default;
`;

const Checkbox = styled.div<CheckboxProps>`
  margin-right: 20px;
  width: 35px;
  height: 35px;
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

const PriceRangeContainer = styled.div`
  width: min(60%, 400px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FiltersNumberField = styled.input`
  width: min(40%, 170px);
  height: 30px;
  padding-top: 18px;
  padding-bottom: 18px;
  border-width: 0;
  padding-inline: 5px;
  font-family: "Noto Serif Georgian";
  text-align: center;

  &:hover {
    background-color: #f0f0f0;;
  }
`;

const FiltersDash = styled.p`
  width: fit-content;
  font-size: 16px;
  font-family: "Noto Serif Georgian";
  text-align: center;
  line-height: 48px;
`;