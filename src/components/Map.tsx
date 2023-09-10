import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import {useEffect, useRef} from "react"




const Map = () => {
    const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09]);
    const success = (res: GeolocationPosition) => {
        const lat = res.coords.latitude;
        const lng = res.coords.longitude;
        setPosition([lat,lng])
        
        console.log([lat,lng])
        console.log("Good")
    }
    const error = () => {
        console.log("Please allow geolocation access")
    }
    useEffect(() => {
        navigator.geolocation.watchPosition(success, error)
    },[])

    
  //const [zoom, setZoom] = useState(13);

  return (
    <MapContainer   center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
