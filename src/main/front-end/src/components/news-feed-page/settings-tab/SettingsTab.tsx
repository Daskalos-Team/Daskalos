import React, { useState } from "react";
import styled, { Keyframes, keyframes } from "styled-components";
import {
    NewsFeedPageColorPalette,
    SettingArrowProps,
    SettingOptionsProps, SettingsProps, SUBJECTS
} from "../../../service/news-feed-page-service";
import { CheckboxComponent } from "../../helper-components/CheckboxComponent";

export const SettingsTab = (props: SettingsProps): React.JSX.Element => {
    const filters = props.filters;
    const [settingOptionsOpen, setSettingOptionsOpen] = useState([false, false]);
    const [settingOptionsAnimations, setSettingOptionsAnimations] = useState<(Keyframes | null)[]>([null, null]);
    const [arrowRotations, setArrowRotations] = useState([0, 0, 0]);

    const checkedInitial = new Map([
        ["ფავორიტები", filters.favouritesOnly],
        ["დისტანციური სწავლება", filters.onPlace == null ? true : !filters.onPlace],
        ["ადგილზე სწავლება", filters.onPlace == null ? true : filters.onPlace],
        ["ფასი", (filters.minPrice != null || filters.maxPrice != null) && (filters.minPrice! >= 0 || filters.maxPrice! <= 10000)]
    ]);
    SUBJECTS.forEach(subject => {
        checkedInitial.set(subject, filters.subjectsOnly.includes(subject));
    });
    const [checked, setChecked] = useState(checkedInitial);
    const [prices, setPrices] = useState([filters.minPrice == null ? 0 : Math.max(filters.minPrice, 0), filters.maxPrice == null ? 10000 : Math.min(filters.maxPrice, 10000)]);

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

    const updatePrices = (newPrices: number[], updateFilters: boolean) => {
        filters.minPrice = Math.min(Math.max(0, newPrices[0]), 10000);
        filters.maxPrice = Math.max(Math.min(10000, newPrices[1]), 0);
        setPrices([filters.minPrice, filters.maxPrice]);
        if (updateFilters) {
            props.filtersSetFn(filters);
        }
    };

    const toggleCheckboxChecked = (checkboxName: string) => {
        switch (checkboxName) {
            case "ფავორიტები": {
                filters.favouritesOnly = !filters.favouritesOnly;
                break;
            }
            case "დისტანციური სწავლება": {
                const distant = checked.get("დისტანციური სწავლება");
                const onPlace = checked.get("ადგილზე სწავლება");
                if (distant != onPlace) {
                    filters.onPlace = null;
                } else {
                    filters.onPlace = distant! && onPlace!;
                }
                break;
            }
            case "ადგილზე სწავლება": {
                const distant = checked.get("დისტანციური სწავლება");
                const onPlace = checked.get("ადგილზე სწავლება");
                if (distant != onPlace) {
                    filters.onPlace = null;
                } else {
                    filters.onPlace = !(distant || onPlace);
                }
                break;
            }
            case "ფასი": {
                if (!checked.get(checkboxName)) {
                    updatePrices(prices, true);
                } else {
                    filters.minPrice = -1;
                    filters.maxPrice = 1000000;
                    props.filtersSetFn(filters);
                }
                break;
            }
            default: {
                if (SUBJECTS.includes(checkboxName)) {
                    if (checked.get(checkboxName)) {
                        filters.subjectsOnly = filters.subjectsOnly.filter(s => s != checkboxName);
                    } else {
                        filters.subjectsOnly.push(checkboxName);
                    }
                }
            }
        }
        props.filtersSetFn(filters);
        const newChecked = new Map(checked);
        newChecked.set(checkboxName, !newChecked.get(checkboxName));
        setChecked(newChecked);
    };

    const setPriceLimit = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrices = [prices[0], prices[1]];
        if (type == "max") {
            if (e.target.value.length < 1) {
                newPrices[1] = 10000;
            } else {
                newPrices[1] = e.target.valueAsNumber;
            }
        } else if (type == "min") {
            if (e.target.value.length < 1) {
                newPrices[0] = 0;
            } else {
                newPrices[0] = e.target.valueAsNumber;
            }
        }
        updatePrices(newPrices, checked.get("ფასი") as boolean);
    };

    return (
        <SettingsRoot>
            <Setting>
                <SettingTitleContainer onClick={() => toggleSettings(0)}>
                    <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[0]} rotationDirection={1}/>
                    <SettingTitle>რეკომენდაციების ფილტრები</SettingTitle>
                    <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[0]} rotationDirection={-1}/>
                </SettingTitleContainer>
                <SettingOptionsContainer open={settingOptionsOpen[0]} animation={settingOptionsAnimations[0]}>
                    <SettingOptions>
                        {props.currUserType == "STUDENT" && (
                            <SettingOption>
                                <OptionLabel>ფავორიტები</OptionLabel>
                                <SettingsCheckbox checked={checked.get("ფავორიტები") as boolean} onClick={() => toggleCheckboxChecked("ფავორიტები")}/>
                            </SettingOption>
                        )}
                        <SettingOption>
                            <OptionLabel>დისტანციური სწავლება</OptionLabel>
                            <SettingsCheckbox checked={checked.get("დისტანციური სწავლება") as boolean} onClick={() => toggleCheckboxChecked("დისტანციური სწავლება")}/>
                        </SettingOption>
                        <SettingOption>
                            <OptionLabel>ადგილზე სწავლება</OptionLabel>
                            <SettingsCheckbox checked={checked.get("ადგილზე სწავლება") as boolean} onClick={() => toggleCheckboxChecked("ადგილზე სწავლება")}/>
                        </SettingOption>
                        <SettingOption>
                            <OptionLabel>ფასი</OptionLabel>
                            <PriceRangeContainer>
                                <FiltersNumberField type="number" value={prices[0]} min={0} max={10000} onChange={(e) => setPriceLimit("min", e)}/>
                                <FiltersDash>–</FiltersDash>
                                <FiltersNumberField type="number" value={prices[1]} min={0} max={10000} onChange={(e) => setPriceLimit("max", e)}/>
                            </PriceRangeContainer>
                            <SettingsCheckbox checked={checked.get("ფასი") as boolean} onClick={() => toggleCheckboxChecked("ფასი")}/>
                        </SettingOption>
                        <SettingOption onClick={() => toggleSettings(2)}>
                            <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[2]} rotationDirection={1}/>
                            <SettingTitle>საგნები</SettingTitle>
                            <Arrows src="/images/news-feed-page/DownArrow.png" rotation={arrowRotations[2]} rotationDirection={-1}/>
                        </SettingOption>
                        <SettingOptionsContainer open={settingOptionsOpen[2]} animation={settingOptionsAnimations[2]}>
                            <SettingOptions>
                                {SUBJECTS.map((subject) => (
                                    <SettingOption key={subject}>
                                        <OptionLabel>{subject}</OptionLabel>
                                        <SettingsCheckbox checked={checked.get(subject) as boolean} onClick={() => toggleCheckboxChecked(subject)}/>
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

const SettingsCheckbox = styled(CheckboxComponent)`
  margin-right: 20px;
  width: 35px;
  height: 35px;
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
  font-family: sans-serif;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;;
  }
`;

const FiltersDash = styled.p`
  width: fit-content;
  font-size: 16px;
  font-family: sans-serif;
  text-align: center;
  line-height: 48px;
`;