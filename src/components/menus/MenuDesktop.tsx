import {useSelector} from "react-redux"
import { RootState } from "../../redux/store"


const MenuDesktop = () => {
    const {categories} = useSelector((state: RootState) => state.mainStates)
    return(<nav>
        <h1>Menu</h1>
        <ul>
            {categories.map((category) => {
                return <li key={category.id}><a href={`#${category.id}`}>{category.name}</a></li>
            })}
        </ul>
    </nav>)
}

export default MenuDesktop