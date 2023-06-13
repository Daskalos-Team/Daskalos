import axios from "axios";
import { NEWS_FEED_ENDPOINT } from "../common-service";
import { UserFilters } from "./NewsFeedPageOptionsConstants";

export const getTeachers = (studentID: number, filters: UserFilters): Promise<any> => {
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