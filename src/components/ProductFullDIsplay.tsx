import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { setCart, setCurrentProductDisplayStatus } from "../redux/mainStates";
import {useEffect, useRef, useState} from "react"




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
        },800)         
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

    return(<div onClick={(/*e*/) => {
        // const target = e.target as Element;
        // if(target.classList.contains("product-full-display-content")) {
        //    dispatch(setCurrentProductDisplayStatus({status: false}));
        // }
        closeMenu();        
    }} id="bg" className="fixed z-50 top-0 bg-[rgba(0,0,0,50%)] h-[100vh] w-[100%] pt-[5%]">
        <div onClick={(e) => e.stopPropagation()} ref={divRef} 
        className="flex w-[min(90%,60rem)] m-auto rounded-xl overflow-hidden  popout flex-col fill-primary md:flex-row" id={product.id} key={product.id}>
                <div className="relative min-w-[30%] max-h-[50vh] overflow-hidden">
                <svg className="md:hidden inline absolute right-1 top-1 hover:cursor-pointer" onClick={closeMenu} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg>
                    <img className="object-cover h-[100%] w-[100%]" src={product.img} alt={product.name} />
                </div>
                <div className="bg-accent  p-4">
                    <div className="flex flex-col gap-3">
                        <h1 className="flex items-center justify-between capitalize font-medium text-2xl">{product.name} <svg onClick={closeMenu}
                        className="hover:cursor-pointer md:inline hidden" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/></svg></h1>
                        <span className="text-xs text-primary bg-secondary bottom-1 right-1 rounded w-[min-content]">{product.weight}g</span>
                        <span className="font-bold">${product.price}</span>
                        <p className="opacity-60 max-h-[5rem] overflow-y-scroll">{product.description}</p>
                    </div>                    
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex">
                            <button onClick={() => {
                                setQuantity((prev) => prev - 1)
                            }} disabled={quantity <= 1 ? true : false }>
                               <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25"><path d="M200-446.667v-66.666h560v66.666H200Z"/></svg>
                            </button>
                            <h3 className="font-medium text-xl opacity-60">{quantity}</h3>
                            <button onClick={() => {
                                setQuantity((prev) => prev + 1)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25"><path d="M446.667-446.667H200v-66.666h246.667V-760h66.666v246.667H760v66.666H513.333V-200h-66.666v-246.667Z"/></svg>
                            </button>
                        </div>
                        <button onClick={addToCart} className="bg-primary text-accent p-3 rounded-xl flex justify-between min-w-[6rem] hover:scale-105 transition-all duration-500">Add: <span>${total}</span></button>
                    </div>
                </div>
                  
        </div>       
    </div>)
}

export default  ProductFullDisplay