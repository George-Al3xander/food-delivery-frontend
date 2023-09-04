import {useSelector} from "react-redux"
import { RootState } from "../../redux/store"
import {useEffect, useState} from "react"

const MenuDesktop = () => {
    const {categories} = useSelector((state: RootState) => state.mainStates)
      
    const handleClickScroll = (id: string) => {
        const element  = document.getElementById(id);
        if (element) {            
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const [offset, setOffset] = useState(0);

    const sections = document.querySelectorAll<HTMLElement>("section");
    const navLi = document.querySelectorAll("nav ul li");
    const scrollProgress = window.scrollY;
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
                if(offset >= sectionTop - 48) {
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
    

    return(<nav className="menu menu-desktop">
        <h1>Menu</h1>
        <ul>
            {categories.map((category) => {
                return <li className={category.id} onClick={() => {
                    handleClickScroll(category.id)
                }} key={category.id}>{category.name}</li>
            })}
        </ul>
    </nav>)
}

export default MenuDesktop



