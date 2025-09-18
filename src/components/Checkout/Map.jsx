"use client"
import { useState } from 'react'
import styles from './Map.module.css'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

function Map() {

    const [position , setPosition] = useState([36.315475 , 59.5083894])

    const markerIcon = new L.Icon({
        iconUrl : "/Images/loc.png",
        iconSize : [30 , 30]
    })

    const MapClick = () => {
        const map = useMapEvents({
            click(e){
                setPosition(e.latlng)
            }
        })
    }

    return (
        <MapContainer 
            style={{width: "100%" , height : "300px"}} 
            zoom={15}
            center={position}
        >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
            <MapClick />
            <Marker icon={markerIcon} position={position}/>
        </MapContainer>
    )
}

export default Map
