export type typeProduct = {
    name: string,
    description: string,
    price: number,
    weight: number,
    img: string,
    id: string,
    category: string
}

export type typeCategory = {
    name: string,
    id: string,
    products: typeProduct[]    
}


type typeCustomer = {
    name: string,
    phone: number,
    address: string
}

export type typeTotalOrder = {
    customer: typeCustomer,
    time: string | Date,
    cashPaymentStatus: boolean,
    comment?: string,
    order: typeProduct[]  
}

