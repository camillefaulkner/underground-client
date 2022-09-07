import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ token, setToken, setStaff }) => {
    const navigate = useNavigate()
    const adminUser = localStorage.getItem('is_staff')

    return (
        <>
            <nav>
                <Link className="navbar-link" to="/events" style={{ textDecoration: 'none' }}>
                    events
                </Link>
                {/* <Link className="navbar-link" to="/map" style={{ textDecoration: 'none' }}>
                    map
                </Link> */}
                {adminUser === "false"
                    ? <Link className="navbar-link" to="/create-request" style={{ textDecoration: 'none' }}>
                        submit your show!
                    </Link>
                    : <></>
                }
                {adminUser === "true"
                    ? <Link className="navbar-link" to="/view-requests" style={{ textDecoration: 'none' }}>
                        view requests
                    </Link>
                    : <></>
                }
                {/* {adminUser === "false"
                    ? <Link className="navbar-link" to="/itinerary" style={{ textDecoration: 'none' }}>
                        itinerary
                    </Link>
                    : <></>
                } */}
                {adminUser === "true"
                    ? <Link className="navbar-link" to="/users" style={{ textDecoration: 'none' }}>
                        users
                    </Link>
                    : <></>
                }
                <button className="button is-outlined" onClick={() => {
                    setToken('')
                    setStaff('')
                    navigate('/login')
                }}>Logout</button>
            </nav>
        </>
    )
}