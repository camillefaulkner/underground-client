import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getSpotify } from "../../managers/APIManager"
import { getAllCategories } from "../../managers/CategoryManager"
import { ConvertDate } from "./ConvertDate"
import { getApprovedEvents, getEventsByCategory, getEventsByVenueArtist, getThisWeekEvents } from "../../managers/EventManager"
import { getAllSelectionsByUser, saveNewSelection } from "../../managers/ItineraryManager"
import './Event.css'
import { Map } from "../map/Map"
import { ConvertTime } from "./ConvertTime"

export const EventList = ({ selectionState, setSelectionState }) => {
    const [events, setEvents] = useState([])
    const [dateList, setDateList] = useState([])
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
            getApprovedEvents().then((evtArray) => {
                setEvents(evtArray)
            })
            getAllSelectionsByUser(currentUserId).then((selectionArray) => { setSelectionState(selectionArray) })
            getAllCategories().then((catArray) => { setCat(catArray) })
        }, []
    )

    useEffect(
        () => {
            let dateSet = new Set()
            filteredEvents.map(e => {
                dateSet.add(e.date)
            })
            let sortedDates = Array.from(dateSet).sort((a, b) => { return new Date(a) - new Date(b) })
            setDateList(sortedDates)
        }, [filteredEvents]
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

    return <div style={{ background: showMap ? "none" : "#82b9e8" }} className="eventlistblob">
        <div style={{ background: showMap ? "none" : "#a4bfea" }} className="eventlistblob2">
            {
                showMap === false
                    ? <>
                        <div className="eventlistsearchrow">
                            <div >
                                <input
                                    className="searchBar"
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
                            </select>
                            <button className="clearfilters button-8" onClick={(clickEvent) => {
                                getApprovedEvents().then((evtArray) => {
                                    setFiltered(evtArray)
                                })
                            }}>clear filters</button>
                            <br />
                        </div>
                        <button className="eventsbutton button-8" onClick={(clickEvent) => {
                            getThisWeekEvents().then((evtArray) => { setFiltered(evtArray) })
                        }}>view just week's worth</button>
                        <button className="eventsbutton button-8" onClick={(clickEvent) => {
                            getApprovedEvents().then((evtArray) => { setFiltered(evtArray) })
                        }}>all events</button>
                    </>
                    : <button className="button-8" onClick={(clickEvent) => {
                        setShowMap(false)
                    }}>event list </button>

            }
            <button className="button-8" onClick={(clickEvent) => {
                setShowMap(!showMap)
            }}>map view</button>
            {
                showMap === false
                    ?
                    <ul>
                        {
                            dateList.map(d => {
                                return <>{ConvertDate(d)}<br />
                                    {
                                        filteredEvents.map(evt => {
                                            if (evt.date === d) {
                                                return <div className="container">
                                                    <div className="product">
                                                        <div className="content">

                                                            <li className="eventCard" draggable="true">
                                                                <Link to={`/events/${evt.id}`} style={{ textDecoration: 'none' }}> {evt.name} <br /> {evt.venue.name} {ConvertTime(evt.time)}</Link>
                                                                {
                                                                    adminUser === "false"
                                                                        ? <>
                                                                            {
                                                                                selectionState.length === 0 || selectionState.filter(s => s.event.id === evt.id).length === 0
                                                                                    ? <button className="button-8" onClick={(clickEvent) => {
                                                                                        clickEvent.preventDefault()
                                                                                        saveNewSelection({
                                                                                            event: evt.id,
                                                                                            user: currentUserId
                                                                                        }).then(() => getAllSelectionsByUser(currentUserId).then((selectionArray) => {
                                                                                            setSelections(selectionArray)
                                                                                            setSelectionState(selectionArray)
                                                                                        }))
                                                                                    }}>add to my list</button>
                                                                                    : <>
                                                                                    </>
                                                                            }
                                                                        </>
                                                                        : <></>
                                                                }
                                                            </li>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })
                                    }
                                </>
                            })
                        }

                    </ul>
                    : <> < Map adminUser={adminUser} selections={selectionState} saveNewSelection={saveNewSelection} currentUserId={currentUserId} selectionState={selectionState} setSelectionState={setSelectionState} setSelections={setSelectionState} getAllSelectionsByUser={getAllSelectionsByUser} /></>
            }
        </div>
    </div>
}