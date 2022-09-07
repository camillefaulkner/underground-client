import { useEffect, useState } from "react"
import { deleteSelection, getAllSelectionsByUser } from "../../managers/ItineraryManager"
import { ConvertDate } from "../events/ConvertDate"
import { ConvertTime } from "../events/ConvertTime"
import { EventContainer } from "../events/EventContainer"
import { EventList } from "../events/EventList"
import './Itinerary.css'

export const Itinerary = ({ selectionState, setSelectionState }) => {
    const [events, setEvents] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))

    let todayDate = new Date()
    let earliestDate = todayDate.toISOString().split('T')[0]

    useEffect(
        () => {
            getAllSelectionsByUser(currentUserId).then((showArray) => { setEvents(showArray) })
        }, [selectionState]
    )
    return <>
        <div className="itinerarylist">
            <h3>itinerary</h3>
            {
                events.length !== 0
                    ? <>
                        <h3>saved selections</h3>
                        {
                            events.sort((a, b) => { return new Date(a.event.date) - new Date(b.event.date) }).map(e => {
                                // if (e.event.date >= earliestDate.toString()) {
                                return <>{ConvertDate(e.event.date)} - {e.event.name} - {ConvertTime(e.event.time)} - <button onClick={() => {
                                    deleteSelection(e.id)
                                        .then(() => getAllSelectionsByUser(currentUserId).then((showArray) => { setEvents(showArray) }).then(() => setSelectionState(events)))
                                }}>delete</button><br /></>
                                // }
                            })
                        }
                    </>
                    : <><h3>you havent saved any shows yet!</h3></>
            }
        </div>
    </>
}