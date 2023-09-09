import {useDispatch, useSelector} from "react-redux"
import { RootState } from "../redux/store"
import { setCartDisplayStatus } from "../redux/mainStates"




const OrderButton = () => {
    const {cart} = useSelector((state: RootState) => state.mainStates)
    const prices = cart.map((prod) : number => prod.price * prod.quantity!) 
    const dispatch = useDispatch();
    const total   = prices.reduce((prev, curr) => {
        return prev + curr
    })
    return(<button onClick={() => {
        console.log(1)
        dispatch(setCartDisplayStatus({status: true}))
    }} className="btn-total btn-total-main">place an order for: 
    <span>${total}</span></button>)
}

export default OrderButton