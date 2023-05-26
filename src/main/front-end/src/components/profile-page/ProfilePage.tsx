import React, { useState, useEffect } from "react";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGithub,
    faStackOverflow,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";
import {
    Logo,
    NavBar,
    HomePageArticle,
    Experience,
    AllProjects
} from "./components";
import { INFO, myArticles } from "./data";
import { LOGO_DEFAULT_SIZE } from "../../service/profile-page-service";
import "./ProfilePage.css";

export const ProfilePage = (): React.JSX.Element => {
    const [stayLogo, setStayLogo] = useState(false);
    const [logoSize, setLogoSize] = useState(LOGO_DEFAULT_SIZE);
    const [oldLogoSize, setOldLogoSize] = useState(80);

    // large or small size during scroll
    const logoStyle: any = {
        display: "flex",
        position: stayLogo ? "fixed" : "relative",
        top: stayLogo ? "4vh" : "auto",
        zIndex: 1000,
        border: stayLogo ? "1px solid white" : "none",
        borderRadius: stayLogo ? "50%" : "none",
        boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none"
    };

    useEffect(() => {
        document.title = INFO.main.title;
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = Math.round(window.pageYOffset);

            const newLogoSize = LOGO_DEFAULT_SIZE - scroll;

            if (newLogoSize < oldLogoSize) {
                if (newLogoSize > 40) {
                    setLogoSize(newLogoSize);
                    setOldLogoSize(newLogoSize);
                    setStayLogo(false);
                } else {
                    setStayLogo(true);
                }
            } else {
                setLogoSize(newLogoSize);
                setStayLogo(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [logoSize, oldLogoSize]);

    return (
        <React.Fragment>
            <div className="page-content">
                <NavBar active="home" />
                <div className="content-wrapper">
                    <div className="homepage-logo-container">
                        <div style={logoStyle}>
                            <Logo width={logoSize} link={false} />
                        </div>
                    </div>

                    <div className="homepage-container">
                        <div className="homepage-first-area">
                            <div className="homepage-first-area-left-side">
                                <div className="title homepage-title">
                                    {INFO.homepage.title}
                                </div>

                                <div className="subtitle homepage-subtitle">
                                    {INFO.homepage.description}
                                </div>
                            </div>

                            <div className="homepage-first-area-right-side">
                                <div className="homepage-image-container">
                                    <div className="homepage-image-wrapper">
                                        <img
                                            src="cover.jpg"
                                            alt="about"
                                            className="homepage-image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="homepage-socials">
                            <a
                                href={INFO.socials.twitter}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="homepage-social-icon"
                                />
                            </a>
                            <a
                                href={INFO.socials.github}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faGithub}
                                    className="homepage-social-icon"
                                />
                            </a>
                            <a
                                href={INFO.socials.stackoverflow}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faStackOverflow}
                                    className="homepage-social-icon"
                                />
                            </a>
                            <a
                                href={INFO.socials.instagram}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="homepage-social-icon"
                                />
                            </a>
                            <a
                                href={`mailto:${INFO.main.email}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faMailBulk}
                                    className="homepage-social-icon"
                                />
                            </a>
                        </div>

                        <div className="homepage-projects">
                            <AllProjects />
                        </div>

                        <div className="homepage-after-title">
                            <div className="homepage-articles">
                                {myArticles.map((article: any, index: any) => (
                                    <div
                                        className="homepage-article"
                                        key={(index + 1).toString()}
                                    >
                                        <HomePageArticle
                                            key={(index + 1).toString()}
                                            date={article().date}
                                            title={article().title}
                                            description={article().description}
                                            link={"/article/" + (index + 1)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="homepage-works">
                                <Experience />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
