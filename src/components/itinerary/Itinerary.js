import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { deleteSelection, getAllSelectionsByUser } from "../../managers/ItineraryManager"
import { ConvertDate } from "../events/ConvertDate"
import { ConvertTime } from "../events/ConvertTime"
import { EventContainer } from "../events/EventContainer"
import { EventList } from "../events/EventList"
import './Itinerary.css'

export const Itinerary = ({ selectionState, setSelectionState }) => {
    const [events, setEvents] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const navigate = useNavigate()

    let todayDate = new Date()
    let earliestDate = todayDate.toISOString().split('T')[0]

    useEffect(
        () => {
            getAllSelectionsByUser(currentUserId).then((showArray) => { setEvents(showArray) })
        }, [selectionState]
    )
    return <div className="itinerarylist">
            <div className="itinerarylist2">
                <h3>itinerary</h3>
                <hr></hr>
                {
                    events.length !== 0
                        ? <>
                            <h3>saved selections:</h3>
                            {
                                events.sort((a, b) => { return new Date(a.event.date) - new Date(b.event.date) }).map(e => {
                                    return <div className="ititem">{ConvertDate(e.event.date)} - {e.event.name} <br/>
                                        <button className="button-8" onClick={() => {
                                            navigate(`/events/${e.event.id}`)
                                        }}>more details</button>
                                        <button className="button-9" onClick={() => {
                                            deleteSelection(e.id)
                                                .then(() => getAllSelectionsByUser(currentUserId).then((showArray) => {
                                                    setEvents(showArray)
                                                    setSelectionState(showArray)
                                                }))
                                        }}>remove from saved</button><br /></div>
                                })
                            }
                        </>
                        : <><h3>you havent saved any shows yet!</h3></>
                }
            </div>
        </div>
}