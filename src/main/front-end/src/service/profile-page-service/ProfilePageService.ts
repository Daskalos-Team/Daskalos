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
        return response;
    })
        .catch(err => {
            console.log(err);
        });
};

export const getStudentFavourites = async (studentId: number): Promise<any> => {
    const promise = axios.post(`${USER_DATA_ENDPOINT}${studentId}/favourites`, {}, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        return response;
    })
        .catch(err => {
            console.log(err);
        });
};

export const updateSubjects = async (userId: number, type: string, subjects: any): Promise<any> => {
    const promise = axios.post(`${USER_DATA_ENDPOINT}add_user_subjects/${userId}`, subjects, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        // ok, updated.
    })
        .catch(err => {
            console.log(err);
        });
};

export const updateUser = async (userId: number, type: string, userData: any): Promise<any> => {
    const userType = type.toLowerCase();
    const promise = axios.post(`${USER_DATA_ENDPOINT}update_${userType}`, userData, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        // ok, updated.
    })
        .catch(err => {
            console.log(err);
        });
};

export const addComment = async (studentID: string, teacherId: string, rating: any): Promise<any> => {
    const promise = axios.post(`${USER_DATA_ENDPOINT}add_rating/${teacherId}`, rating, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return promise.then(response => {
        // ok, updated.
    })
        .catch(err => {
            console.log(err);
        });
};
