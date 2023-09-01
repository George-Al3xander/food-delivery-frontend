import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";



const Header = () => {
    const dispatch = useDispatch();
    const {currentAddress} = useSelector((state: RootState) => state.mainStates)
    return(<header>
        <h1>Texas Toast</h1>
        <p>{currentAddress.length > 0 ? currentAddress : "Select location"}</p>
        <button>Login</button>
    </header>)
}

export default Header