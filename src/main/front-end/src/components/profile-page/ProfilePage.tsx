import React, { useState, useEffect } from "react";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
    ProfileImage,
    NavBar,
    Comment,
    Experience,
    Subjects,
    Calendar
} from "./components";
import { INFO, comments } from "./example-data";
import { PROFILE_IMAGE_DEFAULT_SIZE } from "../../service/profile-page-service";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";

export const ProfilePage = (): React.JSX.Element => {
    // TODO if needed in future
    const [stayProfileImage, setStayProfileImage] = useState(false);
    const [profileImageSize, setProfileImageSize] = useState(PROFILE_IMAGE_DEFAULT_SIZE);
    const [oldProfileImageSize, setOldProfileImageSize] = useState(PROFILE_IMAGE_DEFAULT_SIZE);
    const [userDescriptionState, setUserDescriptionState] = useState("user-description");

    const user = useParams();
    console.log(user);

    const [userSubjects, setUserSubjects] = useState(INFO.subjects); // Subjects state

    // large or small size during scroll
    const profileImageStyle: any = {
        display: "flex",
        position: stayProfileImage ? "fixed" : "relative",
        top: stayProfileImage ? "3vh" : "auto",
        zIndex: 1000,
        borderRadius: "50%",
        border: "1px solid white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"
    };

    useEffect(() => {
        document.title = "პროფილი";
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <NavBar active="profile" />

                <svg className="cover-svg" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <path id='sineWave' fill="#0099ff" fillOpacity="0.1"
                            d="M0,160 C320,300,420,300,740,160 C1060,20,1120,20,1440,160 V0 H0" />
                    </defs>
                    <use className="wave" href="#sineWave" />
                    <use className="wave" x="-100%" href="#sineWave" />
                    <use className="wave1" href="#sineWave" />
                    <use className="wave1" x="-100%" href="#sineWave" />
                    <use className="wave2" href="#sineWave" />
                    <use className="wave2" x="-100%" href="#sineWave" />
                </svg>

                <div className="content-wrapper">
                    <div className="ocean">
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>

                    <div className="profile-page-profile-image-container">
                        <div style={profileImageStyle}>
                            <ProfileImage width={profileImageSize} source={"ado.png"} />
                        </div>
                        <div className={userDescriptionState}>
                            <div id="name-div">
                                {"გიორგი ადიკაშვილი"}
                            </div>
                            <div className="user-short-description">
                                <div id="role-div">
                                    {"მასწავლებელი"}
                                </div>
                                <div id="rating-div">
                                    {"7.7"}
                                </div>
                            </div>
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

                                <div className="profile-page-socials">
                                    <a
                                        href={INFO.socials.facebook}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            className="profile-page-social-icon"
                                        />
                                    </a>
                                    <a
                                        href={INFO.socials.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FontAwesomeIcon
                                            icon={faLinkedin}
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
                            </div>

                            <div className="profile-page-first-area-right-side">
                                <div className="profile-page-calendar-container">
                                    <Calendar subjects={userSubjects} setSubjects={setUserSubjects}/>
                                </div>
                            </div>
                        </div>

                        <div className="profile-page-subjects">
                            <Subjects subjects={userSubjects}/>
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
