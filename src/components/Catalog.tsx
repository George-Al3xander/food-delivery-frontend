import {useSelector} from "react-redux"
import { RootState } from "../redux/store"
import Category from "./Category"



const Catalog = () => {
    const {categories} = useSelector((state: RootState) => state.mainStates)

    return(<main>
        {categories.map((category) => {
            return <Category category={category} />
        })}

    </main>)
}

export default Catalog