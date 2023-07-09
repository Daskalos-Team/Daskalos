import React, { useEffect, useState } from "react";
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
import {
    getUserData,
    PROFILE_IMAGE_DEFAULT_SIZE,
    SUBJECT_IN_ENGLISH,
    updateSubjects,
    updateUser,
    USER_TYPE_IN_GEORGIAN
} from "../../service/profile-page-service";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../service/session-service";

export const ProfilePage = (): React.JSX.Element => {
    const { userId, userType }: any = useParams();

    // TODO if needed in future
    const [stayProfileImage, setStayProfileImage] = useState(false);
    const [profileImageSize, setProfileImageSize] = useState(PROFILE_IMAGE_DEFAULT_SIZE);
    const [oldProfileImageSize, setOldProfileImageSize] = useState(PROFILE_IMAGE_DEFAULT_SIZE);
    const [userDescriptionState, setUserDescriptionState] = useState("user-description");

    // Data
    const [curUserID, setCurUserID] = useState(-1);
    const [curUserType, setCurUserType] = useState("");

    const [userData, setUserData] = useState<any>(undefined);
    const [userSubjects, setUserSubjects] = useState(undefined); // Subjects state
    const [userComments, setUserComments] = useState<any[]>([]); // comments state
    const [windowState, setWindowState] = useState<string>("window-hide"); // edit window state
    const [dimmerState, setDimmerState] = useState<string>("dimmer-hide");

    const [headerTitle, setHeaderTitle] = useState<string>("მომხმარებელს არ გააჩნია მოკლე სათაური");
    const [headerDescription, setHeaderDescription] = useState<string>("მომხმარებელს არ სურს გაჩვენოთ მოკლე აღწერა ან რაიმე ზოგადი კომენტარი");
    const [facebookUrl, setFacebookUrl] = useState<string>("");
    const [linkedinUrl, setLinkedinUrl] = useState<string>("");
    const [twitterUrl, setTwitterUrl] = useState<string>("");
    const [instagramUrl, setInstagramUrl] = useState<string>("");

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

    const noCommentStyle: any = {
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        padding: "10px",
        "margin-right": "10px",
        border: "1px solid whitesmoke",
        "border-radius": "20px"
    };

    useEffect(() => {
        async function getLoggedUser() {
            const response = await getUserMainData();
            if (response.data.userId == null || (response.data.userId as number) < 0) {
                return;
            }
            setCurUserID(response.data.userId as number);
            setCurUserType(response.data.userType);
        }
        getLoggedUser().catch(err => console.log(err));
        getUserData(userId, userType).then(response => {
            if (response) {
                setUserData(response.data);
                document.title = `${response.data.name} ${response.data.surname}`;
                window.scrollTo(0, 0);
            }
        });
    }, []);

    useEffect(() => {
        if (userData) {
            let subjects = userType === "TEACHER" ? userData.teacherSubjects : userData.studentSubjects;
            const comments = userType === "TEACHER" ? userData.teacherRatings : undefined;
            subjects = subjects.map((userSubject: any) => {
                return {
                    ...userSubject,
                    image: `../../subjects/${SUBJECT_IN_ENGLISH[userSubject.name]}.png`,
                    linkText: "იხილეთ დეტალები"
                };
            });
            setUserSubjects(subjects);
            setUserComments(comments);
            setHeaderTitle(userData?.title || "მომხმარებელს არ გააჩნია მოკლე სათაური");
            setHeaderDescription(userData?.description || "მომხმარებელს არ სურს გაჩვენოთ მოკლე აღწერა ან რაიმე ზოგადი კომენტარი");
            setFacebookUrl(userData?.fbUrl || "");
            setLinkedinUrl(userData?.linkedinUrl || "");
            setTwitterUrl(userData?.twitterUrl || "");
            setInstagramUrl(userData?.instaUrl || "");

            updateUser(userId, userType, userData);
        }
    }, [userData]);

    useEffect(() => {
        if (userSubjects) {
            updateSubjects(userId, userType, userSubjects);
        }
    }, [userSubjects]);

    const showWindow = (): void => {
        setDimmerState("dimmer");
        setWindowState("window-popup");
    };

    const hideWindow = (): void => {
        setDimmerState("dimmer-hide");
        setWindowState("window-hide");
    };

    const updateUserDescription = (): void => {
        if (!headerTitle || headerTitle.length < 30) {
            alert("სათაური მოკლეა");
            return;
        }
        if (!headerDescription || headerDescription.length < 50) {
            alert("აღწერა მოკლეა");
            return;
        }
        const updatedUserData = {...userData, title: headerTitle, description: headerDescription, fbUrl: facebookUrl, instaUrl: instagramUrl, linkedinUrl, twitterUrl};
        setUserData(updatedUserData);
        hideWindow();
    };

    return (<>
        {userSubjects ? (<React.Fragment>
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
                            <ProfileImage userID={userId} loggedUserID={curUserID} width={profileImageSize} userData={userData} setUserData={setUserData} />
                        </div>
                        <div className={userDescriptionState}>
                            <div id="name-div">
                                {`${userData.name} ${userData.surname}`}
                            </div>
                            <div className="user-short-description">
                                <div id="role-div" style={{background: userType === "TEACHER" ? "antiquewhite" : "greenyellow"}}>
                                    {USER_TYPE_IN_GEORGIAN[userData.userType]}
                                </div>
                                { userType === "TEACHER" ?
                                    <div id="rating-div">
                                        {"7.7"}
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>

                    <div className="profile-page-container">
                        <div className="profile-page-first-area">
                            <div className="profile-page-first-area-left-side">
                                <div className="title profile-page-title">
                                    {headerTitle}
                                </div>

                                <div className="subtitle profile-page-subtitle">
                                    {headerDescription}
                                </div>

                                <div className="profile-page-socials">
                                    {facebookUrl !== "" ?
                                        <a
                                            href={`${facebookUrl}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                                className="profile-page-social-icon"
                                            />
                                        </a> : null
                                    }
                                    {linkedinUrl !== "" ?
                                        <a
                                            href={`${linkedinUrl}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FontAwesomeIcon
                                                icon={faLinkedin}
                                                className="profile-page-social-icon"
                                            />
                                        </a> : null
                                    }
                                    {twitterUrl !== "" ?
                                        <a
                                            href={`${twitterUrl}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTwitter}
                                                className="profile-page-social-icon"
                                            />
                                        </a> : null
                                    }
                                    {instagramUrl !== "" ?
                                        <a
                                            href={`${instagramUrl}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FontAwesomeIcon
                                                icon={faInstagram}
                                                className="profile-page-social-icon"
                                            />
                                        </a> : null
                                    }
                                    <a
                                        href={`mailto:${userData?.email}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FontAwesomeIcon
                                            icon={faMailBulk}
                                            className="profile-page-social-icon"
                                        />
                                    </a>
                                </div>
                                {curUserID == userId && <div className="update-description" onClick={() => showWindow()}>განახლება</div>}
                            </div>

                            <div className={dimmerState}></div>
                            <div className={windowState}>
                                <textarea className="title-area description-area" maxLength={70} value={headerTitle} placeholder="მოკლე სათაური" onChange={(e) => setHeaderTitle(e.currentTarget.value)} />
                                <textarea className="description-area" maxLength={150} value={headerDescription} placeholder="ზოგადი კომენტარი" onChange={(e) => setHeaderDescription(e.currentTarget.value)} />

                                <h6 style={{color: "lightgreen"}}>________________ სოციალური ქსელები ________________</h6>

                                <div className="social-input">
                                    <label>
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            className="profile-page-social-icon"
                                        /></label>
                                    <input placeholder="თუ არ გაქვთ, დატოვეთ ცარიელი" value={facebookUrl} onChange={(e) => setFacebookUrl(e.currentTarget.value)}/>
                                </div>
                                <div className="social-input">
                                    <label>
                                        <FontAwesomeIcon
                                            icon={faLinkedin}
                                            className="profile-page-social-icon"
                                        /></label>
                                    <input placeholder="თუ არ გაქვთ, დატოვეთ ცარიელი" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.currentTarget.value)}/>
                                </div>
                                <div className="social-input">
                                    <label>
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            className="profile-page-social-icon"
                                        /></label>
                                    <input placeholder="თუ არ გაქვთ, დატოვეთ ცარიელი" value={twitterUrl} onChange={(e) => setTwitterUrl(e.currentTarget.value)}/>
                                </div>
                                <div className="social-input">
                                    <label>
                                        <FontAwesomeIcon
                                            icon={faInstagram}
                                            className="profile-page-social-icon"
                                        /></label>
                                    <input placeholder="თუ არ გაქვთ, დატოვეთ ცარიელი" value={instagramUrl} onChange={(e) => setInstagramUrl(e.currentTarget.value)}/>
                                </div>
                                <div className="verifier-buttons">
                                    <div className="verifier-ok" onClick={() => updateUserDescription()}>დადასტურება</div>
                                    <div className="verifier-close" onClick={() => {
                                        hideWindow();
                                    }}>დახურვა</div>
                                </div>
                            </div>
                            <div className="profile-page-first-area-right-side">
                                <div className="profile-page-calendar-container">
                                    <Calendar userID={userId} loggedUserID={curUserID} subjects={userSubjects} setSubjects={setUserSubjects} />
                                </div>
                            </div>
                        </div>

                        <div className="profile-page-subjects">
                            <Subjects subjects={userSubjects} />
                        </div>

                        {userType === "TEACHER" ?
                            <div className="profile-page-after-title">
                                <div className="profile-page-comments">
                                    {userComments && userComments.length !== 0 ? userComments.map((comment: any, index: any) => (
                                        <div
                                            className="profile-page-comment"
                                            key={(index + 1).toString()}
                                        >
                                            <Comment
                                                edit={false}
                                                key={(index + 1).toString()}
                                                date={comment?.addDate}
                                                title={comment?.title}
                                                description={comment?.studentComment}
                                                link={`/${comment?.studentID}/STUDENT`}
                                                rating={comment?.rating}
                                            />
                                        </div>
                                    )) : <h2 style={noCommentStyle}> კომენტარები არ არის </h2>}
                                    {
                                        userType === "TEACHER" && curUserType === "STUDENT" ?
                                            <Comment
                                                edit={true}
                                                studentID={curUserID}
                                                teacherID={userId}
                                                userComments={userComments}
                                                setUserComments={setUserComments}
                                            /> : null
                                    }
                                </div>

                                <div className="profile-page-experiences">
                                    <Experience />
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>) : (
            <div className="loader-container">
                <div className="spinner-label-background"/>
                <div className="content">
                    <h2>დასკალოსი</h2>
                    <h2>დასკალოსი</h2>
                </div>
                <div className="spinner"/>
            </div>
        )
        }
    </>
    );
};
