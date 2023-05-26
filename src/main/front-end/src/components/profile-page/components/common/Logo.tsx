import React from "react";
import { Link } from "react-router-dom";
import { INFO } from "../../data";
import "./styles/Logo.css";

export const Logo = (props: any): React.JSX.Element => {
    let { width, link } = props;

    if (link === undefined) {
        link = true;
    }

    const imageElement = (
        <img src={INFO.main.logo} alt="logo" className="logo" width={width} />
    );

    return (
        <React.Fragment>
            {link ? <Link to="/">{imageElement}</Link> : imageElement}
        </React.Fragment>
    );
};
