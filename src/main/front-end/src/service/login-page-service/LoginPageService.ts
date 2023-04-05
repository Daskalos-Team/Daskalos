import axios from "axios";
import { formEndpoint } from "./LoginPageServiceConstants";

export const authorizationWithGoogle = (user: any) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
        }
    }).then((res) => {
        standardAuthorization(res.data.email, res.data.id, "Teacher", true);
    });
};

export const standardAuthorization = (mail: string, password: string, userType: string, google: boolean) => {
    if (!mail || mail === "" || !password || password === "" || !userType || userType === "") {
        alert("გთხოვთ შეიყვანოთ ყველა მონაცემი");
        return;
    }
    const userInfo = {
        usingGoogle: google,
        mail: mail,
        password: password,
        userType: userType
    };
    axios.post(formEndpoint, userInfo, {
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
