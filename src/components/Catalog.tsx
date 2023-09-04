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

        /\S/.test(searchKey) ?

        <Category isSearch={true} isLast={true} category={{name: "", id: "search", products: results}} />
        
        :
        "No results"        
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