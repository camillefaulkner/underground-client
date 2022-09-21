import { useEffect, useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { deleteSelection, getAllSelectionsByUser } from "../../managers/ItineraryManager"
import { ConvertDate } from "../events/ConvertDate"
import { ConvertTime } from "../events/ConvertTime"
import { EventContainer } from "../events/EventContainer"
import { EventList } from "../events/EventList"
import { useReactToPrint } from 'react-to-print'
import './Itinerary.css'

export const Itinerary = ({ selectionState, setSelectionState }) => {
    const [events, setEvents] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const navigate = useNavigate()
    const [showPDF, showPDFformat] = useState(false)

    let todayDate = new Date()
    let earliestDate = todayDate.toISOString().split('T')[0]

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    useEffect(
        () => {
            getAllSelectionsByUser(currentUserId).then((showArray) => { setEvents(showArray) })
        }, [selectionState]
    )


    return <div className="itinerarylist">
        <div className="itinerarylist2">
            {
                showPDF === false
                    ? <><h3>itinerary</h3>
                        <hr></hr>
                        {
                            events.length !== 0
                                ? <div>
                                    <div ref={componentRef}>
                                        <h3>saved selections:</h3>
                                        {
                                            events.sort((a, b) => { return new Date(a.event.date) - new Date(b.event.date) }).map(e => {
                                                return <div className="ititem">{ConvertDate(e.event.date)} - {e.event.name} <br />
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
                                    </div>
                                    <button className="button-8" onClick={() => {
                                        showPDFformat(true)
                                    }}>show as pdf!</button>
                                </div>
                                : <><h3>you havent saved any shows yet!</h3></>
                        }</>
                    : <>
                        <div ref={componentRef} >
                            <div className="pdf">
                                <h3>itinerary</h3>
                                {
                                    events.sort((a, b) => { return new Date(a.event.date) - new Date(b.event.date) }).map(e => {
                                        return <div>{ConvertDate(e.event.date)} - {e.event.name} <br />
                                            {e.event.venue.name} - {e.event.venue.address} <br />
                                            {ConvertTime(e.event.time)} <br /><br />
                                        </div>
                                    })
                                }
                            </div>
                        </div >
                        <button className="button-8" onClick={handlePrint}>save as pdf</button><button className="button-9" onClick={() => {
                            showPDFformat(false)
                        }}>nevermind</button>
                    </>
            }
        </div>
    </div>
}

