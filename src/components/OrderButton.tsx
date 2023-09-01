import {useSelector} from "react-redux"
import { RootState } from "../redux/store"
import { typeProduct } from "../types/types"



const OrderButton = () => {
    const {cart} = useSelector((state: RootState) => state.mainStates)
    const prices = cart.map((prod) : number => prod.price)
    const total   = prices.reduce((prev, curr) => {
        return prev + curr
    })
    return(<button className="btn-order">place an order: 
    <span>${total}</span></button>)
}