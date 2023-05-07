import React, { useCallback, useEffect, useState } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import {
    addressToCoordinates,
    circleOptions,
    getTeachersInRadius,
    MAP_API_KEY,
    MAP_ID
} from "../../service/google-map-search-service";
import Geocode from "react-geocode";
import "./GoogleMapSearch.css";

export const GoogleMapSearch = (): JSX.Element => {
    const [map, setMap]: any = useState(null);
    const [mapContainer, setMapContainer] = useState(null);
    const [center, setCenter] = useState({ lat: 41.699389, lng: 44.875089 });
    const [radius, setRadius] = useState(2000); // 2 km by default
    const [address, setAddress]: any = useState("");
    const [marker, setMarker]: any = useState(undefined);
    const [teachersMarkers, setTeachersMarkers]: any = useState(undefined);
    const [circle, setCircle]: any = useState(undefined);

    useEffect(() => {
        Geocode.setApiKey(MAP_API_KEY); // need Google maps API KEY for usage
    }, []);

    const onMapLoad = useCallback((map: any) => {
        setMap(map); // save map
        setMarker(new google.maps.Marker({ // save initial marker
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
        updateCenter(coordinates);
        marker.setPosition(center);
        circle.setCenter(center);
        map && map.setOptions(center);

        const teachers = await getTeachersInRadius(coordinates);
        removeTeachersMarkers(teachersMarkers);
        const markers = teachers.data.forEach((teacher: any) => {
            const marker = new google.maps.Marker({
                position: new window.google.maps.LatLng({
                    lat: teacher["address"]["latitude"],
                    lng: teacher["address"]["longitude"]
                }),
                icon: {
                    url: "ado.png",
                    scaledSize: new google.maps.Size(70, 70)
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
        updateTeachersMarkers(markers);
    };

    const updateCenter = (coordinates: any) => {
        setCenter({ lat: coordinates.lat, lng: coordinates.lng });
    };

    const updateTeachersMarkers = (markers: any) => {
        setTeachersMarkers(markers);
    };

    // TODO
    const removeTeachersMarkers = (markers: any) => {
        if (markers) {
            markers.forEach((marker: any) => {
                console.log(marker);
                marker.setMap(null);
            });
        }
    };

    return (
        <GoogleMapsProvider
            googleMapsAPIKey={MAP_API_KEY}
            mapOptions={
                { // Varketili by default
                    center,
                    disableDefaultUI: true,
                    heading: 25,
                    mapId: MAP_ID,
                    tilt: 50,
                    zoom: 15
                }
            }
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
