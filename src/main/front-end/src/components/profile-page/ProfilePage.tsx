import React from "react";
import "./ProfilePage.css";

export const ProfilePage = (props: any) => {

    const ProfileNavigationButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };

    const AccountNavigationButtonFunction = (e: any, name: any) => {
        alert(`${name} was clicked`);
    };

    return (
        <div className="container">
            <div className="profile-main">
                <div className="profile-container">
                    <img src="background.png" width="100%" alt={"cover pic"}/>
                    <div className="profile-container-inner">
                        <img src="profile-pic.png" width="100%" className={"profile-pic"} alt={"profile pic"}/>
                        <h1>Ryan Walton</h1>
                        <div className="average-rating-subject">
                            <span>Average Rating 5.0/5.0</span>
                            <p>Subjects: Maths, Biology</p>
                        </div>
                        <b>Web Developer at Microsoft | Former Developer at Amazon</b>
                        <p>San Francisco, United States</p>
                    </div>
                </div>
                <div className="profile-description">
                    <h2>About</h2>
                    <p>I am a young teacher, with passion for teaching school kids several different subjects, including Maths, Physics, Chemistry, Biology, Geography, History and Literature</p>
                    <p>Telephone Number: +995 599 999 999</p>
                    <p>Email: daskalosdaskalosovich@gmail.com</p>
                </div>

                {/*experience section*/}
                <div className="profile-description">
                    <h2>Experience</h2>

                    <div className="profile-desc-row">
                        <div>
                            <h3>Lead Front End Developer</h3>
                            <b>Microsoft &middot; Full-time</b>
                            <b>Feb 2021 - Present &middot; 1.5 years</b>
                            <p>Computer programming is the process of performing a particular computation, usually by designing and building an executable computer Program.</p>
                            <hr/>
                        </div>
                    </div>

                    <div className="profile-desc-row">
                        <div>
                            <h3>Lead Front End Developer</h3>
                            <b>Microsoft &middot; Full-time</b>
                            <b>Feb 2021 - Present &middot; 1.5 years</b>
                            <p>Computer programming is the process of performing a particular computation, usually by designing and building an executable computer Program.</p>
                            <hr/>
                        </div>
                    </div>

                    <div className="profile-desc-row">
                        <div>
                            <h3>Lead Front End Developer</h3>
                            <b>Microsoft &middot; Full-time</b>
                            <b>Feb 2021 - Present &middot; 1.5 years</b>
                            <p>Computer programming is the process of performing a particular computation, usually by designing and building an executable computer Program.</p>
                            <hr/>
                        </div>
                    </div>

                </div>

                {/*comment section*/}
                <div className="profile-description">
                    <h2>Comments</h2>

                    <div className="profile-desc-row">
                        <div>
                            <h3>Luka Kalandadze</h3>
                            <b>Rating 5.0/5.0</b>
                            <p>Computer programming is the process of performing a particular computation, usually by designing and building an executable computer Program.</p>
                            <hr/>
                        </div>
                    </div>

                    <div className="profile-desc-row">
                        <div>
                            <h3>Luka Kalandadze</h3>
                            <b>Rating 5.0/5.0</b>
                            <p>Computer programming is the process of performing a particular computation, usually by designing and building an executable computer Program.</p>
                            <hr/>
                        </div>
                    </div>

                    <div className="profile-desc-row">
                        <div>
                            <h3>Luka Kalandadze</h3>
                            <b>Rating 5.0/5.0</b>
                            <p>Computer programming is the process of performing a particular computation, usually by designing and building an executable computer Program.</p>
                            <hr/>
                        </div>
                    </div>

                </div>
            </div>

            <div className="profile-sidebar"></div>
        </div>
    );
};
