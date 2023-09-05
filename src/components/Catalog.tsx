import {useSelector} from "react-redux"
import { RootState } from "../redux/store"
import Category from "./Category"
import {useState, useEffect} from "react"
import { typeProduct } from "../types/types"
import MenuMobile from "./menus/MenuMobile"


const Catalog = () => {
    const {categories} = useSelector((state: RootState) => state.mainStates)
    const [searchKey, setSearchKey] = useState("");
    const [results, setResults] = useState<typeProduct[]>([]);
    useEffect(() => {
        const products = categories.map((category) => {
            return category.products
        })
        const allProducts = products.reduce((prev, curr) => {
            return prev.concat(curr)
        },[])
        const result = allProducts.filter((product) => {
            const valid = new RegExp(searchKey.toLowerCase());
            return (valid.test(product.name.toLowerCase()) || valid.test(product.category.toLowerCase()) || valid.test(product.description.toLowerCase()))
        })
        setResults(result)
    },[searchKey])
      
    return(<main>
        <div className="sf-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            <input onChange={(e) => {
                setSearchKey(e.target.value)
            }} type="text" placeholder="Search" className="search-field"/>
        </div>
        <MenuMobile />
        {searchKey.length > 0 ?

        (/\S/.test(searchKey) && results.length > 0) ?

        <Category isSearch={true} isLast={true} category={{name: "", id: "search", products: results}} />
        
        :
        <div className="err-message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 20C19 21.11 18.11 22 17 22C15.89 22 15 21.1 15 20C15 18.89 15.89 18 17 18C18.11 18 19 18.9 19 20M7 18C5.89 18 5 18.89 5 20C5 21.1 5.89 22 7 22C8.11 22 9 21.11 9 20S8.11 18 7 18M7.2 14.63L7.17 14.75C7.17 14.89 7.28 15 7.42 15H19V17H7C5.89 17 5 16.1 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2H4.27L5.21 4H20C20.55 4 21 4.45 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63M8.5 11H10V9H7.56L8.5 11M11 9V11H14V9H11M14 8V6H11V8H14M17.11 9H15V11H16L17.11 9M18.78 6H15V8H17.67L18.78 6M6.14 6L7.08 8H10V6H6.14Z" /></svg>
            <h2>Nothing found!</h2>        
            <p>Unfortunately, we did not find such a dish with us. Try something else.</p>
        </div>
        :        
        categories.map((category, index) => {
            let status = false;
            if(index == categories.length - 1) {
                status = true;
            }
            return <Category isSearch={false} isLast={status} category={category} />
        })}

    </main>)
}

export default Catalog