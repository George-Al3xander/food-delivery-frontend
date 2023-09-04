import { typeCategory } from "../types/types"




const Category = ({category}: {category: typeCategory}) => {
    return(<section  id={category.id}>
        <h2>{category.name}</h2>
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
                        <div>
                            <span className="price">${product.price}</span>
                            <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" /></svg></button>
                        </div>
                    </div>
                </li>
            })}
        </ul>
    </section>)
}

export default Category