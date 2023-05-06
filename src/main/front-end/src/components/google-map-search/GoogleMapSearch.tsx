import React, { useCallback, useEffect, useState } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import { API_KEY, MAP_ID } from "../../service/google-map-search-service";
import Geocode from "react-geocode";
import "./GoogleMapSearch.css";

export const GoogleMapSearch = (): JSX.Element => {
    const [mapContainer, setMapContainer] = useState(null);
    const [mapOptions, setMapOptions]: any = useState({ // Varketili by default
        center: { lat: 41.699389, lng: 44.875089 },
        disableDefaultUI: true,
        heading: 25,
        mapId: MAP_ID,
        tilt: 50,
        zoom: 17
    });
    const [address, setAddress]: any = useState("");
    const onMapLoad = useCallback((map: any) => addMarkers(map), []);

    useEffect(() => {
        Geocode.setApiKey(API_KEY); // need Google API KEY for usage
    }, []);

    function addMarkers (map: any) {
        const marker = new google.maps.Marker({
            position: new window.google.maps.LatLng(mapOptions?.center),
            map: map,
            title: "თქვენი ლოკაცია"
        });
    }

    return (
        <GoogleMapsProvider
            googleMapsAPIKey={API_KEY}
            mapOptions={mapOptions}
            mapContainer={mapContainer}
            onLoadMap={onMapLoad}
        >
            <div ref={(node: any) => setMapContainer(node)} style={{ height: "85vh" }} />
            <div className={"input-container"}>
                <input id={"search-input"} type={"text"} placeholder={"შეიყვანეთ ვალიდური მისამართი"} onInput={e => setAddress(e.currentTarget.value)}/>
                <div id={"ok-button"}>OK</div>
            </div>
        </GoogleMapsProvider>
    );
};
