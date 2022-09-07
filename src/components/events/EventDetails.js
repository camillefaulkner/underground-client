import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteEvent, getSingleEvent } from "../../managers/EventManager"
import { ConvertDate } from "./ConvertDate"
import { ConvertTime } from "./ConvertTime"
import './Event.css'

export const EventDetails = () => {
    const [evt, setEvt] = useState({})
    const { evtId } = useParams()
    const navigate = useNavigate()
    const adminUser = localStorage.getItem('is_staff')

    useEffect(() => {
        getSingleEvent(evtId).then(data => setEvt(data))
    }, [evtId])

    return <>
        <div className="eventDetails">
            {
                evt.image !== null
                    ? <img src={`http://localhost:8000${evt.image}`} style={{ width: '200px' }} />
                    : <></>
            }
            <h3>{evt.name}</h3>
            {
                evt.artists !== []
                    ? <>
                        <p>performers:</p>
                        {
                            evt.artists?.map(a => {
                                return <>{a.name}<br /></>
                            })
                        }
                    </>
                    : <></>
            }
            {
                evt.time
                    ? <p>{ConvertDate(evt.date)} at {ConvertTime(evt.time)}</p>
                    : <></>
            }
            <p>where: {evt.venue?.name}</p>
            <p>address: {evt.venue?.address}</p>
            <br />
            <p>about: {evt.description}</p>
            {
                adminUser === "true"
                    ? <><button onClick={(clickEvent) => {
                        clickEvent.preventDefault()
                        navigate(`/event-edit/${evt.id}`)
                    }}>edit</button>
                        <button onClick={() => {
                            deleteEvent(evtId)
                                .then(() => navigate('/events'))
                        }}>delete show</button></>
                    : <></>
            }
        </div>
    </>
}