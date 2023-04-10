import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle, standardLogin } from "../../service/login-page-service";
import emailjs from "@emailjs/browser";
import randomInteger from "random-int";
import "./AuthorizationPage.css";

export const AuthorizationPage = (): JSX.Element => {
    const [user, setUser]: any = useState(undefined);
    const [userType, setUserType]: any = useState("Teacher");
    const [loginOption, setLoginOption] = useState(true);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [verifierState, setVerifierState] = useState("verifier-hide");
    const [formState, setFormState] = useState("authorization-form");

    useEffect(() => {
        if (user) {
            loginWithGoogle(user);
        }
    }, [user]);

    useEffect(() => {
        console.log("changed");
    }, [loginOption]);

    const handleSwitchChange = (option: boolean) => {
        setName("");
        setSurname("");
        setLoginOption(option);
    };

    const check = (code: string) => {
        return 1;
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error)
    });

    const login = (e: any) => {
        standardLogin(mail, password, false);
    };

    const sendVerificationEmail = (e: any) => {
        const code = randomInteger(10000, 1000000);
        const params = {
            user_email: mail,
            user_name: name,
            user_code: code
        };
        emailjs.send("service_m92suca", "template_wcrd1ei", params, "CbmNbHyLjq1ERQzPU").then(function (res) {
            console.log("success" + res.status);
        });
        setVerifierState("verifier-popup");
        setFormState("form-hide");
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
            <div className="authorization-section">
                <div className={verifierState}>
                    <input type="text" placeholder="მეილზე მიღებული კოდი" onInput={e => check(e.currentTarget.value)}/>
                    <div className="verifier-buttons">
                        <div className="verifier-ok">დადასტურება</div>
                        <div className="verifier-close" onClick={() => {
                            setVerifierState("verifier-hide");
                            setFormState("authorization-form");
                            setName("");
                            setSurname("");
                        }}>დახურვა</div>
                    </div>
                </div>
                <ul className="background-objects">
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
                <div className={formState}>
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

                    <div className="inputs">
                        <input type="text" placeholder="თქვენი მეილი" onInput={e => setMail(e.currentTarget.value)}/>
                        <input type="password" placeholder="თქვენი პაროლი" onInput={e => setPassword(e.currentTarget.value)}/>
                        { !loginOption ? <input type="text" placeholder="თქვენი სახელი" onInput={e => setName(e.currentTarget.value)}/> : null}
                        { !loginOption ? <input type="text" placeholder="თქვენი გვარი" onInput={e => setSurname(e.currentTarget.value)}/> : null}
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
                            <a className="forgot-password" href="">დაგავიწყდათ პაროლი?</a>
                        }
                    </div>

                    <div className="authorization-button" onClick={e => loginOption ? login(e) : sendVerificationEmail(e)}>
                        {loginOption ? "შესვლა" : "რეგისტრაცია"}
                    </div>

                    { loginOption ? <hr /> : null }

                    {
                        loginOption ?
                            <div className="alternative-login">
                                <div className="google" onClick={() => googleLogin()} />
                            </div> : null
                    }
                </div>
            </div>
        </div>
    );
};
