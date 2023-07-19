import axios from "axios";
import { NEWS_FEED_ENDPOINT, USER_DATA_ENDPOINT } from "../common-service";
import { UserFilters } from "./NewsFeedPageOptionsConstants";

export const getTeachers = (studentID: number, filters: UserFilters): Promise<any> => {
    if (filters.minPrice! < 0) {
        filters.minPrice = null;
    }
    if (filters.maxPrice! > 10000) {
        filters.maxPrice = null;
    }
    return axios.post(NEWS_FEED_ENDPOINT + "get_filtered_teachers/" + studentID, filters, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};

export const getStudents = (filters: UserFilters): Promise<any> => {
    return axios.post(NEWS_FEED_ENDPOINT + "get_filtered_students/", filters, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};

export const getTopTenTeachers = (): Promise<any> => {
    return axios.post(NEWS_FEED_ENDPOINT + "get_top_ten_teacher/", "", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};

export const addFavourite = (studentId: number, teacherId: number) => {
    axios.post(USER_DATA_ENDPOINT + studentId + "/add_student_favourite/" + teacherId, "", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(() => undefined);
};

export const removeFavourite = (studentId: number, teacherId: number) => {
    axios.post(USER_DATA_ENDPOINT + studentId + "/remove_student_favourite/" + teacherId, "", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(() => undefined);
};
