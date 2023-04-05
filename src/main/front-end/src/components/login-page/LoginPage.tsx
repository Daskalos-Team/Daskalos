import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import "./LoginPage.css";
import { authorizationWithGoogle, standardAuthorization } from "../../service/login-page-service";

export const LoginPage = (): JSX.Element => {

    const [user, setUser]: any = useState(undefined);
    const [mail, setMail]: any = useState("");
    const [password, setPassword]: any = useState("");

    useEffect(() => {
        if (user) {
            authorizationWithGoogle(user);
        }
    }, [user]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error)
    });

    const standardLogin = (e: any) => {
        // TODO get correct type and password instead of id
        standardAuthorization(mail, password, "Teacher", false);
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
                    <input type='text' placeholder='თქვენი მეილი' onInput={e => setMail(e.currentTarget.value)}/>
                    <div className='password-section'>
                        <input type='password' placeholder='თქვენი პაროლი' onInput={e => setPassword(e.currentTarget.value)}/>
                        <a className='forgot-password' href=''>დაგავიწყდათ პაროლი?</a>
                    </div>
                </div>

                <div className='login-button' onClick={e => standardLogin(e)}>შესვლა</div>

                <hr />

                <div className='alternative-login'>
                    <div className='google' onClick={() => login()} />
                </div>
            </div>
        </div>
    );
};
