import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteEvent, getSingleEvent } from "../../managers/EventManager"

export const EventDetails = () => {
    const [evt, setEvt] = useState({})
    const { evtId } = useParams()
    const navigate = useNavigate()
    const adminUser = localStorage.getItem('is_staff')

    useEffect(() => {
        getSingleEvent(evtId).then(data => setEvt(data))
    }, [evtId])

    return <>
        {
            evt.image !== null
            ? <img src={`http://localhost:8000${evt.image}`} style={{ width: '200px' }}/>
            : <></>
        }
        <h3>{evt.name}</h3>
        {
            evt.artists !== []
                ? <>
                    {
                        evt.artists?.map(a => {
                            return <>{a.name}<br /></>
                        })
                    }
                </>
                : <></>
        }
        <p>{evt.date} at {evt.time}</p>
        <p>{evt.venue?.name}</p>
        <p>{evt.venue?.address}</p>
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
    </>
}