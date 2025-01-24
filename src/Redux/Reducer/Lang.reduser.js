import {  Language } from "../Constants/Constant"


const initialstate = []

export const Language_Reducer = (state = initialstate, action) => {
    switch (action.type) {

        case Language:
            return [
                action.payload,
            ]
       
        default:
            return state
    }
}

