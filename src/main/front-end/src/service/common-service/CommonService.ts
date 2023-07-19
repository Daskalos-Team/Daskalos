// returns {lat, lng} coordinates from address
import Geocode from "react-geocode";

export const addressToCoordinates = async (address: string): Promise<any> => {
    const promise = Geocode.fromAddress(address);
    return promise.then(
        (response) => {
            return response.results[0].geometry.location;
        },
        (error) => {
            return -1;
        }
    );
};
