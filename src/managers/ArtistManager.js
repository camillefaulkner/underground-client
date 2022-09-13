export const saveNewArtist = (artistObj) => {
    return fetch(`http://localhost:8000/artists`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artistObj)
    })
        .then(response => response.json())
}

export const getSingleArtist = (id) => {
    return fetch(`http://localhost:8000/artists/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const updateArtist= (artist) => {
    return fetch(`http://localhost:8000/artists/${artist.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artist)
    })
}

export const saveNewArtistConnection = (connectionObj) => {
    return fetch(`http://localhost:8000/evtartist`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(connectionObj)
    })
        .then(response => response.json())
}