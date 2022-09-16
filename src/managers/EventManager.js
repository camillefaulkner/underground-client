export const getApprovedEvents = () => {
    return fetch('https://cf-underground.herokuapp.com/events?approved=True', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const getPendingEvents = () => {
    return fetch('https://cf-underground.herokuapp.com/events?approved=False', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}


export const getSingleEvent = (id) => {
    return fetch(`https://cf-underground.herokuapp.com/events/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const saveNewEvent = (data) => {
    return fetch(`https://cf-underground.herokuapp.com/events`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
}

export const deleteEvent = (id) => {
    return fetch(`https://cf-underground.herokuapp.com/events/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('ug_token')}`
      }
    })
  }

  export const deleteArtist = (EvtId, ArtistId) => {
    return fetch(`https://cf-underground.herokuapp.com/events/${EvtId}/delete_artist?artist=${ArtistId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('ug_token')}`
      }
    })
  }

export const updateEvent = (event) => {
    return fetch(`https://cf-underground.herokuapp.com/events/${event.evt.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}

export const approveEvent = (event) => {
    return fetch(`https://cf-underground.herokuapp.com/events/${event.id}/approve`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}


export const getEventsByVenueArtist = (search) => {
    return fetch(`https://cf-underground.herokuapp.com/events?approved=True&q=${search}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('ug_token')}`
      }
    }).then(res => res.json())
  }


export const getEventsByCategory = (id) => {
    return fetch(`https://cf-underground.herokuapp.com/events?approved=True&category=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const getThisWeekEvents = () => {
    return fetch(`https://cf-underground.herokuapp.com/events/this_week?approved=True`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

