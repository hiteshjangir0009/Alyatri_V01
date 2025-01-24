import { Alerts } from "./constants/constants";


export const Live_url = 'http://16.170.41.109/api/v1/app/';
export const Img_url = 'http://16.170.41.109/image/';

// api names
export const API_url = {
    Login: `${Live_url}user`,
    otp: `${Live_url}otp`,
    Home: `${Live_url}home`,
    Home_Filter: `${Live_url}homeFilter`,
    SubCategory:`${Live_url}category`,
    Events: `${Live_url}event`,
    Places: `${Live_url}place`,

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


export const RefressAccessToken = async (Url, Refresstoken) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Refresstoken}`);

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