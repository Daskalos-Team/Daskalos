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
                    <img src="cover-pic.png" width="100%" alt={"cover pic"}/>
                    <div className="profile-container-inner">
                        <img src="profile-pic.png" width="100%" className={"profile-pic"} alt={"profile pic"}/>
                        <h1>Ryan Walton</h1>
                        <b>Web Developer at Microsoft | Former Developer at Amazon</b>
                        <p>San Francisco, United States</p>
                        <div className="mutual-connection">
                            <img src="profile-pic.png" width="100%" alt={"mutual connection pic"}/>
                            <span>1 mutual connection: Orlando blum</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-sidebar"></div>
        </div>
    );
};
