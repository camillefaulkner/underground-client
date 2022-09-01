export const getAllCategories = () => {
    return fetch('http://localhost:8000/categories', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}
