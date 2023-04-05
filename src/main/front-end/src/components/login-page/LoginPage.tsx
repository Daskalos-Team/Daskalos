import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import "./LoginPage.css";

const formEndpoint = "http://localhost:8080/user/save";

export const LoginPage = (): JSX.Element => {

    const [user, setUser]: any = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: "application/json"
                }
            }).then((res) => {
                const userInfo = {
                    mail: res.data.email,
                    password: res.data.id,
                    userType: "Teacher"
                }; // TODO teacher and id
                axios.post(formEndpoint, userInfo, {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(r => console.log(r));
            }).catch((err) => console.log(err));
        }
    }, [user]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error)
    });

    const [popupStyle, showPopup] = useState("hide");

    const popup = () => {
        showPopup("login-popup");
        setTimeout(() => showPopup("hide"), 3000);
    };

    return (
        <div className='login-page'>
            <ul className='background-objects'>
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
            <div className='login-form'>
                <h1>სალამი!</h1>

                <div className='inputs'>
                    <input type='text' placeholder='თქვენი იუზერნეიმი' />
                    <div className='password-section'>
                        <input type='password' placeholder='თქვენი პაროლი' />
                        <a className='forgot-password' href=''>დაგავიწყდათ პაროლი?</a>
                    </div>
                </div>

                <div className='login-button' onClick={popup}>შესვლა</div>

                <hr />

                <div className='alternative-login'>
                    <div className='google' onClick={() => login()} />
                </div>

                <div className={popupStyle}>
                    <h3>შესვლა წარუმატებელია</h3>
                    <p>გთხოვთ შეიყვანოთ სწორი მონაცემები</p>
                </div>
            </div>
        </div>
    );
};
