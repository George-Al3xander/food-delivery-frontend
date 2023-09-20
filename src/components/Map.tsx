import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import {useEffect, useRef} from "react"
import L from "leaflet"
import { typeStreet } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import {  setCurrentAddress, setMapDisplayStatus } from "../redux/mainStates";
import { RootState } from "../redux/store";

function ResetCenterView({position,  getStreetByLatLng}: {position: {lat: number, lng: number}, setPosition: any, getStreetByLatLng: Function}) {  
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
    const addressElement = addressRef.current

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

  const confirmAddress =() => {
    if(address) {
      dispatch(setCurrentAddress({address}))
      dispatch(setMapDisplayStatus({status: false}))
    }
  }

  return (
    <div onClick={() => dispatch(setMapDisplayStatus({status: false}))} className="fixed z-50 top-0 bg-[rgba(0,0,0,50%)] h-[100vh] w-[100%]">  
        <div onClick={(e) => e.stopPropagation()} className="bg-accent w-[100%] md:max-w-[60rem] md:mt-[5%]  mx-auto p-4 rounded-md h-[100vh] md:h-auto">
              <div className="flex items-center justify-between border-b-[1px] py-4 fill-primary">
                  <h1 className="font-medium text-2xl">Where to deliver?</h1>
                  <svg onClick={() => dispatch(setMapDisplayStatus({status: false}))}  xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg>
              </div>

              <div className="flex flex-col-reverse md:flex-row items-stretch justify-between gap-4 py-2">
                  <div className="flex md:basis-[40%]  flex-col justify-between relative">
                        <div className="search-address">
                          {address?.display_name ? 
                          <p className="max-w-[100%] py-2 mb-2 font-bold border-b-[1px]">{address.display_name}</p>
                          :
                          null
                          }
                        <input 
                          ref={addressRef}
                          placeholder={"Select your location"} 
                          onFocus={() => {
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
                          className="bg-secondary p-3 rounded flex justify-start gap-1 items-center w-[100%]"
                        />
                        {inputFocusStatus && searchResults.length > 0 ?
                        <ul className="fixed mt-3 p-3 bg-secondary shadow-xl rounded-md max-w-[40%] max-h-[10rem] overflow-y-auto">                          
                          {searchResults.map((res) => {
                            return <li className="py-2 hover:text-primary hover:cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis" onMouseDown={() => {
                              setAddress(res);
                              if(addressRef.current) {
                                addressElement!.value = "";
                              }
                              setInputFocusStatus(false)
                            }} key={res.place_id}>{res.display_name}</li>
                          })}
                        </ul>
                        :
                        null
                        }
                        </div>
                        <button onClick={confirmAddress} className="font-semibold right-[5%]  bg-primary text-accent p-4 rounded-xl hover:scale-105 transition-all duration-500 bottom-4 w-[100%] mx-auto text-center mt-8">Confirm address</button>
                  </div>

                  <div id="map" className="md:h-[400px] md:w-[400px] max-h-[30%]">
                    <MapContainer  center={position} zoom={16} scrollWheelZoom={false}>
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
    </div>  
  );
};

export default Map;
