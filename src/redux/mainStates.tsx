import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {typeCategory, typeProduct } from '../types/types'
import mockDb from "../mockDb.json"
interface MainStates {
    currentAddress: string,
    cart: typeProduct[],
    categories: typeCategory[],
    paddingBottomContainer: number,
    currentDisplayProduct: typeProduct,
    currentDisplayProductStatus: boolean,
    cartDisplayStatus: boolean
}


const initialState: MainStates = {
    currentAddress: "304 Austin Ave, Brownwood, TX 76801, USA",
    cart: [],
    categories: mockDb.data,
    paddingBottomContainer: 0,
    currentDisplayProduct: {name: "", description: "",price: 0, weight: 0, img: "", id: "",category: ""},
    currentDisplayProductStatus: false,
    cartDisplayStatus: false
}

export const mainSlice = createSlice({
    name: "mainStates",
    initialState,
    reducers: {
        setCurrentAddress: (state, action: PayloadAction<{address: string}>) => {
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
    }
})

export const {setCurrentAddress, setCart, setPaddingBottomContainer, setCurrentProductDisplay, setCurrentProductDisplayStatus, setCartDisplayStatus} = mainSlice.actions

export const selectInfo = (state: RootState) => state.mainStates
export default mainSlice.reducer