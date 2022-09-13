import { useNavigate, useParams } from "react-router-dom"
import { deleteEvent, getSingleEvent, updateEvent } from "../../managers/EventManager"
import { useEffect, useState } from "react"
import { VenueEdit } from "./VenueEdit"
import { ArtistEdit } from "./ArtistEdit"
import { getAllCategories } from "../../managers/CategoryManager"
import { saveNewEvent } from "../../managers/EventManager"
import './Event.css'

export const EventEdit = () => {

    const { evtId } = useParams()
    const navigate = useNavigate()
    const [preview, setPreview] = useState()
    const [artistPreview, setArtistPreview] = useState()
    const [evt, setEvt] = useState({})
    const [artist, setArtist] = useState({})
    const [artistList, setArtistList] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const [cat, setCat] = useState([])
    const [venue, setVenue] = useState({})

    const fetchCalls = () => {
        getSingleEvent(evtId).then((evtObj) => {
            setEvt(evtObj)
            setVenue(evtObj.venue)
            setArtistList(evtObj.artists)
        })
    }

    useEffect(
        () => {
            fetchCalls()
            getAllCategories().then((catArray) => { setCat(catArray) })
        }, []
    )

    const createUrlImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            let updateEvent = { ...evt }
            updateEvent.image = base64ImageString
            setEvt(updateEvent)
            setPreview(URL.createObjectURL(event.target.files[0]))
        });
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const dataToBeSaved = {
            venue: { ...venue },
            evt: { ...evt },
            artists: [...artistList] 
        }
        updateEvent(dataToBeSaved).then(() => navigate(`/events/${evtId}`))
    }

    // const handleArtistSubmit = () => {
    //     const evtData = {
    //         ...artist
    //     }
    //     let artistCopy = [...artistList]
    //     artistCopy.push(evtData)
    //     setArtistList(artistCopy)
    //     setArtistForm(false)
    //     setArtist({ image: '' })
    // }

    const handleChange = (event) => {
        const newEvt = { ...evt }
        newEvt[event.target.name] = event.target.value
        setEvt(newEvt)
    }

    return <div>
        <div className="panel-block">

            <div className="eventeditform">
                <form style={{ width: "100%" }}>
                    <div className="editpic">
                        {
                            preview
                                ? <img src={preview} style={{ width: '200px' }} />
                                : <></>
                        }
                        {
                            evt.image !== null && evt.image?.startsWith('/media')
                                ? <img src={`http://localhost:8000${evt.image}`} style={{ width: '200px' }} />
                                : <></>
                        }
                        <div className="field">
                            <label htmlFor="image_url" className="label">choose another event photo: </label>
                            <div className="url-header">
                                <input type="file" id="url_image" onChange={createUrlImageString} />
                                <input type="hidden" name="image" value={evt.id} />
                            </div>
                        </div>
                    </div>
                    <br />

                    <div className="middlerow">
                        <div className="left">
                            <div className="field">
                                <h3>event</h3>
                                <label htmlFor="title" className="label">title: </label>
                                <div className="control">
                                    <input type="text" name="name" required className="input"
                                        placeholder="title"
                                        value={evt.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="field">
                                <label htmlFor="title" className="label">date: </label>
                                <div className="control">
                                    <input type="date" name="date" required className="input"
                                        placeholder="Title"
                                        value={evt.date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="field">
                                <label htmlFor="title" className="label">time of event: </label>
                                <div className="control">
                                    <input type="time" name="time" required className="input"
                                        placeholder="Title"
                                        value={evt.time}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="field">
                                <label htmlFor="content" className="label">event description: </label>
                                <div className="control">
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            name="description"
                                            value={evt.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="middle">
                            <h3>venue</h3>
                            < VenueEdit venue={venue} setVenue={setVenue} cat={cat} setCat={setCat} />
                        </div>

                        <div className="right">
                            <h3>artists</h3>
                            < ArtistEdit artistList={artistList} setArtistList={setArtistList} artist={artist} setArtist={setArtist} artistPreview={artistPreview} setArtistPreview={setArtistPreview} evtId={evtId} fetchCalls={fetchCalls} />
                        </div>
                    </div>

                    <div className="editsave">
                        <div className="control">
                            <button type="submit"
                                onClick={handleSubmit}
                                className="button is-link">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div >



}