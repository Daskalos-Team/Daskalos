import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";
import { setUserMainData } from "../../../../service/session-service";
import { AppContext } from "../../../../App";
import { NEWS_FEED_LOAD_TIME } from "../../../../service/common-service";

export const NavBar = (props: any): React.JSX.Element => {
    const { active, isCurrUser } = props;
    const { setTime }: any = useContext(AppContext);
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const moveToNewsFeed = () => {
        setTime(NEWS_FEED_LOAD_TIME);
    };

    const logOut = () => {
        setUserMainData(-1, "STUDENT", "", "").then(_ => {
            navigate("/");
        }).catch(() => undefined);
    };

    return (
        <React.Fragment>
            <div className="nav-container">
                <nav className="navbar">
                    <div className={isCurrUser ? "nav-background" : "nav-background nav-background-short"}>
                        <ul className="nav-list">
                            <li
                                className={
                                    active === "profile"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                                onClick={scrollToTop}
                            >
                                <a>პროფილი</a>
                            </li>
                            <li
                                className={
                                    active === "home"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/" onClick={() => moveToNewsFeed()}>მთავარი გვერდი</Link>
                            </li>
                            {isCurrUser &&
                            <li
                                className={
                                    active === "logout"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                                onClick={() => logOut()}
                            >
                                <a>გამოსვლა</a>
                            </li>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
};
