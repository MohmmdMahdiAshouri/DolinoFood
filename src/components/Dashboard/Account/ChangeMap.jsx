import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

function ChangeMap({ position, setPosition }) {
    const customIcon = new L.Icon({
        iconUrl: "/Images/loc.png",
        iconSize: [30, 30],
    });

    const MapClick = () => {
        const map = useMapEvents({
            click(e) {
                setPosition([e.latlng.lat , e.latlng.lng]);
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
