import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/Card.css";

export const Card = (props: any): React.JSX.Element => {
    const { icon, title, body, userExperiences, userData, setUserData, isLoggedUser } = props;

    const [windowState, setWindowState] = useState<string>("window-hide");
    const [dimmerState, setDimmerState] = useState<string>("dimmer-hide");
    const [experiences, setExperiences] = useState<any[]>(userExperiences);

    const [currCompany, setCurrCompany] = useState<string>("");
    const [currRole, setCurrRole] = useState<string>("");

    const showWindow = (): void => {
        setDimmerState("dimmer");
        setWindowState("window-popup");
    };

    const hideWindow = (): void => {
        setDimmerState("dimmer-hide");
        setWindowState("window-hide");
    };

    const updateUserExperiences = (): void => {
        if (!currCompany || currCompany.length < 7) {
            alert("კომპანიის დასახელება მოკლეა");
            return;
        }
        if (!currRole || currRole.length < 10) {
            alert("როლის სახელწოდება მოკლეა");
            return;
        }
        const experience = {
            employer: currCompany,
            jobDescription: currRole
        };
        const currExperiences = [...experiences, experience];
        const updatedUserData = {...userData, teachersExperience: currExperiences};
        console.log(updatedUserData);
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
