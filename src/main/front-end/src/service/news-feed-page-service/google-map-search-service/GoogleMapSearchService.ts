import axios from "axios";
import { USER_ENDPOINT } from "../../common-service";

// returns teachers in search radius (in kilometers)
export const getTeachersInRadius = async (coordinates: any): Promise<any> => {
    const addressInfo = {
        latitude: coordinates.lat,
        longitude: coordinates.lng
    };

    const promise = axios.post(USER_ENDPOINT + "address_info", addressInfo, {
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
