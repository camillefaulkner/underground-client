export const getAllCategories = () => {
    return fetch('http://localhost:8000/categories', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const saveNewCategory = (catObj) => {
    return fetch(`http://localhost:8000/categories`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(catObj)
    })
        .then(response => response.json())
}