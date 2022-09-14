import { useEffect, useState } from "react"
import { demoteAdmin, getAllUsers, promoteAdmin } from "../../managers/UserManager"
import "./User.css"

export const UserList = () => {
    const [users, setUsers] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))

    useEffect(
        () => {
            getAllUsers().then((userArray) => { setUsers(userArray) })
        }, []
    )

    return <>
        <ul className="usercontainer">
            <h3>users</h3>
            {
                users.map(u => {
                    return <>
                    <li className="userlist">
                        {u.first_name} {u.last_name}
                        {
                            u.is_staff === false && u.id !== currentUserId
                                ? <button className="promotedemote" onClick={(clickEvent) => {
                                    clickEvent.preventDefault()
                                    promoteAdmin(u).then(() => getAllUsers().then((userArray) => { setUsers(userArray) }))
                                }}>promote to admin</button>
                                : <></>
                        }
                        {
                            u.is_staff === true && u.id !== currentUserId
                            ? <button className="promotedemote" onClick={(clickEvent) => {
                                clickEvent.preventDefault()
                                demoteAdmin(u).then(() => getAllUsers().then((userArray) => { setUsers(userArray) }))
                            }}>remove admin privileges</button>
                            : <></>
                        }
                    </li>
                    <br/>
                    </>
                })
            }
        </ul>
    </>
}