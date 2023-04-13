import React from "react";
import "./Filters.css";

export const Filters = (): JSX.Element => {
    return (
        <React.Fragment>
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
    );
};