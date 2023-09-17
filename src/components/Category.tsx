import { useDispatch } from "react-redux"
import { typeCategory } from "../types/types"
import { setCurrentProductDisplay, setCurrentProductDisplayStatus, setPaddingBottomContainer } from "../redux/mainStates";
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
 

    return(<section className="pb-12"  ref={sectionRef} id={category.id}>
        {isSearch ? null : <h2 className="uppercase text-3xl font-bold pb-5">{category.name}</h2>  }      
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {category.products.map((product) => {
                return <li className="flex  gap-4 hover:scale-105 hover:opacity-60 transition-all duration-500 hover:cursor-pointer" onClick={() => {
                    dispatch(setCurrentProductDisplay({product}))
                    dispatch(setCurrentProductDisplayStatus({status: true}))
                }} id={product.id} key={product.id}>
                    <div className="relative rounded-xl overflow-hidden min-w-[30%]">
                        <img className="object-cover h-[100%]" src={product.img} alt={product.name} />
                        <span className="text-xs text-primary bg-secondary absolute bottom-1 right-1 rounded">{product.weight}g</span>
                    </div>
                    <div className="bg-accent rounded-xl p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="capitalize text-xl pb-3">{product.name}</h3>
                            <p className="line-clamp-1 opacity-60">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-bold">${product.price}</span>
                            <button><svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M450-280h60v-170h170v-60H510v-170h-60v170H280v60h170v170ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Z"/></svg></button>
                        </div>
                    </div>
                </li>
            })}
        </ul>
    </section>)
}

export default Category