import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { setMapDisplayStatus } from "../redux/mainStates"
import {useState, useRef,useEffect} from "react"
import { checkValid } from "./checkValid"



const OrderPage = () => {
    const {cart} = useSelector((state: RootState) => state.mainStates)
    const {currentAddress} = useSelector((state: RootState) => state.mainStates)
    const prices = cart.map((prod) : number => prod.price * prod.quantity!)     
    const total   = prices.reduce((prev, curr) => {
        return prev + curr
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();        
    const [valid,setValid] = useState(true)
    const blankValid = new RegExp(/\S/)
    const phoneValid = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: {            
            entrance: "",
            floor: "",
            apartment: ""
        },
        payment: ""
    })
   
        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        if(name != "floor" && name != "entrance" && name != "apartment") {
            setFormData({...formData, [name]: value})
        } else {
            setFormData({...formData, address: {...formData.address, [name]: value}})
        }
        console.log(name)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (blankValid.test(formData.name) && formData.name.length > 3 && phoneValid.test(formData.phone) && formData.address.apartment.length > 0 && formData.address.floor.length > 0 && formData.address.entrance.length > 0 && currentAddress.display_name.length > 0
        ) {
            setFormData({...formData, address: {...formData.address, ...currentAddress}})
            setValid(true)
        } else {          

            setValid(false);
        }
    }   
    return(<div className="bg-secondary">
        <div className="w-[min(90%,60rem)] m-auto py-6 flex gap-4 flex-col md:flex-row">
            <form  className="flex flex-col gap-4"  onSubmit={(e) => e.preventDefault()}>
                <fieldset className="bg-accent rounded-md p-4 flex flex-col">
                    <legend className="float-left font-medium text-2xl pb-6">Personal info</legend>
                    <span className="flex flex-col gap-2 pb-4">
                        <h3 className="opacity-70 font-normal">Your name*</h3>
                        <input onChange={handleChange} required className="bg-secondary p-3 rounded" name="name" placeholder="Enter your name" type="text" />
                    </span>
                    <span className="flex flex-col gap-2 pb-4">
                        <h3 className="opacity-70 font-normal">Your phone*</h3>
                        <input onChange={handleChange} required className="bg-secondary p-3 rounded" name="phone" placeholder="Enter your phone" type="tel" />
                    </span>
                </fieldset>
                <fieldset className="bg-accent rounded-md p-4 flex flex-col">
                    <legend className="float-left font-medium text-2xl pb-6">Delivery</legend>
                    <span className="flex flex-col gap-2 pb-4">
                        <h3 className="opacity-70 font-normal">Your address*</h3>
                        <button onClick={() => {
                            dispatch(setMapDisplayStatus({status: true}))
                        }} className="bg-secondary p-3 rounded flex justify-start gap-1 items-center" name="entrance"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>{currentAddress.display_name}</button>
                    </span>                                          
                        <ul className="grid grid-cols-3 gap-2 md:max-w-[40%]">
                            <li className="">
                                <span className="flex flex-col gap-2 pb-4">
                                    <h3 className="opacity-70 font-normal">Entrance*</h3>
                                    <input required onChange={handleChange} className="bg-secondary p-3 rounded" name="entrance"  type="text" />
                                </span>
                            </li>                            
                            <li>
                                <span className="flex flex-col gap-2 pb-4">
                                    <h3 className="opacity-70 font-normal">Floor*</h3>
                                    <input required onChange={handleChange} className="bg-secondary p-3 rounded" name="floor"  type="text" />
                                </span>
                            </li>
                            <li>
                                <span className="flex flex-col gap-2 pb-4">
                                    <h3 className="opacity-70 font-normal">Apartment*</h3>
                                    <input required onChange={handleChange} className="bg-secondary p-3 rounded" name="apartment"  type="text" />
                                </span>
                            </li>
                        </ul>                    
                </fieldset>

                <fieldset className="bg-accent rounded-md p-4 flex flex-col">
                    <legend className="float-left font-medium text-2xl pb-6">Payment</legend>
                    <select onChange={handleChange} required name="payment" id="">
                        <option selected={true} disabled >Select payment type</option>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                    </select>
                </fieldset>
                <fieldset className="bg-accent rounded-md p-4 flex flex-col">
                    <legend className="float-left font-medium text-2xl pb-6">Additional info</legend>
                    <textarea   className="border-2 p-2 bg-secondary" placeholder="Additional info" name="additional-info" id="" cols={30} rows={5}></textarea>
                </fieldset>
            </form>



            <form onSubmit={handleSubmit} className="rounded-md overflow-hidden w-[100%] md:basis-[40%] bg-accent self-start">
               <fieldset className="bg-accent  p-4 flex flex-col border-b-[1px]">
                    <legend className="float-left font-medium text-2xl ">Your order</legend>
                </fieldset> 

                <fieldset className="bg-accent  p-4 flex flex-col">
                <ul className="order-conclusion-products">
                    {cart.map((item) => {
                        return <li className="flex flex-col gap-2 border-b-2 py-2 font-medium">
                            <div className="flex justify-between"><span className="capitalize">{item.name}</span><span>x {item.quantity}</span></div>
                            <div className="flex justify-between"><span className="opacity-60">{item.weight}g</span><span>${item.price}</span></div>
                        </li>
                    })}
                </ul>
                </fieldset>
                
                <div className="p-4 flex flex-col gap-3">
                    <p className="flex justify-between font-semibold">Total payable: <span>${total}</span></p>    
                    
                    {valid ? 
                    null                     
                    : 
                    
                    <p className="mt-8 text-red-600">Fill all the fields marked with star</p>}
                    
                    <button  className={`font-semibold right-[5%]  bg-primary text-accent p-4 rounded-xl hover:scale-105 transition-all duration-500 bottom-4 w-[100%] mx-auto text-center mt-8 ${valid ? "" : "disabled"}`}>Checkout</button>
                    
                    <button className="text-primary font-medium hover:opacity-60" onClick={(e)=> {
                        e.preventDefault();
                        navigate("/")
                    }}>Back to menu</button>

                </div>
            </form>
        </div>
    </div>)
}

export default OrderPage
