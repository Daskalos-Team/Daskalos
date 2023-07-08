export const MAP_ID = "1cd5a7fd281d06d3";
export const ICON_SIZE = 60;
export const defaultCenter = { lat: 41.699389, lng: 44.875089 }; // Varketili by default

export const circleOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 100,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A"
};

export const mapStyles = {
    borderRadius: "4rem",
    height: "70vh"
};

export const mapDefaultOptions = {
    center: defaultCenter,
    disableDefaultUI: true,
    heading: 20,
    mapId: MAP_ID,
    tilt: 50,
    zoom: 15
};
