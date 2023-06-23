import React, { useCallback, useEffect, useState } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import {
    ICON_SIZE,
    circleOptions,
    defaultCenter,
    getTeachersInRadius,
    mapDefaultOptions,
    mapStyles
} from "../../../service/news-feed-page-service/google-map-search-service";
import Geocode from "react-geocode";
import { PlacesAutocompleteInput } from "../../helper-components";
import { addressToCoordinates, API_KEY } from "../../../service/common-service";
import "./SearchComponent.css";
import styled, { Keyframes, keyframes } from "styled-components";
import { CheckboxComponent } from "../../helper-components/CheckboxComponent";
import { ON_PLACE_OPTIONS, SearchListMenuProps, SUBJECTS, UserFilters } from "../../../service/news-feed-page-service";

export const SearchComponent = (): React.JSX.Element => {
    const [map, setMap] = useState<any>(null);
    const [mapContainer, setMapContainer] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [radius, setRadius] = useState(2000); // 2 km by default
    const [address, setAddress] = useState<any>("");
    const [centerMarker, setCenterMarker] = useState<any>(undefined);
    const [teachersMarkers, setTeachersMarkers] = useState<any>(undefined);
    const [circle, setCircle] = useState<any>(undefined);
    const [subjectsListOpen, setSubjectsListOpen] = useState(false);
    const [subjectsListAnimation, setSubjectsListAnimation] = useState<Keyframes | null>(null);
    const [subjectsChecked, setSubjectsChecked] = useState(new Map(SUBJECTS.map(subject => [subject, false])));
    const [onPlace, setOnPlace] = useState("ნებისმიერი");
    const [onPlaceOptionsOpen, setOnPlaceOptionsOpen] = useState(false);
    const [onPlaceOptionsAnimation, setOnPlaceOptionsAnimation] = useState<Keyframes | null>(null);
    const [favouritesOnly, setFavouritesOnly] = useState(false);
    const [filters, setFilters] = useState<UserFilters>({
        name: "",
        surname: "",
        minPrice: -1,
        maxPrice: 1000000,
        favouritesOnly: false,
        onPlace: null,
        subjectsOnly: [],
        weekdays: []
    });

    useEffect(() => {
        Geocode.setApiKey(API_KEY); // need API KEY for usage
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

    const toggleSubjectsList = () => {
        setSubjectsListAnimation(subjectsListOpen ? RollDown : RollUp);
        setSubjectsListOpen(!subjectsListOpen);
    };

    const toggleSubject = (subject: string) => {
        const newChecked = new Map(subjectsChecked);
        newChecked.set(subject, !newChecked.get(subject));
        setSubjectsChecked(newChecked);
        if (filters.subjectsOnly.includes(subject)) {
            filters.subjectsOnly = filters.subjectsOnly.filter(s => s != subject);
        } else {
            filters.subjectsOnly.push(subject);
        }
        setFilters(filters);
    };

    const setPriceLimit = (low: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
        const res = e.target.valueAsNumber;
        if (low) {
            filters.minPrice = res;
        } else {
            filters.maxPrice = Math.max(res, filters.minPrice);
        }
        setFilters(filters);
    };

    const toggleOnPlaceOptionsList = () => {
        setOnPlaceOptionsAnimation(onPlaceOptionsOpen ? RollDown : RollUp);
        setOnPlaceOptionsOpen(!onPlaceOptionsOpen);
    };

    const setOnPlaceSelection = (choice: string) => {
        setOnPlace(choice);
        setOnPlaceOptionsAnimation(RollDown);
        setOnPlaceOptionsOpen(false);
        switch (choice) {
            case "ადგილზე":
                filters.onPlace = true;
                break;
            case "დისტანციური":
                filters.onPlace = false;
                break;
            case "ნებისმიერი":
                filters.onPlace = null;
                break;
        }
        setFilters(filters);
    };

    const setSearchRadius = (newRadius: number) => {
        setRadius(newRadius);
        circle.setRadius(newRadius);
    };

    const toggleFavouritesOnly = () => {
        filters.favouritesOnly = !favouritesOnly;
        setFavouritesOnly(!favouritesOnly);
        setFilters(filters);
    };

    const setName = (name: string) => {
        filters.name = name;
        setFilters(filters);
    }

    const setSurname = (surname: string) => {
        filters.surname = surname;
        setFilters(filters);
    }

    return (
        <GoogleMapsProvider
            googleMapsAPIKey={API_KEY}
            mapOptions={mapDefaultOptions}
            mapContainer={mapContainer}
            onLoadMap={onMapLoad}
            libraries={["places"]}
        >
            <div ref={(node: any) => setMapContainer(node)} style={mapStyles} />
            <FiltersContainer>
                <FilterContainer>
                    <PlacesAutocompleteInput setAddress={setAddress}/>
                </FilterContainer>
                <FilterContainer>
                    <RadiusFilterContainer>
                        <RadiusSlider type="range" min={500} max={100000} value={radius} step={100} onChange={(e) => setSearchRadius(e.target.valueAsNumber)}/>
                        <FiltersLabel>ძებნის რადიუსი: {(radius / 1000).toFixed(1)}კმ</FiltersLabel>
                    </RadiusFilterContainer>
                </FilterContainer>
                <FilterContainer>
                    <FiltersTextField type="text" onChange={(e) => setName(e.target.value)}/>
                    <FiltersLabel>სახელი</FiltersLabel>
                </FilterContainer>
                <FilterContainer>
                    <FiltersTextField type="text" onChange={(e) => setSurname(e.target.value)}/>
                    <FiltersLabel>გვარი</FiltersLabel>
                </FilterContainer>
                <FilterContainer>
                    <FiltersLabel>ფავორიტები</FiltersLabel>
                    <SearchCheckbox checked={favouritesOnly} onClick={() => toggleFavouritesOnly()}/>
                </FilterContainer>
                <FilterContainer>
                    <FiltersNumberField type="number" min={0} max={10000} onChange={(e) => setPriceLimit(true, e)}/>
                    <FiltersLabel>–</FiltersLabel>
                    <FiltersNumberField type="number" min={0} max={10000} onChange={(e) => setPriceLimit(false, e)}/>
                    <FiltersLabel>ფასი</FiltersLabel>
                </FilterContainer>
                <FilterContainer>
                    <MenuFilterContainer>
                        <MenuFilterButton onClick={() => toggleSubjectsList()}>საგნები</MenuFilterButton>
                        <OptionsList open={subjectsListOpen} animation={subjectsListAnimation} scrollable={true}>
                            {SUBJECTS.map(subject => (
                                <Selection key={subject}>
                                    <SubjectLabel>{subject}</SubjectLabel>
                                    <SearchSubjectCheckbox checked={subjectsChecked.get(subject) as boolean}
                                        onClick={() => toggleSubject(subject)}/>
                                </Selection>
                            ))}
                        </OptionsList>
                    </MenuFilterContainer>
                </FilterContainer>
                <FilterContainer>
                    <MenuFilterContainer>
                        <MenuFilterButton onClick={() => toggleOnPlaceOptionsList()}>{onPlace}</MenuFilterButton>
                        <OptionsList open={onPlaceOptionsOpen} animation={onPlaceOptionsAnimation} scrollable={false}>
                            {ON_PLACE_OPTIONS.map(option => (
                                <Selection key={option}>
                                    <OnPlaceOptionLabel onClick={() => setOnPlaceSelection(option)}>{option}</OnPlaceOptionLabel>
                                </Selection>
                            ))}
                        </OptionsList>
                    </MenuFilterContainer>
                    <FiltersLabel>ტიპი</FiltersLabel>
                </FilterContainer>
                <div id={"ok-button"} onClick={addTeachersMarkers}>დადასტურება</div>
            </FiltersContainer>
        </GoogleMapsProvider>
    );
};

const RollUp = keyframes`
  0% {height: 0; pointer-events: none}
  100% {height: 150px; pointer-events: auto}
`;

const RollDown = keyframes`
  0% {height: 150px; pointer-events: none}
  100% {height: 0; pointer-events: auto}
`;

const FiltersContainer = styled.div`
  margin-top: 10px;
  top: 5%;
  width: 90%;
  margin-inline: auto;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, auto));
  grid-row-gap: 30px;
  grid-column-gap: 20px;
  justify-items: center;
  color: white;
  z-index: 2;
`;

const FilterContainer = styled.div`
  width: 300px;
  margin-block: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const FiltersInput = styled.input`
  max-height: 10px;
  padding: 20px;
  border-width: 0;
  border-radius: 50px;
  background-color: #ece9e9;
  box-sizing: content-box;
  font-size: 16px;
  font-family: "Noto Serif Georgian";
  text-align: center;
  color: black;
  
  &:hover {
    background-color: #f0f0f0;;
  }
`;

const FiltersTextField = styled(FiltersInput)`
  width: 180px;
`;

const FiltersNumberField = styled(FiltersInput)`
  width: 70px;
`;

const FiltersLabel = styled.p`
  width: fit-content;
  font-size: 16px;
  font-family: "Noto Serif Georgian";
  text-align: center;
  line-height: 48px;
  color: white;
`;

const MenuFilterContainer = styled.div`
  width: 240px;
  height: 48px;
  margin-inline: auto;
  position: relative;
`;

const MenuFilterButton = styled.button`
  width: 100%;
  height: 100%;
  font-size: 0.9em;
  cursor: pointer;
  border-radius: 15px;
`;

const OptionsList = styled.div<SearchListMenuProps>`
  height: ${props => props.open ? 150 : 0}px;
  width: 90%;
  margin-inline: auto;
  overflow-y: ${props => props.scrollable ? "auto" : "hidden"};
  position: absolute;
  left: 5%;
  bottom: 48px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  background: white;
  animation: ${props => props.animation} 300ms;
`;

const Selection = styled.div`
  width: 100%;
  height: 50px;
  padding-block: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubjectLabel = styled.p`
  line-height: 50px;
  font-size: 0.85em;
  font-weight: 500;
  margin-left: 5px;
  color: black;
`;

const OnPlaceOptionLabel = styled(SubjectLabel)`
  width: 100%;
  left: 0;
  margin-left: 0;
  text-align: center;
  transition-property: background-color;
  transition-duration: 100ms;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  };
`;

const SearchSubjectCheckbox = styled(CheckboxComponent)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: auto;
`;

const SearchCheckbox = styled(CheckboxComponent)`
  width: 35px;
  height: 35px;
`;

const RadiusFilterContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RadiusSlider = styled.input`
  padding: 0;
  width: 250px;
  height: 40%;
`;
