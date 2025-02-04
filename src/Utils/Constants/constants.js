import { Dimensions } from "react-native";

export const Height  = Dimensions.get('window').height; // Screen dimensions
export const Width  = Dimensions.get('window').width; // Screen dimensions

export const Error_Logs = (title, error) => {
    console.log(`${title}_error ==>>`,error)
}

export const Logs = (title, data) => {
    console.log(`${title}_API_response ==>>`,data)
}