// import { keys } from "./ApiKeys"
let keys = {ptv: "ZDZhNzQyOWJiN2U3NDgzZjk1ZjYwZmZiZmNjMmRhYjE6MmYzMzc4YmQtZGMyNS00Y2M3LWJiNDktMTI2OWIwOTM1NGVm"}


export const fetchLatandLong = (address) => {
    let url = address
    let encode = encodeURIComponent(url)
    let API = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${encode}&apiKey=${keys.ptv}`
    return fetch(`${API}`)
        .then(response => response.json())
}

