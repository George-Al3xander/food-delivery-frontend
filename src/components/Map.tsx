import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import {useEffect, useRef} from "react"
import L from "leaflet"
import { typeStreet } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAddress, setMapDisplayStatus } from "../redux/mainStates";
import { RootState } from "../redux/store";

function ResetCenterView({position, setPosition, getStreetByLatLng}: {position: {lat: number, lng: number}, setPosition: any, getStreetByLatLng: Function}) {  
  const map = useMap();
  const lat = position.lat;
  const lng = position.lng;
  useEffect(() => {
    if (position) {
      map.setView(
        L.latLng(lat, lng),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [position]);

  useMapEvents({
    click(e) {
      const {lat,lng} = e.latlng
      map.setView(
        L.latLng(lat, lng),
        map.getZoom(),
        {
          animate: true
        }
      )
      //setPosition([lat,lng]) 
      getStreetByLatLng(lat,lng) 
    }
  })

  return null;
}

const Map = () => {
    const addressRef = useRef<HTMLInputElement>(null)!;
    const inputAddress = addressRef.current; 

    const dispatch = useDispatch();
    const [searchResults, setSearchResults] = useState<typeStreet[]>([])
     const [position, setPosition] = useState<LatLngExpression & number[]>([31,-100]);  
    const {currentAddress} = useSelector((state: RootState) => state.mainStates)
    const [address, setAddress] = useState<typeStreet | null>(currentAddress.display_name.length > 0 ? currentAddress : null)
    const [inputFocusStatus, setInputFocusStatus] = useState(false)
    // const success = (res: GeolocationPosition) => {
    //     const lat = res.coords.latitude;
    //     const lng = res.coords.longitude;
    //     setPosition([lat,lng])               
    // }
    // const error = () => {
    //   setPosition([31,-100])           

    // }
    //  useEffect(() => {
    //   if(firstRender) {
    //     navigator.geolocation.watchPosition(success, error)        
    //     setFirstRender(false)
    //   }
    // },[])

    useEffect(() => {
      if(address) {
        setPosition([address.lat, address.lon])    
      }
      console.log(address)
    },[address])
       
    const getStreetByName = async (param: string) => {
      const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
      const params = {
        q: param,
        format: "json",
        addressdetails: "1",
        polygon_geojson: "0",
      };
      const queryString = new URLSearchParams(params).toString();     
      fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.text())
        .then((result) => {
          const res = JSON.parse(result)           
          setSearchResults(res)        
        })
        .catch((err) => console.log("err: ", err));
    }

    const getStreetByLatLng = async (lat: number, lng: number) => {
      const param = `lat=${lat}&lon=${lng}&`
      const NOMINATIM_BASE_URL = `https://nominatim.openstreetmap.org/reverse?${param}`;
      const params = {        
        format: "json",
        addressdetails: "1",
        polygon_geojson: "0",
      };
      const queryString = new URLSearchParams(params).toString();     
      fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.text())
        .then((result) => {
          const address = JSON.parse(result)          
          setAddress(address)             
        })
        .catch((err) => console.log("err: ", err));
    }

  return (
    <div onClick={() => dispatch(setMapDisplayStatus({status: false}))} className="fullscreen-bg">  
        <div onClick={(e) => e.stopPropagation()} className="map-container">
              <div className="map-container-header">
                  <h1>Where to deliver?</h1>
                  <svg onClick={() => dispatch(setMapDisplayStatus({status: false}))}  xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg>
              </div>

              <div className="map-container-body split">
                  <div className="search-container">
                        <div className="search-address">
                        <input 
                          ref={addressRef}
                          placeholder={"Select your location"} 
                          defaultValue={address ? address.display_name : ""}  onFocus={() => {
                            if(address) {
                              getStreetByName(address.display_name)
                            }
                            setInputFocusStatus(true)
                          }} 
                          onBlur={() => {
                            setInputFocusStatus(false)
                          }} 
                          type="text" 
                          onChange={(e) => {
                            console.log(e.target.value)
                            getStreetByName(e.target.value)
                          }} 
                        />
                        {inputFocusStatus && searchResults.length > 0 ?
                        <ul className="search-results">                          
                          {searchResults.map((res) => {
                            return <li onMouseDown={() => {
                              setAddress(res)
                              setInputFocusStatus(false)
                            }} key={res.place_id}>{res.display_name}</li>
                          })}
                        </ul>
                        :
                        null
                        }
                        </div>
                        <button>Confirm address</button>
                  </div>

                  <MapContainer center={position} zoom={16} scrollWheelZoom={false}>     
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {position && (
                      <Marker position={position}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                    )}
                    <ResetCenterView getStreetByLatLng={getStreetByLatLng} setPosition={setPosition} position={{lat: position[0], lng: position[1]}} />
                  </MapContainer>  
            </div>
        </div>
    </div>  
  );
};

export default Map;
