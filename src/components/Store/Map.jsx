"use client"
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

function Map({ position }) {
    const customIcon = new L.Icon({
        iconUrl: "/Images/loc.png",
        iconSize: [30, 30],
    });

    return (
        <div>
            <MapContainer
                style={{ width: "100%", height: "300px" }}
                center={position}
                zoom={16}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker icon={customIcon} position={position} />
            </MapContainer>
        </div>
    );
}

export default Map;
