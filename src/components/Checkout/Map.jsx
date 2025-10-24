"use client";
import { useContext, useState } from "react";
import styles from "./Map.module.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { AddressContext } from "@/context/AddressContext";

function Map() {
    const {data, setData} = useContext(AddressContext)

    const markerIcon = new L.Icon({
        iconUrl: "/Images/loc.png",
        iconSize: [30, 30],
    });

    const MapClick = () => {
        const map = useMapEvents({
            click(e) {
                setData({...data, lat : e.latlng.lat, lng:e.latlng.lng})
            },
        });
    };

    return (
        <MapContainer
            style={{ width: "100%", height: "300px" }}
            zoom={15}
            center={data?.lat ? [data.lat, data.lng] : [36.315475, 59.5083894]}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClick />
            <Marker icon={markerIcon} position={data?.lat ? [data.lat, data.lng] : [36.315475, 59.5083894]} />
        </MapContainer>
    );
}

export default Map;
