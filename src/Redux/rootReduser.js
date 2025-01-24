import { combineReducers } from "redux";
import { Auth_Reducer, Mobile_Reducer, Token_Reducer } from "./Reducer/Auth.reduser";
import { Language_Reducer } from "./Reducer/Lang.reduser";


export default combineReducers({
    Token_Reducer,
    Mobile_Reducer,
    Language_Reducer
})