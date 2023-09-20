import {useEffect, useState} from "react"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { typeStreet } from "../types/types";



export const checkValid = (form :  HTMLFormElement, currentAddress: typeStreet) => {
    const blankValid = new RegExp(/\S/);

    if(form) {
        const formData = new FormData(form)
        console.log(formData.get("name"))
        console.log(formData.get("phone"))
        console.log(formData.get("payment"))
        return true
    }
       
    // if(formData) {
    //     console.log("For now we good")
    //     return !blankValid.test(formData?.get("name"))
    // }
    
}

