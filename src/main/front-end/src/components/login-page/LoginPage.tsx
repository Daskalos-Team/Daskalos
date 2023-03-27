import React, {useEffect, useState} from "react";
import {gapi} from "gapi-script";
import GoogleLogin from "react-google-login";
import "./LoginPage.css";

export const LoginPage = (): JSX.Element => {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com",
                scope: ""
            });
        }

        gapi.load('client: auth2', start);
    });

    const [popupStyle, showPopup] = useState("hide");

    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    };

    const onSuccess = (e: any) => {
        alert("User signed in")
    };

    const onFailure = (e: any) => {
        alert("User sign in Failed")
    };

    return (
        <div className="page">
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className="cover">

                <h1>ავტორიზაცია</h1>
                <input type="text" placeholder="თქვენი იუზერნეიმი"/>
                <input type="password" placeholder="თქვენი პაროლი"/>

                <div className="login-button" onClick={popup}>შესვლა</div>

                <p className="text">ან გამოიყენეთ</p>

                <div className="alt-login">
                    <div className="facebook"></div>
                    <div className="google">
                        <GoogleLogin className="blue"
                                     clientId="79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com"
                                     buttonText=""
                                     onSuccess={onSuccess}
                                     onFailure={onFailure}
                                     cookiePolicy={'single_host_origin'}
                                     isSignedIn={false}
                                     icon={false}    // with Google logo or without
                                     theme="dark"  // dark/light mode
                        />
                    </div>
                </div>

                <div className={popupStyle}>
                    <h3>შესვლა წარუმატებელია</h3>
                    <p>გთხოვთ შეიყვანოთ სწორი მონაცემები</p>
                </div>
            </div>
        </div>
    );
};
