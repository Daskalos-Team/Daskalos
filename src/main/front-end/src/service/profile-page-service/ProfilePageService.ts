import axios from "axios";
import { USER_DATA_ENDPOINT } from "../common-service";

export const getUserData = async (userId: number, type: string): Promise<any> => {
    const userType = type.toLowerCase();
    const promise = axios.post(`${USER_DATA_ENDPOINT}get_${userType}/${userId}`, {}, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        console.log(response);
    })
        .catch(err => {
            console.log(err);
        });
};
