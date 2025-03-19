import { Alerts } from "./constants/constants";


const url = `https://alyatri.com/`;
export const Base_url = 'http://16.170.41.109/api/v1/app/';

export const Live_url = `${url}api/v1/app/`;
export const Img_url = `${url}api/image/`;


// api names
export const API_url = {
    Login: `${Live_url}user`,
    otp: `${Live_url}otp`,
    Home: `${Live_url}home`,
    Home_Filter: `${Live_url}homeFilter`,
    SubCategory:`${Live_url}category`,
    Events: `${Live_url}event`,
    Places: `${Live_url}place`,
    Trending: `${Live_url}getAttractions`,
    Experience: `${Live_url}getrestaurants`,
    Whatson: `${Live_url}getGeos`,
    Get_itinerary: `${Live_url}getItinerary`,
    Create_itinerary: `${Live_url}createItinerary`,
    Profile_update: `${Live_url}userUpdate`,
    Search: `${Live_url}searchGlobal`,
    Favourite: `${Live_url}favourite`,
    Attractions: `${Live_url}getAttractions`,

};


export const LogoutApi = async (Url, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };

    const response = await fetch(Url, requestOptions);
    return await response.json();
};



export const postApi = async (Url, Data, token) => {
    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-Key", token);


    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: Data,
        redirect: 'follow',
    };

    const response = await fetch(Url, requestOptions);
    return response.json();

};


export const getApi = async (Url, token) => {
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    // myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: 'follow',
    };

    const response = await fetch(Url, requestOptions);
    return await response.json();
};