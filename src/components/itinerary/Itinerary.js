import { useEffect, useState } from "react"
import { deleteSelection, getAllSelectionsByUser } from "../../managers/ItineraryManager"

export const Itinerary = () => {
    const [events, setEvents] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))

    useEffect(
        () => {
            getAllSelectionsByUser(currentUserId).then((showArray) => { setEvents(showArray) })
        }, []
    )
    return <>
        {
            events.length !== 0
                ? <>
                    <h3>saved selections</h3>
                    {
                        events.map(e => {
                            return <>{e.event.date} - {e.event.name} - {e.event.time} - <button onClick={() => {
                                deleteSelection(e.id)
                                    .then(() => getAllSelectionsByUser(currentUserId).then((showArray) => { setEvents(showArray) }))
                            }}>delete</button><br /></>
                        })
                    }
                </>
                : <><h3>you havent saved any shows yet!</h3></>
        }
    </>
}