import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useNavigate } from "react-router-dom"




const OrderPage = () => {
    const {cart} = useSelector((state: RootState) => state.mainStates)
    const prices = cart.map((prod) : number => prod.price * prod.quantity!)     
    const total   = prices.reduce((prev, curr) => {
        return prev + curr
    })
    const navigate = useNavigate();
    
   
    const {currentAddress} = useSelector((state: RootState) => state.mainStates)
    return(<div className="container">
        <div className="split">
            <form  onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                    <legend>Personal info</legend>
                    <span className="input-wrapper">
                        <h3>Your name*</h3>
                        <input name="name" placeholder="Enter your name" type="text" />
                    </span>
                    <span className="input-wrapper">
                        <h3>Your phone*</h3>
                        <input name="phone" placeholder="Enter your phone" type="tel" />
                    </span>
                </fieldset>
                <fieldset>
                    <legend>Delivery</legend>
                    <span className="input-wrapper">
                        <h3>Your address*</h3>
                        <button>{currentAddress.display_name}</button>
                    </span>                                          
                        <ul className="address-additional">
                            <li>
                                <span className="input-wrapper">
                                    <h3>Entrance</h3>
                                    <input name="entrance"  type="text" />
                                </span>
                            </li>                            
                            <li>
                                <span className="input-wrapper">
                                    <h3>Floor</h3>
                                    <input name="floor"  type="text" />
                                </span>
                            </li>
                            <li>
                                <span className="input-wrapper">
                                    <h3>Apartment</h3>
                                    <input name="apartment"  type="text" />
                                </span>
                            </li>
                        </ul>                    
                </fieldset>

                <fieldset>
                    <legend>Payment</legend>
                    <select required name="payment" id="">
                        <option selected={true} disabled >Select payment type</option>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Additional info</legend>
                    <textarea placeholder="Additional info" name="additional-info" id="" cols={30} rows={5}></textarea>
                </fieldset>
            </form>

            <form className="order-conclusion">
               <fieldset>
                    <legend>Your order</legend>
                </fieldset> 

                <fieldset>
                <ul className="order-conclusion-products">
                    {cart.map((item) => {
                        return <li>
                            <div><span>{item.name}</span><span>x {item.quantity}</span></div>
                            <div><span className="weight">{item.weight}g</span><span>${item.price}</span></div>
                        </li>
                    })}
                </ul>
                </fieldset>
                
                <div className="order-footer">
                    <p className="total">Total payable: <span>${total}</span></p>                   
                    <button className="btn-total btn-total-cart">Checkout</button>
                    <button onClick={(e)=> {
                        e.preventDefault();
                        navigate("/")
                    }}>Back to menu</button>

                </div>
            </form>
        </div>
    </div>)
}

export default OrderPage
