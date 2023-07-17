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
    getStudentFavourites,
    getUserData,
    PROFILE_IMAGE_DEFAULT_SIZE,
    SUBJECT_IN_ENGLISH,
    updateSubjects,
    updateUser,
    USER_TYPE_IN_GEORGIAN
} from "../../service/profile-page-service";
import "./ProfilePage.css";
import { Link, useParams } from "react-router-dom";
import { getUserMainData } from "../../service/session-service";
import styled, { Keyframes } from "styled-components";
import { CheckboxComponent } from "../helper-components/CheckboxComponent";
import { addFavourite, FavouriteProps, removeFavourite } from "../../service/news-feed-page-service";
import { spinClockwise, spinCounterClockwise } from "../news-feed-page/recommended-teacher";

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
    const [userComments, setUserComments] = useState<any>(undefined); // comments state
    const [windowState, setWindowState] = useState<string>("window-hide"); // edit window state
    const [dimmerState, setDimmerState] = useState<string>("dimmer-hide");

    const [headerTitle, setHeaderTitle] = useState<string>("მომხმარებელს არ გააჩნია მოკლე სათაური");
    const [headerDescription, setHeaderDescription] = useState<string>("მომხმარებელს არ სურს გაჩვენოთ მოკლე აღწერა ან რაიმე ზოგადი კომენტარი");
    const [facebookUrl, setFacebookUrl] = useState<string>("");
    const [linkedinUrl, setLinkedinUrl] = useState<string>("");
    const [twitterUrl, setTwitterUrl] = useState<string>("");
    const [instagramUrl, setInstagramUrl] = useState<string>("");
    const [userFavourites, setUserFavourites] = useState<any>(undefined);
    const [userRatings, setUserRatings] = useState<any>(undefined);
    const [checked, setChecked] = useState<any>(undefined);

    const [favouriteImageSrc, setFavouriteImageSrc] = useState("");
    const [favouriteAnimation, setFavouriteAnimation] = useState<Keyframes | null>(null);

    const FavouriteFunction = () => {
        if (favouriteImageSrc == "/images/news-feed-page/FavouriteUnselected.png") {
            addFavourite(curUserID, userId);
            setFavouriteAnimation(spinClockwise);
        } else {
            removeFavourite(curUserID, userId);
            setFavouriteAnimation(spinCounterClockwise);
        }
        setFavouriteImageSrc(favouriteImageSrc == "/images/news-feed-page/FavouriteUnselected.png" ?
            "/images/news-feed-page/FavouriteSelected.png" :
            "/images/news-feed-page/FavouriteUnselected.png");
    };

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

    const noContentStyle: any = {
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
            if (response.data.userType == "STUDENT" && userType == "TEACHER") {
                getStudentFavourites(response.data.userId as number).then(resp => {
                    let selected = false;
                    if (resp.data) {
                        resp.data.forEach((favourite: any) => {
                            if (favourite.id == userId) {
                                selected = true;
                            }
                        });
                    }
                    setFavouriteImageSrc(selected ? "/images/news-feed-page/FavouriteSelected.png" : "/images/news-feed-page/FavouriteUnselected.png");
                }).catch(err => console.log(err));
            }
            return response;
        }
        getLoggedUser().then(response => {
            if (userType === "STUDENT" && userId == response.data.userId) {
                getStudentFavourites(userId).then(response => {
                    setUserFavourites(response.data || []);
                });
            }
        });
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
            let subjects: any = userSubjects;
            if (!subjects) {
                subjects = userType === "TEACHER" ? userData.teacherSubjects : userData.studentSubjects;
            }
            let comments: any = userComments;
            if (!comments) {
                comments = userType === "TEACHER" ? userData.teacherRatings : undefined;
            }
            if (comments) {
                setUserRatings(comments.map((comment: any) => comment.rating));
            }
            subjects = subjects.map((userSubject: any) => {
                return {
                    ...userSubject,
                    image: `../../subjects/${SUBJECT_IN_ENGLISH[userSubject.name]}.png`,
                    linkText: "იხილეთ დეტალები"
                };
            });
            const onPlace = userData.onPlace;
            const checkedState = new Map([
                ["დისტანციური სწავლება", onPlace == null ? true : !onPlace],
                ["ადგილზე სწავლება", onPlace == null ? true : onPlace]
            ]);
            setChecked(checkedState);
            setUserSubjects(subjects);
            setUserComments(comments);
            updateFromUserData();

            updateUser(userId, userType, userData);
        }
    }, [userData]);

    useEffect(() => {
        if (userSubjects) {
            updateSubjects(userId, userType, userSubjects);
        }
    }, [userSubjects]);

    const updateFromUserData = () => {
        setHeaderTitle(userData?.title || "მომხმარებელს არ გააჩნია მოკლე სათაური");
        setHeaderDescription(userData?.description || "მომხმარებელს არ სურს გაჩვენოთ მოკლე აღწერა ან რაიმე ზოგადი კომენტარი");
        setFacebookUrl(userData?.fbUrl || "");
        setLinkedinUrl(userData?.linkedinUrl || "");
        setTwitterUrl(userData?.twitterUrl || "");
        setInstagramUrl(userData?.instaUrl || "");
    };

    const showWindow = (): void => {
        setDimmerState("dimmer");
        setWindowState("window-popup");
    };

    const hideWindow = (): void => {
        setDimmerState("dimmer-hide");
        setWindowState("window-hide");
    };

    const goToStudentProfile = () => {
        window.location.reload();
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

    const ratingDivStyle = (): string => {
        const rating = userRatings.length == 0 ? 0 : userRatings.reduce((sum: number, curr: any) => sum + curr, 0) / userRatings.length;
        if (rating <= 5.0) {
            return "rating-div-red";
        }
        if (rating <= 7.0) {
            return "rating-div-pink";
        }
        if (rating <= 8.5) {
            return "rating-div-green";
        }
        return "rating-div-gold";
    };

    const toggleCheckboxChecked = (checkboxName: string): void => {
        if (curUserID != userId) {
            return;
        }
        switch (checkboxName) {
            case "დისტანციური სწავლება": {
                const distant = checked.get("დისტანციური სწავლება");
                const onPlace = checked.get("ადგილზე სწავლება");
                if (distant && !onPlace) {
                    alert("გთხოვთ მონიშნოთ მინიმუმ 1 ჩექბოქსი");
                    return;
                }
                if (!distant && onPlace) {
                    setUserData({...userData, onPlace: undefined});
                } else if (distant) {
                    setUserData({...userData, onPlace: true});
                } else {
                    setUserData({...userData, onPlace: false});
                }
                break;
            }
            case "ადგილზე სწავლება": {
                const distant = checked.get("დისტანციური სწავლება");
                const onPlace = checked.get("ადგილზე სწავლება");
                if (!distant && onPlace) {
                    alert("გთხოვთ მონიშნოთ მინიმუმ 1 ჩექბოქსი");
                    return;
                }
                if (distant && !onPlace) {
                    setUserData({...userData, onPlace: undefined});
                } else if (onPlace) {
                    setUserData({...userData, onPlace: false});
                } else {
                    setUserData({...userData, onPlace: true});
                }
                break;
            }
            default: break;
        }
        const newChecked = new Map(checked);
        newChecked.set(checkboxName, !newChecked.get(checkboxName));
        setChecked(newChecked);
    };

    return (<>
        {userSubjects ? (<React.Fragment>
            <div className="page-content">
                <NavBar active="profile" isCurrUser={curUserID == userId} />

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
                                    <div className={`score-rating-div ${ratingDivStyle()}`}>
                                        {userRatings.length == 0 ? "0.0" : (userRatings.reduce((sum: number, curr: any) => sum + curr, 0) / userRatings.length).toFixed(1)}
                                    </div> : null
                                }
                            </div>
                        </div>
                        {userType == "TEACHER" && curUserType == "STUDENT" && (
                            <Favourite imageSrc={favouriteImageSrc} animation={favouriteAnimation} onClick={() => FavouriteFunction()}/>
                        )}
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
                                <div className="update-section">
                                    {curUserID == userId && <div className="update-description" onClick={() => showWindow()}>განახლება</div>}
                                    <div className="checkbox-div"><div>დისტანციური სწავლება </div><Checkbox checked={checked.get("დისტანციური სწავლება") as boolean} onClick={() => toggleCheckboxChecked("დისტანციური სწავლება")}/></div>
                                    <div className="checkbox-div"><div>ადგილზე სწავლება </div><Checkbox checked={checked.get("ადგილზე სწავლება") as boolean} onClick={() => toggleCheckboxChecked("ადგილზე სწავლება")}/></div>
                                </div>
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
                                        updateFromUserData();
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
                                    {
                                        userType === "TEACHER" && curUserType === "STUDENT" ?
                                            <Comment
                                                edit={true}
                                                studentID={curUserID}
                                                teacherID={userId}
                                                userComments={userComments}
                                                setUserComments={setUserComments}
                                                userRatings={userRatings}
                                                setUserRatings={setUserRatings}
                                            /> : null
                                    }
                                    {userComments && userComments.length !== 0 ? userComments.map((comment: any, index: any) => (
                                        <div
                                            className="profile-page-comment"
                                            key={(index + 1).toString()}
                                        >
                                            <Comment
                                                edit={false}
                                                studentID={curUserID}
                                                teacherID={userId}
                                                key={(index + 1).toString()}
                                                date={comment?.addDate}
                                                title={comment?.title}
                                                description={comment?.studentComment}
                                                link={`/${comment?.studentID}/STUDENT`}
                                                rating={comment?.rating}
                                            />
                                        </div>
                                    )) : <h2 style={noContentStyle}> კომენტარები არ არის </h2>}
                                </div>

                                <div className="profile-page-experiences">
                                    <Experience />
                                </div>
                            </div> : null}
                        {userFavourites && userFavourites.length > 0 &&
                          <>
                              <legend className="your-favourites-label">თქვენი ფავორიტები</legend>
                              <hr/>
                              <div className="profile-page-favourites">
                                  {
                                      userFavourites.map((favourite: any, index: any) => (
                                          <div className="chat" key={(index + 1).toString()}>
                                              <div className="profile" onClick={() => goToStudentProfile()}>
                                                  <Link to={`/${favourite?.id}/TEACHER`}>
                                                      <img className="favourite-img"
                                                          src={favourite?.profileImage || "../images/news-feed-page/TeachersIcon.png"}
                                                          alt=""/>
                                                  </Link>
                                              </div>
                                              <div className="profile-description">
                                                  <div className="message">
                                                      {favourite?.title}
                                                  </div>
                                                  <div className="user">
                                                      {`${favourite.name} ${favourite.surname}`}
                                                  </div>
                                              </div>
                                          </div>))
                                  }
                              </div>
                          </>}
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

const Checkbox = styled(CheckboxComponent)`
  margin-right: 20px;
  width: 35px;
  height: 35px;
`;

const Favourite = styled.div<FavouriteProps>`
  width: 35px;
  height: 35px;
  margin-right: 30px;
  margin-left: auto;
  margin-bottom: 10px;
  align-self: end;
  box-sizing: border-box;
  cursor: pointer;
  background-size: cover;
  background-image: url(${props => props.imageSrc});
  animation: ${props => props.animation} 1s;
  z-index: 10;
`;
