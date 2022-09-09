export const getApprovedEvents = () => {
    return fetch('http://localhost:8000/events?approved=True', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const getPendingEvents = () => {
    return fetch('http://localhost:8000/events?approved=False', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}


export const getSingleEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const saveNewEvent = (data) => {
    return fetch(`http://localhost:8000/events`, {
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
    return fetch(`http://localhost:8000/events/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('ug_token')}`
      }
    })
  }

  export const deleteArtist = (EvtId, ArtistId) => {
    return fetch(`http://localhost:8000/events/${EvtId}/delete_artist?artist=${ArtistId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('ug_token')}`
      }
    })
  }

export const updateEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}

export const approveEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}/approve`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}


export const getEventsByVenueArtist = (search) => {
    return fetch(`http://localhost:8000/events?approved=True&q=${search}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('ug_token')}`
      }
    }).then(res => res.json())
  }


export const getEventsByCategory = (id) => {
    return fetch(`http://localhost:8000/events?approved=True&category=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

export const getThisWeekEvents = () => {
    return fetch(`http://localhost:8000/events?approved=True&this_week`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("ug_token")}`
        }
    })
        .then(response => response.json())
}

