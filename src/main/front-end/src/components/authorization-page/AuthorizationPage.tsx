import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authorizationWithGoogle, standardAuthorization } from "../../service/login-page-service";
import "./AuthorizationPage.css";

export const AuthorizationPage = (): JSX.Element => {
    const [user, setUser]: any = useState(undefined);
    const [role, setRole]: any = useState("Teacher");
    const [loginOption, setLoginOption] = useState(true);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const handleSwitchChange = (option: boolean) => {
        setLoginOption(option);
    };

    useEffect(() => {
        if (user) {
            authorizationWithGoogle(user);
        }
    }, [user]);

    useEffect(() => {
        console.log("changed");
    }, [loginOption]);

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error)
    });

    const standardLogin = (e: any) => {
        // TODO get correct type and password instead of id
        standardAuthorization(mail, password, "Teacher", false);
    };

    return (
        <div className="authorization-page">
            <div className="welcome-section">
                <div className="caption">
                    <h1>კეთილი იყოს თქვენი მობრძანება დასკალოსზე, იქ, სადაც მარტივია იპოვო სასურველი მოსწავლე ან მასწავლებელი</h1>
                    <a href="#" className="more-button button-ghost">მეტი ჩვენს შესახებ</a>
                </div>
            </div>
            <div className='authorization-section'>
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
                <div className='authorization-form'>
                    <div className="switch-div">
                        <div
                            style={{ backgroundColor: loginOption ? "white" : "transparent" }}
                            onClick={() => handleSwitchChange(true)}
                        >
                            <div className="option-div">შესვლა</div>
                        </div>
                        <div
                            style={{ backgroundColor: loginOption ? "transparent": "white" }}
                            onClick={() => handleSwitchChange(false)}
                        >
                            <div className="option-div">რეგისტრაცია</div>
                        </div>
                    </div>

                    <div className='inputs'>
                        <input type='text' placeholder='თქვენი მეილი' onInput={e => setMail(e.currentTarget.value)}/>
                        <div className='password-section'>
                            <input type='password' placeholder='თქვენი პაროლი' onInput={e => setPassword(e.currentTarget.value)}/>
                        </div>
                        { !loginOption ?
                            <div className="role-div">
                                <h5 className="role-label">თქვენი როლი</h5>
                                <select
                                    className="role-select"
                                    onChange={e => setRole(e.target.value)}
                                    value={role}
                                >
                                    <option value="Teacher">მასწავლებელი</option>
                                    <option value="Student">მოსწავლე</option>
                                </select>
                            </div>
                            :
                            <a className='forgot-password' href=''>დაგავიწყდათ პაროლი?</a>
                        }
                    </div>

                    <div className='authorization-button' onClick={e => standardLogin(e)}>{loginOption ? "შესვლა" : "რეგისტრაცია"}</div>

                    <hr />

                    <div className='alternative-login'>
                        <div className='google' onClick={() => googleLogin()} />
                    </div>
                </div>
            </div>
        </div>
    );
};
