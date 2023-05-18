import React, { useCallback, useEffect, useState } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import {
    ICON_SIZE,
    MAP_API_KEY,
    addressToCoordinates,
    circleOptions,
    defaultCenter,
    getTeachersInRadius,
    mapDefaultOptions
} from "../../service/google-map-search-service";
import Geocode from "react-geocode";
import "./GoogleMapSearch.css";

export const GoogleMapSearch = (): React.JSX.Element => {
    const [map, setMap]: any = useState(null);
    const [mapContainer, setMapContainer] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [radius, setRadius] = useState(2000); // 2 km by default
    const [address, setAddress]: any = useState("");
    const [centerMarker, setCenterMarker]: any = useState(undefined);
    const [teachersMarkers, setTeachersMarkers]: any = useState(undefined);
    const [circle, setCircle]: any = useState(undefined);

    useEffect(() => {
        Geocode.setApiKey(MAP_API_KEY); // need Google maps API KEY for usage
    }, []);

    const onMapLoad = useCallback((map: any) => {
        setMap(map); // save map
        setCenterMarker(new google.maps.Marker({ // save initial centerMarker
            position: new window.google.maps.LatLng(center),
            animation: window.google.maps.Animation.BOUNCE,
            map,
            title: "თქვენი ლოკაცია"
        }));
        setCircle(new google.maps.Circle({ // save initial circle
            center,
            radius,
            map,
            ...circleOptions
        }));
    }, []);

    const addTeachersMarkers = async (e: any): Promise<void> => {
        const coordinates = await addressToCoordinates(address);
        setCenter(() => ({ lat: coordinates.lat, lng: coordinates.lng }));
        centerMarker.setPosition({ lat: coordinates.lat, lng: coordinates.lng });
        circle.setCenter({ lat: coordinates.lat, lng: coordinates.lng });
        map && map.setOptions({
            center: { lat: coordinates.lat, lng: coordinates.lng }
        });

        const teachers = await getTeachersInRadius(coordinates);
        removeTeachersMarkers(teachersMarkers);
        const markers = teachers.data.map((teacher: any) => {
            const marker = new google.maps.Marker({
                position: new window.google.maps.LatLng({
                    lat: teacher["address"]["latitude"],
                    lng: teacher["address"]["longitude"]
                }),
                icon: {
                    url: "ado.png",
                    scaledSize: new google.maps.Size(ICON_SIZE, ICON_SIZE)
                },
                animation: window.google.maps.Animation.DROP,
                map,
                label: {
                    color: "#fff",
                    text: teacher.name + " " + teacher.surname,
                    className: "marker-label"
                } as google.maps.MarkerLabel,
                title: teacher.name + " " + teacher.surname
            });

            marker.addListener("click", () => {
                const infoWindow = new google.maps.InfoWindow({
                    content: "<h1> example </h1>",
                    zIndex: 99
                });
                infoWindow.open(map, marker);
            });

            return marker;
        });
        setTeachersMarkers(() => markers);
    };

    const removeTeachersMarkers = (markers: any) => {
        if (markers) {
            markers.forEach((marker: any) => {
                marker.setMap(null);
            });
        }
    };

    return (
        <GoogleMapsProvider
            googleMapsAPIKey={MAP_API_KEY}
            mapOptions={mapDefaultOptions}
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
