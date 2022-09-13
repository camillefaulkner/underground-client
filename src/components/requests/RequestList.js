import { useEffect, useState } from "react"
import { ConvertDate } from "../events/ConvertDate"
import { Link } from "react-router-dom"
import { approveEvent, getAllEvents, getPendingEvents } from "../../managers/EventManager"
import { saveNewSelection } from "../../managers/ItineraryManager"
import './Request.css'
import { getAllCategories, saveNewCategory } from "../../managers/CategoryManager"
import { assignCategory } from "../../managers/VenueManager"

export const RequestList = () => {
    const [venue, setVenue] = useState({})
    const [hideCate, setHideCate] = useState(false)
    const [newCat, setNewCate] = useState({})
    const [cat, setCat] = useState([])
    const [events, setEvents] = useState([])
    const [showInfo, setShowInfo] = useState(0)

    const getCategories = () => {
        getAllCategories().then((catArray) => { setCat(catArray) })
    }

    useEffect(
        () => {
            getPendingEvents().then((evtArray) => { setEvents(evtArray) })
            getCategories()
        }, []
    )

    const handleVenueChange = (event) => {
        // const newVenue = { ...venue }
        // newVenue[event.target.name] = event.target.value
        setVenue(event.target.value)
    }

    return <>
        <div className="pendingRequestContainer">
            <h3>pending requests:</h3>
            <ul>
                {
                    events.length === 0
                        ? <><h3>there are no pending requests</h3></>
                        : <>{
                            events.sort((a, b) => { return new Date(a.date) - new Date(b.date) }).map(evt => {
                                return <li className="pendingrequestitem">
                                    {
                                        evt.image !== null
                                            ? <><img className="pendingrequestimg" src={`http://localhost:8000${evt.image}`} style={{ width: '200px' }} /><br /></>
                                            : <></>
                                    }
                                    <b>{ConvertDate(evt.date)}</b> <br />
                                    event name: <b>{evt.name}</b> <br />
                                    venue: <b>{evt.venue.name} - {evt.venue.address} </b><br />
                                    description: <b>{evt.description}</b> <br />
                                    {
                                        evt.artists.length
                                            ? <>performances by: {
                                                evt.artists.map(a => {
                                                    return <li className="requestartistlist"><b>{a.name}</b> <button onClick={(clickEvent) => {
                                                        clickEvent.preventDefault()
                                                        if (showInfo === 0) {
                                                            setShowInfo(a.id)
                                                        } else {
                                                            setShowInfo(0)
                                                        }
                                                    }}>more info</button>
                                                        {
                                                            a.id === showInfo
                                                                ? <div className="requestartistinfo"><br />
                                                                    {
                                                                        a.image !== null
                                                                            ? <>image: <img src={`http://localhost:8000${a.image}`} style={{ width: '100px' }} /><br /></>
                                                                            : <>image: <b>no image submitted</b><br /></>
                                                                    }
                                                                    {
                                                                        a.social !== null
                                                                            ? <>social: <b>{a.social}</b><br /></>
                                                                            : <>social: <b>no social submitted</b><br /></>
                                                                    }
                                                                    {
                                                                        a.spotify !== null
                                                                            ? <>spotify preview: <iframe src={`${a.spotify}`} width="425" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" /><br /></>
                                                                            : <>spotify preview: <b>no link submitted</b><br /></>
                                                                    }
                                                                    artist description: <b>{a.description}</b> <br />
                                                                </div>
                                                                : <></>
                                                        }
                                                    </li>
                                                })
                                            }
                                            </>
                                            : <></>
                                    }
                                    <br />
                                    <div className="categoryrow">
                                        <label htmlFor="category_id" className="label">event category: </label>
                                        <div className="categoryrow2">
                                            {
                                                hideCate === false
                                                    ? <div className="selectcategory">
                                                        <select name="category"
                                                            value={evt.category}
                                                            onChange={handleVenueChange}>
                                                            <option value="0">select  a category</option>
                                                            {
                                                                cat.map(c => (
                                                                    <option key={c.id} value={c.id}>
                                                                        {c.category}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    : <></>
                                            }
                                            <button className="newcategory" onClick={(clickEvent) => {
                                                clickEvent.preventDefault()
                                                setHideCate(!hideCate)
                                            }}>new category</button>
                                            {
                                                hideCate === true
                                                    ? <>
                                                        <div className="field">
                                                            <label htmlFor="title" className="label">category: </label>
                                                            <div className="control">
                                                                <input type="text" name="category" className="input"
                                                                    placeholder="category"
                                                                    value={venue.category}
                                                                    onChange={(event) => {
                                                                        const newCate = { ...newCat }
                                                                        newCate[event.target.name] = event.target.value
                                                                        setNewCate(newCate)
                                                                    }}
                                                                />
                                                            </div>
                                                            <button onClick={(clickEvent) => {
                                                                clickEvent.preventDefault()
                                                                saveNewCategory(newCat).then(() => getCategories())
                                                                setHideCate(!hideCate)
                                                            }}>submit</button><button onClick={(clickEvent) => {
                                                                clickEvent.preventDefault()
                                                                setHideCate(!hideCate)
                                                            }}>cancel</button>
                                                        </div>
                                                    </>
                                                    : <></>
                                            }
                                        </div>
                                    </div>
                                    <button className="approvebutton" onClick={(clickEvent) => {
                                        clickEvent.preventDefault()
                                        const newVenue = { ...evt.venue }
                                        newVenue.category = parseInt(venue)
                                        assignCategory(newVenue).then(() => approveEvent(evt).then(() => getPendingEvents().then((evtArray) => { setEvents(evtArray) })))
                                    }}>approve</button>
                                </li>
                            })
                        }</>
                }
            </ul>
        </div>
    </>

}