export const saveNewArtist = (artistObj) => {
    return fetch(`http://localhost:8000/artists`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("dt_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artistObj)
    })
        .then(response => response.json())
}