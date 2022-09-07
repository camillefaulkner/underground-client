import { useEffect, useState } from "react"
import { ConvertDate } from "../events/ConvertDate"
import { Link } from "react-router-dom"
import { approveEvent, getAllEvents, getPendingEvents } from "../../managers/EventManager"
import { saveNewSelection } from "../../managers/ItineraryManager"
import './Request.css'

export const RequestList = () => {

    const [events, setEvents] = useState([])
    const [showInfo, setShowInfo] = useState(0)

    useEffect(
        () => {
            getPendingEvents().then((evtArray) => { setEvents(evtArray) })
        }, []
    )

    return <>
        <div className="pendingRequestContainer">
            <h3>pending requests:</h3>
            <ul>
                {
                    events.length === 0
                        ? <><h3>there are no pending requests</h3></>
                        : <>{
                            events.sort((a, b) => { return new Date(a.date) - new Date(b.date) }).map(evt => {
                                return <li>
                                    {ConvertDate(evt.date)} <br />
                                    event name: {evt.name} <br />
                                    venue: {evt.venue.name} - {evt.venue.address} <br />
                                    description: {evt.description} <br />
                                    {
                                        evt.artists.length
                                            ? <>performances by: {
                                                evt.artists.map(a => {
                                                    return <li>{a.name} <button onClick={(clickEvent) => {
                                                        clickEvent.preventDefault()
                                                        if (showInfo === 0) {
                                                            setShowInfo(a.id)
                                                        } else {
                                                            setShowInfo(0)
                                                        }
                                                    }}>more info</button>
                                                        {
                                                            a.id === showInfo
                                                                ? <><br />
                                                                    image: <img src={`http://localhost:8000${a.image}`} style={{ width: '100px' }} /><br />
                                                                    social: {a.social}<br />
                                                                    spotify: {a.spotify}<br />
                                                                    description: {a.description} <br />
                                                                </>
                                                                : <></>
                                                        }
                                                    </li>
                                                })
                                            }
                                            </>
                                            : <></>
                                    }
                                    <br /><button onClick={(clickEvent) => {
                                        clickEvent.preventDefault()
                                        approveEvent(evt).then(() => getPendingEvents().then((evtArray) => { setEvents(evtArray) }))
                                    }}>approve</button>
                                </li>
                            })
                        }</>
                }
            </ul>
        </div>
    </>

}