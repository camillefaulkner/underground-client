import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getSpotify } from "../../managers/APIManager"
import { getAllCategories } from "../../managers/CategoryManager"
import { ConvertDate } from "./ConvertDate"
import { getApprovedEvents, getEventsByCategory, getEventsByVenueArtist, getThisWeekEvents } from "../../managers/EventManager"
import { getAllSelectionsByUser, saveNewSelection } from "../../managers/ItineraryManager"
import './Event.css'
import { Map } from "../map/Map"

export const EventList = ({ selectionState, setSelectionState }) => {
    const [events, setEvents] = useState([])
    const [showMap, setShowMap] = useState(false)
    const [selections, setSelections] = useState([])
    const [filteredEvents, setFiltered] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const adminUser = localStorage.getItem('is_staff')
    const navigate = useNavigate()
    const [cat, setCat] = useState([])
    const [chosenCategory, setChosenCategory] = useState(0)

    useEffect(
        () => {
            getApprovedEvents().then((evtArray) => { setEvents(evtArray) })
            getAllSelectionsByUser(currentUserId).then((selectionArray) => { setSelections(selectionArray) })
            getAllCategories().then((catArray) => { setCat(catArray) })
        }, [selectionState]
    )

    useEffect(
        () => {
            if (searchTerms !== "") {
                getEventsByVenueArtist(searchTerms).then(data => setFiltered(data))
            }
            else {
                setFiltered(events)
            }
        },
        [searchTerms, events]
    )

    useEffect(
        () => {
            if (chosenCategory === 0) {
                setFiltered(events)
            }
            else {
                getEventsByCategory(chosenCategory)
                    .then((data) => {
                        setFiltered(data)
                    })
            }
        },
        [chosenCategory, events]
    )

    return <>
        <div>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="search by venue or artist or event name ..."
                    onChange={
                        (changeEvent) => {
                            let search = changeEvent.target.value
                            setSearchTerms(search)
                        }
                    }
                />
            </div>
            <select className="categoryFilter" onChange={(event) => {
                let chosenCategory = event.target.value
                setChosenCategory(parseInt(chosenCategory))
            }}>
                <option value="0">Search by Category...</option>
                {cat.map(category => {
                    return <option value={`${category.id}`}>{category.category}</option>
                })}
            </select><br />
            <button onClick={(clickEvent) => {
                getThisWeekEvents().then((evtArray) => { setFiltered(evtArray) })
            }}>view just week's worth</button>
            <button onClick={(clickEvent) => {
                getApprovedEvents().then((evtArray) => { setFiltered(evtArray) })
                setShowMap(false)
            }}>all events</button>
            <button onClick={(clickEvent) => {
                setShowMap(!showMap)
            }}>map view</button>
            {
                showMap === false
                    ?
                    <ul>
                        {
                            filteredEvents.sort((a, b) => { return new Date(a.date) - new Date(b.date) }).map(evt => {
                                return <li className="eventCard" draggable="true">
                                    {
                                        evt.image !== null
                                            ? <img src={`http://localhost:8000${evt.image}`} style={{ width: '200px' }} />
                                            : <></>
                                    }
                                    <Link to={`/events/${evt.id}`}> {ConvertDate(evt.date)} - {evt.name} - {evt.venue.name}</Link>
                                    {
                                        adminUser === "false"
                                            ? <>
                                                {
                                                    selections.length === 0 || selections.filter(s => s.event.id === evt.id).length === 0
                                                        ? <button onClick={(clickEvent) => {
                                                            clickEvent.preventDefault()
                                                            saveNewSelection({
                                                                event: evt.id,
                                                                user: currentUserId
                                                            }).then(() => getAllSelectionsByUser(currentUserId).then((selectionArray) => { setSelections(selectionArray) }).then(() => setSelectionState(selections)))
                                                        }}>add</button>
                                                        : <>
                                                        </>
                                                }
                                            </>
                                            : <></>
                                    }
                                </li>
                            })
                        }
                    </ul>
                    : <> < Map adminUser={adminUser} selections={selections} saveNewSelection={saveNewSelection} currentUserId={currentUserId} setSelectionState={setSelectionState} setSelections={setSelections} getAllSelectionsByUser={getAllSelectionsByUser}/></>
            }
        </div>
    </>
}