import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { NavBar } from "./components/nav/NavBar"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"
import './App.css'

export const Underground = () => {
  const [token, setTokenState] = useState(localStorage.getItem('ug_token'))
  const [userId, setUserIdState] = useState(localStorage.getItem('user_id'))
  const [staff, setStaffState] = useState(localStorage.getItem('is_staff'))

  const setToken = (newToken) => {
    localStorage.setItem('ug_token', newToken)
    setTokenState(newToken)
  }

  const setUserId = (userId) => {
    localStorage.setItem('user_id', userId)
    setUserIdState(userId)
  }

    const setStaff = (staff) => {
    localStorage.setItem('is_staff', staff)
    setStaffState(staff)
  }

  return <div className="underground">
  {
    token
    ?<NavBar token={token} setToken={setToken} setStaff={setStaff}/>
    :<></>
  }
    <ApplicationViews token={token} setToken={setToken} setUserId={setUserId} userId={userId} setStaff={setStaff}/>
  </div>
}
