import {useSelector} from "react-redux"
import { RootState } from "../redux/store"




const OrderButton = () => {
    const {cart} = useSelector((state: RootState) => state.mainStates)
    const prices = cart.map((prod) : number => prod.price * prod.quantity!) 
    const total   = prices.reduce((prev, curr) => {
        return prev + curr
    })
    return(<button className="btn-total btn-total-main">place an order for: 
    <span>${total}</span></button>)
}

export default OrderButton