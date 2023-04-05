import axios from "axios";
import { formEndpoint } from "./LoginPageServiceConstants";

export const authorizationWithGoogle = (user: any) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
        }
    }).then((res) => {
        standardAuthorization(res.data.email, res.data.id, "Teacher");
    });
};

export const standardAuthorization = (mail: string, password: string, userType: string) => {
    if (!mail || mail === "" || !password || password === "" || !userType || userType === "") {
        alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
        return;
    }
    const userInfo = {
        mail: mail,
        password: password,
        userType: userType
    };
    axios.post(formEndpoint, userInfo, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(r => alert("successful login: " + r))
        .catch((err) => {
            alert("unsuccessful login");
            console.log(err);
        });
};
