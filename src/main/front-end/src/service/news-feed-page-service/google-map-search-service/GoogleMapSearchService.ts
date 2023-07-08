import axios from "axios";
import { SEARCH_ENDPOINT } from "../../common-service";
import { UserFilters } from "../NewsFeedPageOptionsConstants";

// returns teachers in search radius (in kilometers)
export const getTeachersInRadius = async (userId: number, filters: UserFilters): Promise<any> => {
    const promise = axios.post(SEARCH_ENDPOINT + "get_teachers/" + userId, filters, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return promise.then(res => {
        return res;
    }).catch(error => {
        alert("მასწავლებლები ამ რადიუსში ვერ მოიძებნა");
        console.log(error);
    });
};
