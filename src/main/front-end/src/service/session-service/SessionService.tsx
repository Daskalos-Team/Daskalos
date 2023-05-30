import axios from "axios";
import { USER_ENDPOINT } from "../common-service";

export const setUserID = (userId: number) => {
    axios.post(USER_ENDPOINT + "session/id-set", userId, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(error => {
        console.log(error);
    });
};

export const getUserId = (): Promise<any> => {
    return axios.get(USER_ENDPOINT + "session/id", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};

export const setUserType = (userType: string) => {
    axios.post(USER_ENDPOINT + "session/type-set", userType, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(error => {
        console.log(error);
    });
};

export const getUserType = (): Promise<any> => {
    return axios.get(USER_ENDPOINT + "session/type", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};
