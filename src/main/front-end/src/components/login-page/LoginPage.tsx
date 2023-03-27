import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
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
        <div className="login-page">
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
            <div className="login-form">
                <h1>სალამი!</h1>

                <div className="inputs">
                    <input type="text" placeholder="თქვენი იუზერნეიმი"/>
                    <div className="password-section">
                        <input type="password" placeholder="თქვენი პაროლი"/>
                        <a className="forgot-password" href="">დაგავიწყდათ პაროლი?</a>
                    </div>
                </div>

                <div className="login-button" onClick={popup}>შესვლა</div>

                <p className="text">ან გამოიყენეთ</p>

                <div className="alternative-login">
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
                                     theme="light"  // dark/light mode
                        />
                    </div>
                </div>

                <a href="">არ გაქვთ ექაუნთი?</a>

                <div className={popupStyle}>
                    <h3>შესვლა წარუმატებელია</h3>
                    <p>გთხოვთ შეიყვანოთ სწორი მონაცემები</p>
                </div>
            </div>
        </div>
    );
};
