import axios from "axios";
import { USER_ENDPOINT } from "../common-service";

export const setUserId = (userId: number): Promise<any> => {
    return axios.post(USER_ENDPOINT + "session/id-set", userId, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};

export const getUserId = (): Promise<any> => {
    return axios.get(USER_ENDPOINT + "session/id", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};

export const setUserType = (userType: string): Promise<any> => {
    return axios.post(USER_ENDPOINT + "session/type-set", userType, {
        headers: {
            "Content-type": "text/plain; charset=UTF-8"
        }
    });
};

export const getUserType = (): Promise<any> => {
    return axios.get(USER_ENDPOINT + "session/type", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};
