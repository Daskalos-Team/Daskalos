import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import "./styles/Subject.css";

export const Subject = (props: any): React.JSX.Element => {
    const { logo, title, description, linkText, price } = props;

    const [windowState, setWindowState] = useState<string>("window-hide");
    const [dimmerState, setDimmerState] = useState<string>("dimmer-hide");

    const showWindow = (): void => {
        setDimmerState("dimmer");
        setWindowState("window-popup");
    };

    const hideWindow = (): void => {
        setDimmerState("dimmer-hide");
        setWindowState("window-hide");
    };

    return (
        <React.Fragment>
            <div className="subject">
                <div className={dimmerState}></div>
                <div className={windowState}>
                    <div> { price } </div>
                    <div className="verifier-buttons">
                        <div className="verifier-ok" onClick={undefined}>დადასტურება</div>
                        <div className="verifier-close" onClick={() => {
                            hideWindow();
                        }}>დახურვა</div>
                    </div>
                </div>

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
