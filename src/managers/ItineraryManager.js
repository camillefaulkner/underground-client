export const saveNewSelection = (data) => {
    return fetch(`https://cf-underground.herokuapp.com/chosenshows`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
}

export const getAllSelectionsByUser = (id) => {
    return fetch(`https://cf-underground.herokuapp.com/chosenshows?user=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}


export const deleteSelection = (id) => {
    return fetch(`https://cf-underground.herokuapp.com/chosenshows/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('ug_token')}`
      }
    })
  }
  