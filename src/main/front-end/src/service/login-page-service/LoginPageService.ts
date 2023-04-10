import axios from "axios";
import { formEndpoint } from "./LoginPageServiceConstants";

export const loginWithGoogle = (user: any) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
        }
    }).then((res) => {
        standardLogin(res.data.email, res.data.id, true);
    });
};

export const standardLogin = (mail: string, password: string, google: boolean) => {
    if (isEmptyInput([mail, password])) {
        alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
        return;
    }
    const userInfo = {
        usingGoogle: google,
        mail,
        password
    };
    axios.post(formEndpoint + "login", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => alert(response.data))
        .catch((err) => {
            alert(err.response.data);
            console.log(err);
        });
};

export const existsWithMail = (mail: string): boolean => {
    const userInfo = {
        mail
    };
    axios.post(formEndpoint + "check", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch((err) => {
        alert(err.response.data);
        return false;
    });
    return true;
};

export const registration = (mail: string, password: string, name: string, surname: string, userType: string) => {
    const userInfo = {
        mail,
        password,
        name,
        surname,
        userType
    };
    axios.post(formEndpoint + "register", userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => alert(response.data))
        .catch((err) => {
            alert(err.response.data);
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
