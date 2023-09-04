import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";
import logo from "../assets/images/logo.png"


const Header = () => {
    const dispatch = useDispatch();
    const {currentAddress} = useSelector((state: RootState) => state.mainStates)
    return(<header>
        <h1 className="logo">Texas Toast</h1>
        <p className="address">{currentAddress.length > 0 ? currentAddress : "Select location"}</p>
        <div><button>Login</button></div>
    </header>)
}

export default Header