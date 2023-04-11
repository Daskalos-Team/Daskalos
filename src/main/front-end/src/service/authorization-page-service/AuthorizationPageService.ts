import axios from "axios";
import {
    FORM_ENDPOINT,
    NOTIFICATION_MAP,
    PUBLIC_KEY,
    SERVICE_ID,
    TEMPLATE_ID
} from "./AuthorizationPageServiceConstants";
import emailjs from "@emailjs/browser";

export const loginWithGoogle = (user: any) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
        }
    }).then(res => {
        standardLogin(res.data.email, res.data.id, true);
    });
};

export const standardLogin = (email: string, password: string, google: boolean) => {
    if (isEmptyInput([email, password])) {
        alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
        return;
    }
    const userInfo = {
        usingGoogle: google,
        email,
        password
    };
    axios.post(FORM_ENDPOINT + "login", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => alert(NOTIFICATION_MAP[response.data] || ""))
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
    const promise = axios.post(FORM_ENDPOINT + "change", userInfo, {
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

export const sendVerificationCode = (email: string, name: string, code: string) => {
    const params = {
        user_email: email,
        user_name: name,
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
    const promise = axios.post(FORM_ENDPOINT + "exists", userInfo, {
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

export const checkAndSendConfirmation = async (email: string, password: string, name: string, code: string): Promise<boolean> => {
    const userInfo = {
        email,
        password
    };
    const promise = axios.post(FORM_ENDPOINT + "check", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        sendVerificationCode(email, name, code);
        return true;
    }).catch(err => {
        alert(NOTIFICATION_MAP[err.response.data] || "");
        return false;
    });
};

export const registration = (email: string, password: string, name: string, surname: string, userType: string) => {
    const userInfo = {
        email,
        password,
        name,
        surname,
        userType
    };
    axios.post(FORM_ENDPOINT + "register", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => alert(NOTIFICATION_MAP[response.data] || ""))
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
