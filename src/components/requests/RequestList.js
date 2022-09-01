import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllEvents, getPendingEvents, updateEvent } from "../../managers/EventManager"
import { saveNewSelection } from "../../managers/ItineraryManager"

export const RequestList = () => {

    const [events, setEvents] = useState([])

    useEffect(
        () => {
            getPendingEvents().then((evtArray) => { setEvents(evtArray) })
        }, []
    )

    return <>
        <ul>
            {
                events.length === 0
                    ? <><h3>there are no pending requests</h3></>
                    : <>{
                        events.map(evt => {
                            return <li>
                                {evt.date} - {evt.name} - {evt.venue.name} <button onClick={(clickEvent) => {
                                    clickEvent.preventDefault()
                                    let newEvent = { ...evt }
                                    newEvent.approved = true
                                    updateEvent(newEvent).then(() => getPendingEvents().then((evtArray) => { setEvents(evtArray) }))
                                }}>approve</button>
                            </li>
                        })
                    }</>
            }
        </ul>
    </>

}