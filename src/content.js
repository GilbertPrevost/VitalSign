// web api

let proxyURL = 'https://cors-anywhere.herokuapp.com/'; //${proxyURL}

//export const BASE_API_URL1 = 'https://staycured-clinic.azurewebsites.net/API/';   //live

export const BASE_API_URL1 = `${proxyURL}https://staycured-clinic.azurewebsites.net/API/`;   //live with proxy

//export const BASE_API_URL = 'https://staycured-clinic-staging.azurewebsites.net/API/';   //staging

export const BASE_API_URL = `${proxyURL}https://staycured-clinic-staging.azurewebsites.net/API/`;  //staging with proxy