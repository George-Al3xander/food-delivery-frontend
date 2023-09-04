import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {typeCategory, typeProduct } from '../types/types'
import mockDb from "../mockDb.json"
interface MainStates {
    currentAddress: string,
    cart: typeProduct[],
    categories: typeCategory[],
}


const initialState: MainStates = {
    currentAddress: "304 Austin Ave, Brownwood, TX 76801, USA",
    cart: [],
    categories: mockDb.data
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
    }
})

export const {setCurrentAddress, setCart} = mainSlice.actions

export const selectInfo = (state: RootState) => state.mainStates
export default mainSlice.reducer