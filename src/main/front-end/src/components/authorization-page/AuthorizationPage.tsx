import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle, standardLogin, registration } from "../../service/login-page-service";
import "./AuthorizationPage.css";

export const AuthorizationPage = (): JSX.Element => {
    const [user, setUser]: any = useState(undefined);
    const [userType, setUserType]: any = useState("Teacher");
    const [loginOption, setLoginOption] = useState(true);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const handleSwitchChange = (option: boolean) => {
        setName("");
        setSurname("");
        setLoginOption(option);
    };

    useEffect(() => {
        if (user) {
            loginWithGoogle(user);
        }
    }, [user]);

    useEffect(() => {
        console.log("changed");
    }, [loginOption]);

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error)
    });

    const login = (e: any) => {
        standardLogin(mail, password, false);
    };

    const standardRegistration = (e: any) => {
        registration(mail, password, name, surname, userType);
    };

    return (
        <div className="authorization-page">
            <div className="welcome-section">
                <div className="caption">
                    <div className="daskalos-name" data-text="&nbsp;დასკალოსი">&nbsp;დასკალოსი&nbsp;</div>
                    <h1 className="welcome">კეთილი იყოს თქვენი მობრძანება დასკალოსზე, იქ, სადაც მარტივია იპოვო სასურველი მოსწავლე ან მასწავლებელი</h1>
                    <a href="#" className="more-button button-ghost">მეტი ჩვენ შესახებ</a>
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
                        <input type='password' placeholder='თქვენი პაროლი' onInput={e => setPassword(e.currentTarget.value)}/>
                        { !loginOption ? <input type='text' placeholder='თქვენი სახელი' onInput={e => setName(e.currentTarget.value)}/> : null}
                        { !loginOption ? <input type='text' placeholder='თქვენი გვარი' onInput={e => setSurname(e.currentTarget.value)}/> : null}
                        { !loginOption ?
                            <div className="role-div">
                                <h5 className="role-label">თქვენი როლი</h5>
                                <select
                                    className="role-select"
                                    onChange={e => setUserType(e.target.value)}
                                    value={userType}
                                >
                                    <option value="Teacher">მასწავლებელი</option>
                                    <option value="Student">მოსწავლე</option>
                                </select>
                            </div>
                            :
                            <a className='forgot-password' href=''>დაგავიწყდათ პაროლი?</a>
                        }
                    </div>

                    <div className='authorization-button' onClick={e => loginOption ? login(e) : standardRegistration(e)}>
                        {loginOption ? "შესვლა" : "რეგისტრაცია"}
                    </div>

                    { loginOption ? <hr /> : null }

                    {
                        loginOption ?
                            <div className='alternative-login'>
                                <div className='google' onClick={() => googleLogin()} />
                            </div> : null
                    }
                </div>
            </div>
        </div>
    );
};
