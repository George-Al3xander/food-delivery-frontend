import { useDispatch } from "react-redux"
import { typeCategory } from "../types/types"
import { setPaddingBottomContainer } from "../redux/mainStates";
import {useEffect, useState, useRef} from "react"


const Category = ({category, isLast, isSearch}: {category: typeCategory, isLast: boolean, isSearch: boolean}) => {
    const dispatch = useDispatch();
    let padding: number = 0;
    const windowHeight = window. innerHeight
    const sectionRef = useRef<HTMLElement>(null)
    const section = sectionRef.current;
    const [offset, setOffset] = useState(0);
    const handleScroll = () => {
        setOffset(window.scrollY)
    }    
    useEffect(() => {
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);      
        
    },[])
    useEffect(() => {
        handlePadding();
    },[offset])

    const handlePadding = () => {
        if(section) {
            const sectionHeight = section!.offsetHeight 
            if(isLast) {
                padding = windowHeight-sectionHeight;                
                dispatch(setPaddingBottomContainer({padding}))                   
            }
        }
    }
    
    useEffect(() =>{
        handlePadding();   
    },[])
 

    return(<section ref={sectionRef} id={category.id}>
        {isSearch ? null : <h2>{category.name}</h2>  }      
        <ul className="category-products">
            {category.products.map((product) => {
                return <li id={product.id} key={product.id}>
                    <div className="div-img-product">
                        <img src={product.img} alt={product.name} />
                        <span className="product-weight-display">{product.weight}g</span>
                    </div>
                    <div className="product-main-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="product-main-info-bottom">
                            <span className="price">${product.price}</span>
                            <button><svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M450-280h60v-170h170v-60H510v-170h-60v170H280v60h170v170ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Z"/></svg></button>
                        </div>
                    </div>
                </li>
            })}
        </ul>
    </section>)
}

export default Category