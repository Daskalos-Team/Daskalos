import Geocode from "react-geocode";
import axios from "axios";
import { USER_ENDPOINT } from "../common-service";

// returns {lat, lng} coordinates from address
export const addressToCoordinates = async (address: string): Promise<any> => {
    const promise = Geocode.fromAddress(address);
    return promise.then(
        (response: any) => {
            return response.results[0].geometry.location;
        },
        (error: any) => {
            console.error("error occurred during coordinates service", error);
        }
    );
};

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
