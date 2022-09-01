import { useEffect, useState } from "react"
import { getAllUsers } from "../../managers/UserManager"

export const UserList = () => {
    const [users, setUsers] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))

    useEffect(
        () => {
            getAllUsers().then((userArray) => {setUsers(userArray)})
        }, []
    )

    return <>
    <ul>
    {
        users.map(u => {
            return <li>
                {u.first_name} {u.last_name}
                </li>
        })
    }
    </ul>
    </>
}