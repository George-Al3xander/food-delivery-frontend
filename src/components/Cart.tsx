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

    return(<div className="fullscreen-bg">
        <div className="cart">
            <div className="cart-header">
                <h2>Cart</h2>
                <svg onClick={() => {
                   dispatch(setCartDisplayStatus({status: false}))
                }}  xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg>
            </div>
            <ul className="cart-body">
                {cart.map((item) => {
                    return <li className="product-container">
                        <span className="div-img-product">
                            <img src={item.img} alt={item.name + " img"} />
                        </span>
                            <div className="product-main-info">
                            <h2>{item.name} <svg onClick={() => {
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
