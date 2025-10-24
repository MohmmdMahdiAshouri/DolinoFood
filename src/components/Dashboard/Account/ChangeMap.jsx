"use client";

import dynamic from "next/dynamic";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    {
        ssr: false,
    }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    {
        ssr: false,
    }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    {
        ssr: false,
    }
);

function ChangeMap({ position, setPosition }) {
    const customIcon = new L.Icon({
        iconUrl: "/Images/loc.png",
        iconSize: [30, 30],
    });

    const MapClick = () => {
        const map = useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
            },
        });
    };

    return (
        <div>
            <MapContainer
                style={{ width: "100%", height: "300px" }}
                center={position}
                zoom={16}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker icon={customIcon} position={position} />
                <MapClick />
            </MapContainer>
        </div>
    );
}

export default ChangeMap;
