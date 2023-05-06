import Geocode from "react-geocode";

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
