import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getApprovedEvents } from "../../managers/EventManager"
import { getAllSelectionsByUser, saveNewSelection } from "../../managers/ItineraryManager"

export const EventList = () => {
    const [events, setEvents] = useState([])
    const [selections, setSelections] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const adminUser = localStorage.getItem('is_staff')
    const navigate = useNavigate()

    useEffect(
        () => {
            getApprovedEvents().then((evtArray) => { setEvents(evtArray) })
            getAllSelectionsByUser(currentUserId).then((selectionArray) => { setSelections(selectionArray) })
        }, []
    )

    return <>
        <ul>
            {
                events.map(evt => {
                    return <li>
                        {
                            evt.image !== null
                                ? <img src={`http://localhost:8000${evt.image}`} style={{ width: '200px' }} />
                                : <></>
                        }
                        <Link to={`/events/${evt.id}`}>{evt.date} - {evt.name} - {evt.venue.name}</Link>
                        {
                            adminUser === "false"
                                ? <>
                                    {
                                        selections.length === 0 || selections.filter(s=>s.event.id === evt.id).length === 0
                                            ? <button onClick={(clickEvent) => {
                                                clickEvent.preventDefault()
                                                saveNewSelection({
                                                    event: evt,
                                                    user: currentUserId
                                                }).then(() => getAllSelectionsByUser(currentUserId).then((selectionArray) => { setSelections(selectionArray) }))
                                            }}>add</button>
                                            : <>
                                            </>
                                    }
                                </>
                                : <></>
                        }
                    </li>
                })
            }
        </ul>
    </>
}