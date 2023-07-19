import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/Card.css";
import { TEACHER_ROLE_DESCRIPTION_MIN_LENGTH, TEACHER_ROLE_MIN_LENGTH } from "../../../../service/profile-page-service";

export const Card = (props: any): React.JSX.Element => {
    const { icon, title, body, userExperiences, userData, setUserData, isLoggedUser } = props;

    const [windowState, setWindowState] = useState<string>("window-hide");
    const [dimmerState, setDimmerState] = useState<string>("dimmer-hide");
    const [experiences, setExperiences] = useState<any[]>(userExperiences);

    const [currCompany, setCurrCompany] = useState<string>("");
    const [currRole, setCurrRole] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const showWindow = (): void => {
        setDimmerState("dimmer");
        setWindowState("window-popup");
    };

    const hideWindow = (): void => {
        setDimmerState("dimmer-hide");
        setWindowState("window-hide");
    };

    const updateUserExperiences = (): void => {
        if (!currCompany || currCompany.length < TEACHER_ROLE_MIN_LENGTH) {
            alert("კომპანიის დასახელება მოკლეა");
            return;
        }
        if (!currRole || currRole.length < TEACHER_ROLE_DESCRIPTION_MIN_LENGTH) {
            alert("როლის სახელწოდება მოკლეა");
            return;
        }
        if (startDate === "" || endDate === "") {
            alert("გთხოვთ შეავსოთ თარიღები!");
            return;
        }
        const d1 = Date.parse(startDate);
        const d2 = Date.parse(endDate);
        if (d1 > d2) {
            alert ("დაწყების თარიღი ნაკლები უნდა იყოს დასრულებისაზე");
            return;
        }
        const experience = {
            startDate,
            endDate,
            employer: currCompany,
            jobDescription: currRole
        };
        const currExperiences = [...experiences, experience];
        const updatedUserData = {...userData, teachersExperience: currExperiences};
        setExperiences(currExperiences);
        setUserData(updatedUserData);
        hideWindow();
    };

    return (
        <div className="card">
            <div className={dimmerState}></div>
            <div className={windowState}>
                <textarea className="experience-area description-area" maxLength={100} value={currCompany} placeholder="სამსახური/კომპანია" onChange={(e) => setCurrCompany(e.currentTarget.value)} />
                <textarea className="experience-area description-area" maxLength={150} value={currRole} placeholder="თქვენი როლი" onChange={(e) => setCurrRole(e.currentTarget.value)} />
                <label htmlFor="start-date" style={{color: "white"}}>დაწყების თარიღი</label>
                <input name="start-date" type="date" placeholder="საწყისი თარიღი" onChange={(e) => setStartDate(e.currentTarget.value)}/>
                <label htmlFor="end-date" style={{color: "white"}}>დასრულების თარიღი</label>
                <input name="end-date" type="date" placeholder="საბოლოო თარიღი" onChange={(e) => setEndDate(e.currentTarget.value)}/>

                <div className="verifier-buttons">
                    <div className="verifier-ok" onClick={() => updateUserExperiences()}>დადასტურება</div>
                    <div className="verifier-close" onClick={() => {
                        hideWindow();
                    }}>დახურვა</div>
                </div>
            </div>
            <div className="card-container">
                <div className="card-header">
                    <div className="card-icon">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                    <div className="header-content">
                        <div className="card-title">{title}</div>
                        {isLoggedUser && <div className="add-experience" onClick={() => showWindow()}>+</div>}
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-text">{body}</div>
                </div>
            </div>
        </div>
    );
};
