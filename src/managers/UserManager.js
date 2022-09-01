export const getAllUsers = () => {
    return fetch('http://localhost:8000/users', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}