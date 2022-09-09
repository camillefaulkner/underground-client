import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ token, setToken, setStaff }) => {
    const navigate = useNavigate()
    const adminUser = localStorage.getItem('is_staff')

    return (
        <>
            <div className='top'>

                <nav className='nav'>
                    <Link className="navbar-link" id="eventnav" to="/events" style={{ textDecoration: 'none' }}>
                        events
                    </Link>
                    {adminUser === "false"
                        ? <Link className="navbar-link" id="submitnav" to="/create-request" style={{ textDecoration: 'none' }}>
                            submit your show!
                        </Link>
                        : <></>
                    }
                    {adminUser === "true"
                        ? <Link className="navbar-link" id="requestnav" to="/view-requests" style={{ textDecoration: 'none' }}>
                            view requests
                        </Link>
                        : <></>
                    }
                    {adminUser === "true"
                        ? <Link className="navbar-link" id="usernav" to="/users" style={{ textDecoration: 'none' }}>
                            users
                        </Link>
                        : <></>
                    }
                    <Link className="navbar-link" id="logoutnav" to="/login" style={{ textDecoration: 'none' }} onClick={() => {
                        setToken('')
                        setStaff('')
                        localStorage.clear()
                    }}>logout</Link>
                </nav>
            </div>
        </>
    )
}