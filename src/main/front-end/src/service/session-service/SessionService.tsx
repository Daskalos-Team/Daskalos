import axios from "axios";
import { USER_ENDPOINT } from "../common-service";

export const setUserMainData = (userId: number, userType: string): Promise<any> => {
    const body = { userId: userId, userType: userType };
    return axios.post(USER_ENDPOINT + "session/user-main-set", body, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};

export const getUserMainData = (): Promise<any> => {
    return axios.get(USER_ENDPOINT + "session/user-main-get", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};
