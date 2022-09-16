export const loginUser = (user) => {
    return fetch("https://cf-underground.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
  }
  
  export const registerUser = (user) => {
    return fetch("https://cf-underground.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
  }
  