

export const fetchLatandLong = (address) => {
    let url = address
    let encode = encodeURIComponent(url)
    let API = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${encode}&apiKey=${process.env.REACT_APP_PTV}`
    return fetch(`${API}`)
        .then(response => response.json())
}

