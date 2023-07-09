import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/Card.css";

export const Card = (props: any): React.JSX.Element => {
    const { icon, title, body } = props;
    return (
        <div className="card">
            <div className="card-container">
                <div className="card-header">
                    <div className="card-icon">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                    <div className="header-content">
                        <div className="card-title">{title}</div>
                        <div className="add-experience" onClick={undefined}>+</div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-text">{body}</div>
                </div>
            </div>
        </div>
    );
};
