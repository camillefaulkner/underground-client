import { useEffect, useState } from "react"
import { Itinerary } from "../itinerary/Itinerary"
import { EventList } from "./EventList"
import './Event.css'

export const EventContainer = () => {
    const adminUser = localStorage.getItem('is_staff')
    const [selectionState, setSelectionState] = useState([])

    return <>
        <div className="eventListContainer">
            <EventList selectionState={selectionState} setSelectionState={setSelectionState} />
            {adminUser === "false"
                ? <Itinerary selectionState={selectionState} setSelectionState={setSelectionState} />
                : <></>
            }
        </div>
    </>
}