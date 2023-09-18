import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";
import { setMapDisplayStatus } from "../redux/mainStates";


const Header = () => {
    const location = useLocation()
    const dispatch = useDispatch();   
    const {currentAddress} = useSelector((state: RootState) => state.mainStates)
    return(<header className="grid gap-3 md:gap-0 md:grid-cols-3 p-[3%] max-w-6xl text-center mx-auto">
        <h1 id="header-logo" className="text-4xl italic font-bold text-primary">Texas Toast</h1>
        {location.pathname == "/order" ? null : 
        <p  id="header-address" onClick={() => {
            dispatch(setMapDisplayStatus({status: true}))
        }} className="flex justify-center gap-1 items-center font-medium fill-primary border-t-[1px] pt-1 md:border-t-[0px] md:border-x-[1px]"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>{typeof currentAddress == "object" ? 
        currentAddress.display_name 
        : "Select location"}</p>
        }
        <div id="header-login"><button>Login</button></div>
    </header>)
}

export default Header