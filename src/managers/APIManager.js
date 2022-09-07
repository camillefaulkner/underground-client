import { keys } from "./ApiKeys"

let client_id = '694cb23071a24c9e810554ec3671d5ab'
let client_secret = '2432d17447c94c65bb552713adc1b611'
var redirect_uri = 'http://localhost:8888/events';
let TOKEN = 'https://accounts.spotify.com/api/token'


export const fetchLatandLong = (address) => {
    let url = address
    let encode = encodeURIComponent(url)
    let API = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${encode}&apiKey=${keys.ptv}`
    return fetch(`${API}`)
        .then(response => response.json())
}


// const getToken = () => {
//     let result = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type' : 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
//         },
//         body: 'grant_type-client_credentials'
//     })
//     const data = await result.json()
//     return data.access_token
// }

// const getGenres = async (token) => {
//     let result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
//         method: 'GET',
//         headers : { 'Authorization': 'Bearer ' + token}
//     })
//     const data = await result.json()
//     return data.categories.items
// }

// return {
//     getToken() {
//         return getToken()
//     },
//     getGenres(token) {
//         return getGenres(token)
//     }
// }