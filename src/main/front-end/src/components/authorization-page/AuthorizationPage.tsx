import React, { useContext, useEffect, useState } from "react";
import Geocode from "react-geocode";
import randomInteger from "random-int";
import { useGoogleLogin } from "@react-oauth/google";
import { PlacesAutocompleteInput } from "../helper-components";
import { addressToCoordinates, API_KEY } from "../../service/common-service";
import { useNavigate } from "react-router-dom";
import {
    changePassword,
    checkAndSendConfirmation,
    checkUserWithEmail,
    isEmptyInput,
    loginWithGoogle,
    registration,
    sendVerificationCode,
    standardLogin
} from "../../service/authorization-page-service";
import "./AuthorizationPage.css";
import { AuthorizationPageProps } from "../../service/authorization-page-service/AuthorizationPageServiceConstants";
import { AppContext } from "../../App";
import { STANDARD_LOAD_TIME } from "../../service/common-service";

export const AuthorizationPage = (props: AuthorizationPageProps): React.JSX.Element => {
    const [user, setUser]: any = useState(undefined);
    const [userType, setUserType] = useState("TEACHER");
    const [loginOption, setLoginOption] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: -1, lng: -1 });
    const [formState, setFormState] = useState("authorization-form");
    const [verifierState, setVerifierState] = useState("verifier-hide"); // verifier-hide, verifier-popup
    const [verifierContent, setVerifierContent] = useState("standard-code"); // standard-code, password-code, email, password
    const [inputCode, setInputCode] = useState("");
    const [realCode, setRealCode] = useState("bad");

    const { setTime }: any = useContext(AppContext);

    // --------------------navigate to other page---------------------
    const navigate = useNavigate();
    //--------------------------------------------------------------------

    useEffect(() => {
        Geocode.setApiKey(API_KEY); // need API KEY for usage
    }, []);

    useEffect(() => {
        if (user) {
            setTime(STANDARD_LOAD_TIME);
            loginWithGoogle(user, props.logInFn);
        }
    }, [user]);

    useEffect(() => {
        // login option changed
    }, [loginOption]);

    useEffect(() => {
        const authorizeGoogle = async () => {
            if (user) {
                const success = await loginWithGoogle(user, props.logInFn);
                if (success) {
                    navigate("/news-feed");
                }
            }
        };
        authorizeGoogle();
    }, [user]);

    const handleSwitchChange = (option: boolean) => {
        setName("");
        setSurname("");
        setFullAddress("");
        setLoginOption(option);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: () => undefined
    });

    const login = async (e: any) => {
        const success = await standardLogin(email, password, false, props.logInFn);
        if (success) {
            navigate("/news-feed");
        }
    };

    const sendVerificationEmail = async (e: any): Promise<void> => {
        if (isEmptyInput([email, password, name, surname, fullAddress, userType])) {
            alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
            return;
        }
        const coordinates = await addressToCoordinates(fullAddress);
        if (coordinates === -1) {
            alert("ასეთი მისამართი ვერ მოიძებნა");
            return;
        }
        setCoordinates(coordinates);
        const code = generateRandomCode();
        await checkAndSendConfirmation(email, password, code).then(res => {
            if (res) {
                showVerifierPopup();
            }
        });
    };

    const check = async (e: any) => {
        const address = {
            fullAddress: fullAddress,
            latitude: coordinates.lat,
            longitude: coordinates.lng
        };
        if (verifierContent === "password") {
            if (isEmptyInput([password, repeatedPassword])) {
                alert("გთხოვთ შეიყვანოთ ორივე მონაცემი");
                return false;
            }
            if (password !== repeatedPassword) {
                alert("პაროლები არ ემთხვევა");
                return;
            }
            await changePassword(email, password).then(res => {
                if (res) {
                    hideVerifierPopup();
                }
            });
            return;
        }
        if (verifierContent === "email") {
            await checkUserWithEmail(email).then(res => {
                if (res) {
                    const code = generateRandomCode();
                    sendVerificationCode(email, code);
                    setVerifierContent("password-code");
                }
            });
            return;
        }
        if (realCode !== inputCode) {
            alert("არასწორი კოდი");
            return;
        }
        if (verifierContent === "password-code") {
            setVerifierContent("password");
            return;
        }
        const success = await registration({ email, password, name, surname, address, userType });
        if (success) {
            setTime(STANDARD_LOAD_TIME);
            await login(e);
            navigate("/news-feed");
            return;
        }
        hideVerifierPopup();
    };

    const generateRandomCode = () => {
        const code = randomInteger(10000, 1000000) + ""; // generate private code
        setRealCode(code);
        return code;
    };

    const showVerifierPopup = () => {
        setVerifierState("verifier-popup");
        setFormState("hide");
    };

    const hideVerifierPopup = () => {
        setVerifierContent("standard-code");
        setVerifierState("verifier-hide");
        setFormState("authorization-form");
    };

    return (
        <div className="authorization-page">
            <div className="welcome-section">
                <div className="caption">
                    <div className="daskalos-name" data-text="&nbsp;დასკალოსი">&nbsp;დასკალოსი&nbsp;</div>
                    <h1 className="welcome">კეთილი იყოს თქვენი მობრძანება დასკალოსზე, იქ, სადაც მარტივია იპოვო სასურველი მოსწავლე ან მასწავლებელი</h1>
                    <a href="https://www.facebook.com/groups/262298213095632" target="_blank" rel="noreferrer" className="more-button button-ghost">მეტი ჩვენ შესახებ</a>
                </div>
            </div>
            <div className="authorization-section">
                <div className={verifierState}>
                    { verifierContent.match("^.*code.*$") ? <input type="text" placeholder="მეილზე მიღებული კოდი" onInput={e => setInputCode(e.currentTarget.value)}/> : null }
                    { verifierContent === "email" ? <input type="email" placeholder="თქვენი იმეილი" onInput={e => setEmail(e.currentTarget.value)}/> : null }
                    { verifierContent === "password" ?
                        <div className="renew-password">
                            <input type="password" placeholder="ახალი პაროლი" onInput={e => setPassword(e.currentTarget.value)}/>
                            <input type="password" placeholder="გაიმეორეთ პაროლი" onInput={e => setRepeatedPassword(e.currentTarget.value)}/>
                        </div>: null
                    }
                    <div className="verifier-buttons">
                        <div className="verifier-ok" onClick={e => check(e)}>დადასტურება</div>
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
                        <input type="email" placeholder="თქვენი იმეილი" onInput={e => setEmail(e.currentTarget.value)}/>
                        <input type="password" placeholder="თქვენი პაროლი" onInput={e => setPassword(e.currentTarget.value)}/>
                        { !loginOption ? <input type="text" placeholder="თქვენი სახელი" onInput={e => setName(e.currentTarget.value)}/> : null}
                        { !loginOption ? <input type="text" placeholder="თქვენი გვარი" onInput={e => setSurname(e.currentTarget.value)}/> : null}
                        { !loginOption ? <div className="places-autocomplete-input">
                            <PlacesAutocompleteInput setAddress={setFullAddress} />
                        </div>: null}
                        { !loginOption ?
                            <div className="role-div">
                                <h5 className="role-label">თქვენი როლი</h5>
                                <select
                                    className="role-select"
                                    onChange={e => setUserType(e.target.value)}
                                    value={userType}
                                >
                                    <option value="TEACHER">მასწავლებელი</option>
                                    <option value="STUDENT">მოსწავლე</option>
                                </select>
                            </div>
                            :
                            <a className="forgot-password" href="javascript:void(0)" onClick={() => {
                                setEmail("");
                                setVerifierContent("email");
                                showVerifierPopup();
                            }}>დაგავიწყდათ პაროლი?</a>
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
