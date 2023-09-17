import {useSelector} from "react-redux"
import { RootState } from "../../redux/store"
import {useEffect, useState} from "react"

const MenuMobile = () => {
    const {categories} = useSelector((state: RootState) => state.mainStates)
      
    const handleClickScroll = (id: string) => {
        const element  = document.getElementById(id);
        if (element) { 
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const [offset, setOffset] = useState(0);

    const sections = document.querySelectorAll<HTMLElement>("section");
    const navLi = document.querySelectorAll(".menu-mobile ul li");
   
    const handleScroll = () => {
        setOffset(window.scrollY)
    }    
    useEffect(() => {
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);      
        
    },[])
    useEffect(() => {
        let current = "";
        sections.forEach((section) => {
            if(section) {
                const sectionTop = section.offsetTop
                //const sectionHeight = section.clientHeight
                if(offset >= sectionTop - 120) {
                    current = section.getAttribute("id")!
                }               
            }
        })
        navLi.forEach((li) => {          
            li.classList.remove("active");
            if(li.classList.contains(current)) {                          
                li.classList.add("active")
            }
        })
    },[offset])
    

    return(<nav className="md:hidden menu menu-mobile sticky top-[-10px] bg-secondary z-40 p-5  left-[-10%] max-w-[100%] overflow-x-scroll">        
        <ul className="flex gap-3">
            {categories.map((category) => {
                return <li className={`${category.id} uppercase font-medium text-lg p-1 rounded transition duration-500 hover:cursor-pointer hover:opacity-60`} onClick={() => {
                    handleClickScroll(category.id)
                }} key={category.id}>{category.name}</li>
            })}
        </ul>
    </nav>)
}

export default MenuMobile



