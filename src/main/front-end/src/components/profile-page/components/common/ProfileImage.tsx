import React from "react";
import { Link } from "react-router-dom";
import "./styles/ProfileImage.css";

export const ProfileImage = (props: any): React.JSX.Element => {
    let { width, link } = props;

    if (link === undefined) {
        link = true;
    }

    const imageElement = (
        <img src={"ado.png"} alt="profile image" className="profile-image" width={width} />
    );

    return (
        <React.Fragment>
            {link ? <Link to="/">{imageElement}</Link> : imageElement}
        </React.Fragment>
    );
};
