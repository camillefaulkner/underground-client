import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { saveNewEvent } from "../../managers/EventManager"
import { ArtistForm } from "./ArtistForm"
import './Request.css'
import { VenueForm } from "./VenueForm"

export const RequestForm = () => {
    const navigate = useNavigate()
    const [preview, setPreview] = useState()
    const [evt, setEvt] = useState({})
    const [artistList, setArtistList] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const [cat, setCat] = useState([])
    const [artistForm, setArtistForm] = useState(false)
    const [venueForm, setVenueForm] = useState(false)
    const [venueName, setVenueName] = useState("")
    const [venue, setVenue] = useState({
        private: false,
        user: currentUserId
    })

    const getCategories = () => {
        getAllCategories().then((catArray) => { setCat(catArray) })
    }

    useEffect(
        () => {
            getCategories()
            setArtistForm(false)
            setVenueForm(false)
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
        saveNewEvent(dataToBeSaved)
        navigate("/success-request")
    }

    const handleChange = (event) => {
        const newEvt = { ...evt }
        newEvt[event.target.name] = event.target.value
        setEvt(newEvt)
    }

    return <>
        <h2 className="panel-heading">request event</h2>
        <h3>rules: be cool. give 24 hours for admin to approve.</h3>
        <div className="requestform">
            <form style={{ width: "100%" }}>
                {
                    preview
                        ? <img src={preview} style={{ width: '100px' }} />
                        : <></>
                }
                <div className="field">
                    <label htmlFor="image_url" className="label">upload event photo: </label>
                    <div className="url-header">
                        <input type="file" id="url_image" onChange={createUrlImageString} />
                        <input type="hidden" name="image" value={evt.id} />
                    </div>
                </div>
                <br />
                <div className="field">
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
                {
                    venueName !== ""
                        ? <>{venueName}<br /></>
                        : <></>
                }
                <button onClick={(clickEvent) => {
                    clickEvent.preventDefault()
                    setVenueForm(!venueForm)
                }}>add the venue +</button>
                {
                    venueForm === true
                        ? <><VenueForm venue={venue} setVenue={setVenue} cat={cat} setVenueName={setVenueName} venueForm={venueForm} setVenueForm={setVenueForm} getCategories={getCategories}/></>
                        : <></>
                }

                <ul>
                    {
                        artistList.length
                            ?
                            <>
                                <h3>performers:</h3>
                                {artistList.map(al => {
                                    return <>{al.name}<br /></>
                                })
                                }
                            </>
                            : <></>
                    }
                </ul>
                <button onClick={(clickEvent) => {
                    clickEvent.preventDefault()
                    setArtistForm(!artistForm)
                }}>
                    add performer/artist +</button>
                {
                    artistForm === true
                        ? <>
                            <ArtistForm artistList={artistList} setArtistList={setArtistList} artistForm={artistForm} setArtistForm={setArtistForm} />
                        </>
                        : <></>
                }
                <br /><br />
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
                <br />
                <div className="field">
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
    </>
}