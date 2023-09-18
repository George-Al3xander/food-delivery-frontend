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
    }} className="fixed font-semibold right-[5%]  bg-primary text-accent p-4 rounded-xl flex justify-between  hover:scale-105 transition-all duration-500 bottom-4  w-[90%] z-20 md:right-4 md:w-[25%]">Place an order for: 
    <span>${total}</span></button>)
}

export default OrderButton