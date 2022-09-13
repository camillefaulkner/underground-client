import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteEvent, getSingleEvent } from "../../managers/EventManager"
import { ConvertDate } from "./ConvertDate"
import { ConvertTime } from "./ConvertTime"
import { getAllSelectionsByUser, saveNewSelection } from "../../managers/ItineraryManager"
import './Event.css'
import { Visual } from "../music/Visual"

export const EventDetails = () => {
    const [evt, setEvt] = useState({})
    const [showMusic, setShowMusic] = useState(0)
    const [selections, setSelections] = useState([])
    const { evtId } = useParams()
    const navigate = useNavigate()
    const adminUser = localStorage.getItem('is_staff')
    const currentUserId = parseInt(localStorage.getItem('user_id'))

    useEffect(() => {
        getSingleEvent(evtId).then(data => setEvt(data))
        getAllSelectionsByUser(currentUserId).then((selectionArray) => { setSelections(selectionArray) })
    }, [evtId])

    return <>
        <div className="eventdetailscontainer">
            <div className="eventDetails">
                <button onClick={() => {
                    navigate('/events')
                }}>back</button>
                {
                    evt.image !== null
                        ? <img src={`http://localhost:8000${evt.image}`} style={{ width: '200px' }} />
                        : <></>
                }
                <h3>{evt.name}</h3>
                <hr></hr>
                {
                    evt.artists !== []
                        ? <>
                            <p>performers:</p>
                            {
                                evt.artists?.map(a => {
                                    return <>{a.name}
                                        <button className="checkemout" onClick={() => {
                                            if (showMusic === 0) {
                                                setShowMusic(a.id)
                                            } else {
                                                setShowMusic(0)
                                            }
                                        }}>check em out</button>
                                        {
                                            showMusic === a.id
                                                ? <><br />
                                                    {
                                                        a.spotify !== null
                                                            ? <iframe src={`${a.spotify}`} width="425" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
                                                            : <></>
                                                    }
                                                    <><br />about: {a.description}</>
                                                    {
                                                        a.social !== null
                                                            ? <a href={`https://www.instagram.com/${a.social}/`}><br />@{a.social}</a>
                                                            : <></>
                                                    }
                                                </>
                                                : <></>
                                        }
                                        <br /></>
                                })
                            }
                        </>
                        : <></>
                }
                <hr></hr>
                {
                    evt.time
                        ? <p>{ConvertDate(evt.date)} at {ConvertTime(evt.time)}</p>
                        : <></>
                }
                <p>where: {evt.venue?.name}</p>
                <p>address: {evt.venue?.address}</p>
                <hr></hr>
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
                        : <>
                            {selections.length === 0 || selections.filter(s => s.event.id === evt.id).length === 0
                                ? <button onClick={(clickEvent) => {
                                    clickEvent.preventDefault()
                                    saveNewSelection({
                                        event: evt.id,
                                        user: currentUserId
                                    }).then(() => getAllSelectionsByUser(currentUserId).then((selectionArray) => { setSelections(selectionArray) }).then(() => navigate('/events')))
                                }}>add to list</button>
                                : <></>
                            }

                        </>
                }
            </div>
            {/* <div className="viz">
            music visual
            <Visual/>
        </div> */}
        </div>
    </>
}