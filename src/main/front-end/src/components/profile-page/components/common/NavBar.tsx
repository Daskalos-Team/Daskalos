import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";
import { setUserMainData } from "../../../../service/session-service";
import { AppContext } from "../../../../App";
import { NEWS_FEED_LOAD_TIME } from "../../../../service/common-service";

export const NavBar = (props: any): React.JSX.Element => {
    const { active } = props;
    const { setTime }: any = useContext(AppContext);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const moveToNewsFeed = () => {
        setTime(NEWS_FEED_LOAD_TIME);
    };

    const logOut = () => {
        setUserMainData(-1, props.userType).then(_ => {
            window.location.reload();
        }).catch(err => console.log(err));
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
                        </ul>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
};
