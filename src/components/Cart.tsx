import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { typeProduct } from "../types/types";
import { setCart, setCartDisplayStatus } from "../redux/mainStates";
import { useNavigate } from "react-router-dom";



const Cart = () =>{
    const {cart} = useSelector((state: RootState) => state.mainStates);
    const dispatch = useDispatch();
    const prices = cart.map((prod) : number => prod.price * prod.quantity!)     
    const total   = prices.reduce((prev, curr) => {
        return prev + curr
    })

    const navigate = useNavigate()

    const reduceOrAddQuantity = (type: string, product: typeProduct) => {        
        if(product.quantity) {
            let newQuantity = product.quantity;

            if(type == "add") {
                newQuantity++
            } else if(type == "reduce"){
                newQuantity--
            }

            let tempArray = cart.map((item) => {
                if(item.id == product.id && item.quantity) {
                   return {...product, quantity:  newQuantity}
                } else {
                    return item
                }
            });
            dispatch(setCart({cart: tempArray})) 
        }
    }
    const reduceQuantity = (product: typeProduct) => {
        reduceOrAddQuantity("reduce",product)
    }

    const addQuantity = (product: typeProduct) => {
        reduceOrAddQuantity("add",product)
    }

    const removeFromCart = (item: typeProduct) => {
        const tempArray = cart.filter((prod) =>{
            return prod.id != item.id
        })
        dispatch(setCart({cart: tempArray}));
    }

    return(<div className="fixed z-50 top-0 bg-[rgba(0,0,0,50%)] h-[100vh] w-[100%]">
        <div className="bg-accent max-w-[40%] h-[100%] ml-auto p-4">
            <div className="flex items-center justify-between border-b-[1px] py-2">
                <h2 className="font-medium text-lg">Cart</h2>
                <svg onClick={() => {
                   dispatch(setCartDisplayStatus({status: false}))
                }} 
                className="fill-primary"
                xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg>
            </div>
            <ul className="flex flex-col">
                {cart.map((item) => {
                    return <li className="flex w-[100%]">
                        <span className="max-w-[40%]">
                            <img className="object-cover h-[100%] w-[100%]" src={item.img} alt={item.name + " img"} />
                        </span>
                            <div className="capitalize">
                            <h2 className="flex items-center justify-between">{item.name} <svg onClick={() => {
                                removeFromCart(item)
                            }}  xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg></h2>
                                <div className="cart-product-main-info">
                                <span className="price">${item.price}</span>
                                <div className="btn-quantity">
                                    <button onClick={() => {
                                        reduceQuantity(item)
                                    }} disabled={item.quantity! <= 1 ? true : false }>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M200-446.667v-66.666h560v66.666H200Z"/></svg>
                                    </button>
                                    <h3>{item.quantity}</h3>
                                    <button onClick={() => {
                                        addQuantity(item)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M446.667-446.667H200v-66.666h246.667V-760h66.666v246.667H760v66.666H513.333V-200h-66.666v-246.667Z"/></svg>
                                    </button>
                                </div>
                                </div>                            
                            </div>
                    </li>
                })}
            </ul>

            <div className="cart-footer">              
                    <p className="total">Total payable: <span>${total}</span></p>
                    <button onClick={() => {
                        navigate("/order")
                    }} className="btn-total btn-total-cart">Order</button>
            </div>
        </div>
    </div>)
}


export default Cart
