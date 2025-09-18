"use client";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet"
import "leaflet-routing-machine"

function Map() {

    const [start, setStart] = useState([36.315475, 59.5083894]);
    const [end, setEnd] = useState([36.335475, 59.4983894]);

    const markerIcon = new L.Icon({
        iconUrl: "/Images/loc.png",
        iconSize: [30, 30],
    });

    const Routing = () => {
        const map = useMap();

        useEffect(() => {
            if (!map) return;

            const routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(start[0], start[1]),
                    L.latLng(end[0], end[1]),
                ],
                routewhileDragging: true,
                show: false,
                createMarker: function () {
                    return null;
                },
            }).addTo(map);
        }, [start, end, map]);
    };

    return (
        <MapContainer
            style={{ width: "100%", height: "300px" }}
            zoom={15}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
                icon={markerIcon}
                position={start}
                draggable={false}
                interactive={false}
            />
            <Marker
                icon={markerIcon}
                position={end}
                draggable={false}
                interactive={false}
            />
            <Routing />
        </MapContainer>
    );
}

export default Map;
