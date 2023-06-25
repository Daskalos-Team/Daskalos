import axios from "axios";
import {
    USER_ENDPOINT,
    PUBLIC_KEY,
    SERVICE_ID,
    TEMPLATE_ID
} from "../common-service";
import emailjs from "@emailjs/browser";
import { NOTIFICATION_MAP } from "./AuthorizationPageServiceConstants";

export const loginWithGoogle = (user: any, logInFn: (userId: number, userType: string) => void) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
        }
    }).then(res => {
        standardLogin(res.data.email, res.data.id, true, logInFn);
    });
};

export const standardLogin = (email: string, password: string, google: boolean, logInFn: (userId: number, userType: string) => void) => {
    if (isEmptyInput([email, password])) {
        alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
        return;
    }
    const userInfo = {
        usingGoogle: google,
        email,
        password
    };
    axios.post(USER_ENDPOINT + "login", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            logInFn(Number(response.data[1]), response.data[2]);
        })
        .catch(err => {
            alert(NOTIFICATION_MAP[err.response.data] || "");
            console.log(err);
        });
};

export const changePassword = async (email: string, newPassword: string): Promise<boolean> => {
    const userInfo = {
        email,
        password: newPassword
    };
    const promise = axios.post(USER_ENDPOINT + "change", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        alert(NOTIFICATION_MAP[response.data] || "");
        return true;
    })
        .catch(err => {
            alert(NOTIFICATION_MAP[err.response.data] || "");
            console.log(err);
            return false;
        });
};

export const sendVerificationCode = (email: string, code: string) => {
    const params = {
        user_email: email,
        user_code: code
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY).then(function (res) {
        console.log("confirmation mail successfully sent, statusCode: " + res.status);
    });
};

export const checkUserWithEmail = async (email: string): Promise<boolean> => {
    const userInfo = {
        email
    };
    const promise = axios.post(USER_ENDPOINT + "exists", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        return true;
    }).catch(err => {
        alert(NOTIFICATION_MAP[err.response.data] || "");
        return false;
    });
};

export const checkAndSendConfirmation = async (email: string, password: string, code: string): Promise<boolean> => {
    const userInfo = {
        email,
        password
    };
    const promise = axios.post(USER_ENDPOINT + "check", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        sendVerificationCode(email, code);
        return true;
    }).catch(err => {
        alert(NOTIFICATION_MAP[err.response.data] || "");
        return false;
    });
};

export const registration = (email: string, password: string, name: string, surname: string, userType: string, logInFn: (userId: number, userType: string) => void) => {
    const userInfo = {
        email,
        password,
        name,
        surname,
        userType
    };
    axios.post(USER_ENDPOINT + "register", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => standardLogin(email, password, false, logInFn))
        .catch(err => {
            alert(NOTIFICATION_MAP[err.response.data] || "");
            console.log(err);
        });
};

export const isEmptyInput = (inputs: string[]): boolean => {
    let result = false;
    inputs.forEach(input => {
        result = result || !input || input === "";
    });
    return result;
};
