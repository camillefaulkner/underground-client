export const assignCategory = (venue) => {
    return fetch(`http://localhost:8000/venues/${venue.id}/assign_category`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(venue)
    })
}