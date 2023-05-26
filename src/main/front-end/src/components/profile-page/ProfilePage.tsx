import React, { useState, useEffect } from "react";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
    ProfileImage,
    NavBar,
    Comment,
    Experience,
    Subjects
} from "./components";
import { INFO, comments } from "./example-data";
import { PROFILE_IMAGE_DEFAULT_SIZE } from "../../service/profile-page-service";
import "./ProfilePage.css";

export const ProfilePage = (): React.JSX.Element => {
    const [stayProfileImage, setStayProfileImage] = useState(false);
    const [profileImageSize, setProfileImageSize] = useState(PROFILE_IMAGE_DEFAULT_SIZE);
    const [oldProfileImageSize, setOldProfileImageSize] = useState(80);

    // large or small size during scroll
    const profileImageStyle: any = {
        display: "flex",
        position: stayProfileImage ? "fixed" : "relative",
        top: stayProfileImage ? "3vh" : "auto",
        zIndex: 1000,
        border: stayProfileImage ? "1px solid white" : "none",
        borderRadius: stayProfileImage ? "50%" : "none",
        boxShadow: stayProfileImage ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none"
    };

    useEffect(() => {
        document.title = "პროფილი";
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = Math.round(window.pageYOffset);

            const newProfileImageSize = PROFILE_IMAGE_DEFAULT_SIZE - scroll;

            if (newProfileImageSize < oldProfileImageSize) {
                if (newProfileImageSize > 40) {
                    setProfileImageSize(newProfileImageSize);
                    setOldProfileImageSize(newProfileImageSize);
                    setStayProfileImage(false);
                } else {
                    setStayProfileImage(true);
                }
            } else {
                setProfileImageSize(newProfileImageSize);
                setStayProfileImage(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [profileImageSize, oldProfileImageSize]);

    return (
        <React.Fragment>
            <div className="page-content">
                <NavBar active="home" />
                <div className="content-wrapper">
                    <div className="profile-page-profile-image-container">
                        <div style={profileImageStyle}>
                            <ProfileImage width={profileImageSize} link={false} />
                        </div>
                    </div>

                    <div className="profile-page-container">
                        <div className="profile-page-first-area">
                            <div className="profile-page-first-area-left-side">
                                <div className="title profile-page-title">
                                    {"პროგრამული უზრუნველყოფის ინჟინერი, მათემატიკის მასწავლებელი"}
                                </div>

                                <div className="subtitle profile-page-subtitle">
                                    {"2019 წლიდან ვასწავლი მათემატიკას, დამატებით ვარ პროგრამისტი და " +
                                      "შემიძლია პროგრამირების და კიდევ სხვა საინტერესო საგნების სწავლებაც, " +
                                      "ორივეს ერთად თუ მოისურვებთ შემოგთავაზებთ გარკვეულ ფასდაკლებებს"}
                                </div>
                            </div>

                            <div className="profile-page-first-area-right-side">
                                <div className="profile-page-image-container">
                                    <div className="profile-page-image-wrapper">
                                        <img
                                            src="cover.jpg"
                                            alt="about"
                                            className="profile-page-image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-page-socials">
                            <a
                                href={`mailto:${INFO.socials.facebook}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    className="profile-page-social-icon"
                                />
                            </a>
                            <a
                                href={INFO.socials.twitter}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="profile-page-social-icon"
                                />
                            </a>
                            <a
                                href={INFO.socials.instagram}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="profile-page-social-icon"
                                />
                            </a>
                            <a
                                href={"mailto:adikashviligiorgi@gmail.com"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faMailBulk}
                                    className="profile-page-social-icon"
                                />
                            </a>
                        </div>

                        <div className="profile-page-projects">
                            <Subjects />
                        </div>

                        <div className="profile-page-after-title">
                            <div className="profile-page-comments">
                                {comments.map((comment: any, index: any) => (
                                    <div
                                        className="profile-page-comment"
                                        key={(index + 1).toString()}
                                    >
                                        <Comment
                                            key={(index + 1).toString()}
                                            date={comment().date}
                                            title={comment().title}
                                            description={comment().description}
                                            link={"/comment/" + (index + 1)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="profile-page-experiences">
                                <Experience />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
