export const getAllUsers = () => {
    return fetch('https://cf-underground.herokuapp.com/users', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const promoteAdmin = (user) => {
    return fetch(`https://cf-underground.herokuapp.com/users/${user.id}/admin`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export const demoteAdmin = (user) => {
    return fetch(`https://cf-underground.herokuapp.com/users/${user.id}/demote`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}