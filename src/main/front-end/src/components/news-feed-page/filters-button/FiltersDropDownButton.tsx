import React, { useReducer } from "react";
import "./FiltersDropDownButton.css";

interface Props {
    visibleFilters: "Visible" | "Invisible";
    style: any;
}

export const FiltersDropDownButton = ({visibleFilters, style}: Props): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, {
        visibleFilters: visibleFilters || "Invisible"
    });

    return (
        <div id="filters-drop-down-button" style={{
            ...{
                top: state.visibleFilters === "Visible" ? "124px" : "20px"
            },
            ...style
        }}
        >
            <React.Fragment>
                {state.visibleFilters == "Invisible" && (
                    <React.Fragment>
                        <div id="drop-down-button">
                            <button id="search-label" className={"button"} onClick={() => {
                                dispatch("click");
                            }}>ძებნა</button>
                            <img id="down-arrow" alt="drop down arrow"/>
                        </div>
                    </React.Fragment>
                )}

                {state.visibleFilters == "Visible" && (
                    <React.Fragment>
                        <div id="drop-down-button">
                            <button id="search-label" onClick={() => {
                                dispatch("click");
                            }}>ძებნა</button>
                            <img id="up-arrow" alt="drop down arrow"/>
                        </div>
                        <div id="filters">
                            <p id="filters-label" className={"label"}>ფილტრები</p>
                            <div id="name-filter">
                                <input id="name-filter-field" type={"text"} className={"text-field"}/>
                                <p id="name-label" className={["label", "label-small"].join(" ")}>სახელი</p>
                            </div>
                            <div id="price-filter">
                                <input id="min-price-input" type={"number"} className={"text-field"}/>
                                <p id={"dash"} className={"label"}>-</p>
                                <input id="max-price-input" type={"number"} className={"text-field"}/>
                                <p id={"price-label"} className={["label", "label-small"].join(" ")}>ფასი</p>
                            </div>
                        </div>
                        <div id={"subject-filter"}>
                            <input id={"subject-filter-field"} type={"text"} className={"text-field"}/>
                            <p id={"subject-label"} className={["label", "label-small"].join(" ")}>საგანი</p>
                        </div>
                        <div id={"date-filter"}>
                            <p id={"date-label"} className={["label", "label-small"].join(" ")}>დროები</p>
                            <button id={"date-selection-button"} type={"button"}>აირჩიეთ დროები</button>
                        </div>
                        <div id={"location-filter"}>
                            <p id={"location-label"} className={["label", "label-small"].join(" ")}>ლოკაცია</p>
                            <button id={"location-selection-button"}>აირჩიეთ ლოკაცია</button>
                        </div>
                        <img id={"map-image"} alt={"map"}/>
                        <button id={"confirm-button"}>დადასტურება</button>
                    </React.Fragment>
                )}
            </React.Fragment>
        </div>
    );
};

function reducer(state: any, action: any) {
    if (action == "click") {
        switch (state.visibleFilters) {
            case "Invisible":
                return {
                    visibleFilters: "Visible"
                };
            case "Visible":
                return {
                    visibleFilters: "Invisible"
                };
        }
    }
    return state;
}