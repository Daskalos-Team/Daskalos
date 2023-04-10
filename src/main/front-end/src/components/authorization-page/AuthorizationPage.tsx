import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import randomInteger from "random-int";
import {
    checkAndSendConfirmation,
    isEmptyInput,
    loginWithGoogle,
    registration,
    standardLogin
} from "../../service/login-page-service";
import "./AuthorizationPage.css";

export const AuthorizationPage = (): JSX.Element => {
    const [user, setUser]: any = useState(undefined);
    const [userType, setUserType] = useState("Teacher");
    const [loginOption, setLoginOption] = useState(true);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [formState, setFormState] = useState("authorization-form");
    const [verifierState, setVerifierState] = useState("verifier-hide");
    const [inputCode, setInputCode] = useState("");
    const [realCode, setRealCode] = useState("bad");

    useEffect(() => {
        const code = randomInteger(10000, 1000000); // generate private code
        setRealCode(code + "");
    }, []);

    useEffect(() => {
        if (user) {
            loginWithGoogle(user);
        }
    }, [user]);

    useEffect(() => {
        console.log("");
    }, [loginOption]);

    const handleSwitchChange = (option: boolean) => {
        setName("");
        setSurname("");
        setLoginOption(option);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error)
    });

    const login = (e: any) => {
        standardLogin(mail, password, false);
    };

    const sendVerificationEmail = async (e: any): Promise<void> => {
        if (isEmptyInput([mail, password, name, surname, userType])) {
            alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
            return;
        }
        await checkAndSendConfirmation(mail, password, name, realCode).then(response => {
            setVerifierState("verifier-popup");
            setFormState("form-hide");
        });
    };

    const checkCode = (e: any) => {
        if (realCode !== inputCode) {
            alert("არასწორი კოდი!");
            return;
        }
        registration(mail, password, name, surname, userType);
        hideVerifierPopup();
    };

    const hideVerifierPopup = () => {
        setVerifierState("verifier-hide");
        setFormState("authorization-form");
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
                    <input type="text" placeholder="მეილზე მიღებული კოდი" onInput={e => setInputCode(e.currentTarget.value)}/>
                    <div className="verifier-buttons">
                        <div className="verifier-ok" onClick={e => checkCode(e)}>დადასტურება</div>
                        <div className="verifier-close" onClick={() => {
                            hideVerifierPopup();
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
