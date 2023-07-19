import axios from "axios";
import {
    USER_ENDPOINT,
    PUBLIC_KEY,
    SERVICE_ID,
    TEMPLATE_ID
} from "../common-service";
import emailjs from "@emailjs/browser";
import { NOTIFICATION_MAP, RegistrationCredentials } from "./AuthorizationPageServiceConstants";

export const loginWithGoogle = async (user: any, logInFn: (userId: number, userType: string, userName: string, userSurname: string, userProfileImage: string | null) => void): Promise<boolean> => {
    const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
        }
    });

    return standardLogin(res.data.email, res.data.id, true, logInFn);
};

export const standardLogin = async (email: string, password: string, google: boolean,
    logInFn: (userId: number, userType: string, userName: string, userSurname: string, userProfileImage: string | null) => void): Promise<boolean> => {
    if (isEmptyInput([email, password])) {
        alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
        return false;
    }
    const userInfo = {
        usingGoogle: google,
        email,
        password
    };
    const promise = axios.post(USER_ENDPOINT + "login", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        logInFn(Number(response.data[1]), response.data[2], response.data[3], response.data[4], response.data[5]);
        return true;
    }).catch(err => {
        alert(NOTIFICATION_MAP[err.response.data] || "წარუმატებელი ავტორიზაცია");
        return false;
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
    }).catch(err => {
        alert(NOTIFICATION_MAP[err.response.data] || "");
        return false;
    });
};

export const sendVerificationCode = (email: string, code: string) => {
    const params = {
        user_email: email,
        user_code: code
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY).then(function (res) {
        // successfully sent
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

export const registration = async (registrationCredentials: RegistrationCredentials): Promise<boolean> => {
    const userInfo = {
        ...registrationCredentials
    };
    const promise = axios.post(USER_ENDPOINT + "register", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        return true;
    }).catch(err => {
        alert("რეგისტრაცია ვერ მოხერხდა");
        return false;
    });
};

export const isEmptyInput = (inputs: string[]): boolean => {
    let result = false;
    inputs.forEach(input => {
        result = result || !input || input === "";
    });
    return result;
};
