import React, { useCallback, useEffect, useState } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import {
    addressToCoordinates,
    getTeachersInRadius,
    MAP_API_KEY,
    MAP_ID
} from "../../service/google-map-search-service";
import Geocode from "react-geocode";
import "./GoogleMapSearch.css";

export const GoogleMapSearch = (): JSX.Element => {
    const onMapLoad = useCallback((map: any) => addCurrentMarker(map), []);
    const [mapContainer, setMapContainer] = useState(null);
    const [address, setAddress]: any = useState("");
    const [mapOptions, setMapOptions]: any = useState({ // Varketili by default
        center: { lat: 41.699389, lng: 44.875089 },
        disableDefaultUI: true,
        heading: 25,
        mapId: MAP_ID,
        tilt: 50,
        zoom: 17
    });

    useEffect(() => {
        Geocode.setApiKey(MAP_API_KEY); // need Google maps API KEY for usage
    }, []);

    function addCurrentMarker (map: any) {
        new google.maps.Marker({
            position: new window.google.maps.LatLng(mapOptions?.center),
            map: map,
            title: "თქვენი ლოკაცია"
        });
    }

    const addTeachersMarkers = async (e: any): Promise<void> => {
        const coordinates = await addressToCoordinates(address);
        console.log(coordinates);
        // await fetching teachers in 20km radius
        await getTeachersInRadius(coordinates).then(teachers => {
            console.log(teachers);
        });
    };

    return (
        <GoogleMapsProvider
            googleMapsAPIKey={MAP_API_KEY}
            mapOptions={mapOptions}
            mapContainer={mapContainer}
            onLoadMap={onMapLoad}
        >
            <div ref={(node: any) => setMapContainer(node)} style={{ height: "85vh" }} />
            <div className={"input-container"}>
                <input id={"search-input"} type={"text"} placeholder={"შეიყვანეთ ვალიდური მისამართი"} onInput={e => setAddress(e.currentTarget.value)}/>
                <div id={"ok-button"} onClick={addTeachersMarkers}>OK</div>
            </div>
        </GoogleMapsProvider>
    );
};
