import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import "./styles/Subject.css";

export const Subject = (props: any): React.JSX.Element => {
    const { logo, title, description, linkText, link } = props;

    return (
        <React.Fragment>
            <div className="subject">
                <Link to={link}>
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
                </Link>
            </div>
        </React.Fragment>
    );
};
