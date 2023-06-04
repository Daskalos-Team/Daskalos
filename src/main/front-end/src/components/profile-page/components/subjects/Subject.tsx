import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import "./styles/Subject.css";
import { SUBJECT_TO_COLOR } from "../../../../service/profile-page-service";

export const Subject = (props: any): React.JSX.Element => {
    const { logo, title, description, linkText, price } = props;

    const [subjectWindowState, setSubjectWindowState] = useState<string>("subject-window-hide");
    const [subjectDimmerState, setSubjectDimmerState] = useState<string>("subject-dimmer-hide");

    const showWindow = (): void => {
        setSubjectDimmerState("subject-dimmer");
        setSubjectWindowState("subject-window-popup");
    };

    const hideWindow = (): void => {
        setSubjectDimmerState("subject-dimmer-hide");
        setSubjectWindowState("subject-window-hide");
    };

    return (
        <React.Fragment>
            <div className={subjectDimmerState}></div>
            <div className={subjectWindowState}>
                <div className="title-div" style={{background: SUBJECT_TO_COLOR[title]}}> {title} </div>
                <div className="price-div">
                    <h5 className="price-label">სასურველი ფასი</h5>
                    <div className="price-number"> {price} ₾ </div>
                </div>
                <div className="subject-verifier-buttons">
                    <div className="subject-verifier-close" onClick={() => {
                        hideWindow();
                    }}>დახურვა</div>
                </div>
            </div>
            <div className="subject">
                <a onClick={() => showWindow()}>
                    <div className="subject-container">
                        <div className="subject-logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="subject-title">{title}</div>
                        <div className="subject-description">{description}</div>
                        <div className="subject-link">
                            <div className="subject-link-icon">
                                <FontAwesomeIcon icon={faLink} />
                            </div>

                            <div className="subject-link-text">{linkText}</div>
                        </div>
                    </div>
                </a>
            </div>
        </React.Fragment>
    );
};
