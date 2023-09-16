import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {typeCategory, typeProduct, typeStreet } from '../types/types'
import mockDb from "../mockDb.json"
interface MainStates {
    currentAddress: typeStreet,
    cart: typeProduct[],
    categories: typeCategory[],
    paddingBottomContainer: number,
    currentDisplayProduct: typeProduct,
    currentDisplayProductStatus: boolean,
    cartDisplayStatus: boolean,
    mapDisplayStatus: boolean,
}


const initialState: MainStates = {
    currentAddress: {
        place_id: 103702247,     
        lat: 42.3636176,
        lon: 1.8713459,        
        display_name: 'Das, Cerdanya, Girona, Catalonia, Spain',
        address: {
            village: 'Das',
            county: 'Cerdanya',
            state_district: 'Girona',            
            state: 'Catalonia',            
            country: 'Spain',
            country_code: 'es'
        },       
    },
    cart: [],
    categories: mockDb.data,
    paddingBottomContainer: 0,
    currentDisplayProduct: {name: "", description: "",price: 0, weight: 0, img: "", id: "",category: ""},
    currentDisplayProductStatus: false,
    cartDisplayStatus: false,
    mapDisplayStatus: false
}

export const mainSlice = createSlice({
    name: "mainStates",
    initialState,
    reducers: {
        setCurrentAddress: (state, action: PayloadAction<{address: typeStreet}>) => {
            state.currentAddress = action.payload.address
        },
        setCart: (state, action: PayloadAction<{cart: typeProduct[]}>) => {
            state.cart = action.payload.cart
        },
        setCategories: (state, action: PayloadAction<{categories: typeCategory[]}>) => {
            state.categories = action.payload.categories
        },
        setPaddingBottomContainer: (state, action: PayloadAction<{padding: number}>) => {
            state.paddingBottomContainer = action.payload.padding
        },
        setCurrentProductDisplay: (state, action: PayloadAction<{product: typeProduct}>) => {
            state.currentDisplayProduct = action.payload.product
        },
        setCurrentProductDisplayStatus: (state, action: PayloadAction<{status: boolean}>) => {
            state.currentDisplayProductStatus = action.payload.status
        },
        setCartDisplayStatus: (state, action: PayloadAction<{status: boolean}>) => {
            state.cartDisplayStatus = action.payload.status
        },
        setMapDisplayStatus: (state, action: PayloadAction<{status: boolean}>) => {
            state.mapDisplayStatus = action.payload.status
        },
    }
})

export const {setCurrentAddress, setCart, setPaddingBottomContainer, setCurrentProductDisplay, setCurrentProductDisplayStatus, setCartDisplayStatus, setMapDisplayStatus} = mainSlice.actions

export const selectInfo = (state: RootState) => state.mainStates
export default mainSlice.reducer