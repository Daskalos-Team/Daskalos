import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export const NavBar = (props: any): React.JSX.Element => {
    const { active } = props;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <React.Fragment>
            <div className="nav-container">
                <nav className="navbar">
                    <div className="nav-background">
                        <ul className="nav-list">
                            <li
                                className={
                                    active === "profile"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                                onClick={scrollToTop}
                            >
                                <Link to="/profile-page">პროფილი</Link>
                            </li>
                            <li
                                className={
                                    active === "home"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/news-feed">მთავარი გვერდი</Link>
                            </li>
                            <li
                                className={
                                    active === "logout"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/">გამოსვლა</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
};
