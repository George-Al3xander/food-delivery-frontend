export type typeProduct = {
    name: string,
    description: string,
    price: number,
    weight: number,
    img: string,
    id: string,
    category: string,
    quantity?: number

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


export type typeStreet = {
    address: {        
        house_number?: number,
        village?: string,
        state_district?: string,
        county: string,
        road?: string,
        borough?: string,
        city?: string,
        municipality?: string,
        district?: string,
        state?: string,       
        postcode?: number,
        country?: string,
        country_code?: string       
    },
    lat: number,
    lon: number,
    display_name: string,
    place_id: number
}

