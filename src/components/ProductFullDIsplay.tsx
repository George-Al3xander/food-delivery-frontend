import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { setCart, setCurrentProductDisplayStatus } from "../redux/mainStates";
import {useEffect, useRef, useState} from "react"
import { typeProduct } from "../types/types";



const ProductFullDisplay = () => {
    const product = useSelector((state: RootState) => state.mainStates.currentDisplayProduct)
    const cart = useSelector((state: RootState) => state.mainStates.cart)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(product.price);
    const divRef = useRef<HTMLDivElement>(null)    
    useEffect(() => {
        setTotal(product.price * quantity)
    },[quantity])

    const closeMenu = () => {         
        divRef.current!.classList.add('close');
        setTimeout(() => {            
            dispatch(setCurrentProductDisplayStatus({status: false}));
        },400)         
    }

    const addToCart = () => {
        const newCart = {...product,quantity}
        const coond = cart.some((item) => {
            return item.id == product.id
        });        
        if(coond) {           
            let tempArray = cart.map((item) => {
                if(item.id == product.id && item.quantity) {
                   return {...product, quantity: item.quantity + quantity}
                } else {
                    return item
                }
            });
            dispatch(setCart({cart: tempArray}))                   
        } else {
            dispatch(setCart({cart: [...cart,newCart]}))           
        }      
        closeMenu();
    }

    return(<div onClick={(e) => {
        const target = e.target as Element;
        if(target.classList.contains("product-full-display-content")) {
           dispatch(setCurrentProductDisplayStatus({status: false}));
        }
        
    }} id="bg" className="current-product-bg fullscreen-bg">
        <div ref={divRef} className="current-product popout" id={product.id} key={product.id}>
                <div className="current-product-img">
                <svg onClick={closeMenu} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg>
                    <img src={product.img} alt={product.name} />
                </div>
                <div className="current-product-info-wrapper">
                    <div className="current-product-info">
                        <h1>{product.name} <svg onClick={closeMenu} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg></h1>
                        <span className="current-product-weight">{product.weight}g</span>
                        <span className="price">${product.price}</span>
                        <p>{product.description}</p>
                    </div>                    
                    <div className="btns">
                        <div className="btn-quantity">
                            <button onClick={() => {
                                setQuantity((prev) => prev - 1)
                            }} disabled={quantity <= 1 ? true : false }>
                               <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M200-446.667v-66.666h560v66.666H200Z"/></svg>
                            </button>
                            <h3>{quantity}</h3>
                            <button onClick={() => {
                                setQuantity((prev) => prev + 1)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M446.667-446.667H200v-66.666h246.667V-760h66.666v246.667H760v66.666H513.333V-200h-66.666v-246.667Z"/></svg>
                            </button>
                        </div>
                        <button onClick={addToCart} className="btn-total">Add: ${total}</button>
                    </div>
                </div>
                  
        </div>       
    </div>)
}

export default  ProductFullDisplay