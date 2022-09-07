export const getAllUsers = () => {
    return fetch('http://localhost:8000/users', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const promoteAdmin = (user) => {
    return fetch(`http://localhost:8000/users/${user.id}/admin`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export const demoteAdmin = (user) => {
    return fetch(`http://localhost:8000/users/${user.id}/demote`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}