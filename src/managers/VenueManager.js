export const assignCategory = (venue) => {
    return fetch(`https://cf-underground.herokuapp.com/venues/${venue.id}/assign_category`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(venue)
    })
}

export const getAllVenues = () => {
    return fetch('https://cf-underground.herokuapp.com/venues?private=False', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const getVenuesBySearch = (search) => {
    return fetch(`https://cf-underground.herokuapp.com/venues?private=False&q=${search}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('ug_token')}`
      }
    }).then(res => res.json())
  }