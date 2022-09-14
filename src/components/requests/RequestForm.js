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
    // const [venueForm, setVenueForm] = useState(true)
    const [venueName, setVenueName] = useState("")
    const [venue, setVenue] = useState({
        private: true,
        user: currentUserId
    })

    const getCategories = () => {
        getAllCategories().then((catArray) => { setCat(catArray) })
    }

    useEffect(
        () => {
            getCategories()
            setArtistForm(false)
            // setVenueForm(false)
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
        if (venue.name === undefined || venue.address === undefined || evt.name === undefined || evt.date === undefined || evt.time === undefined || evt.description === undefined) {
            window.alert("please fill out required fields")
        } else {
            const dataToBeSaved = {
                venue: { ...venue },
                evt: { ...evt },
                artists: [...artistList]
            }
            saveNewEvent(dataToBeSaved)
            navigate("/success-request")
        }
    }

    const handleChange = (event) => {
        const newEvt = { ...evt }
        newEvt[event.target.name] = event.target.value
        setEvt(newEvt)
    }

    return <>
        <div className="divrow">

            <div className="container1">
                <h2 className="panel-heading">request event</h2>
                <h4>may take up to 24 hours for admin to approve. * indicates required fields</h4>
                <hr></hr>
                <h3>what</h3>
                <div className="requestform">
                    <form style={{ width: "100%" }}>
                        {
                            preview
                                ? <img src={preview} style={{ width: '200px' }} />
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
                            <label htmlFor="title" className="label">*title: </label>
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
                            <label htmlFor="title" className="label">*date: </label>
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
                            <label htmlFor="title" className="label">*time of event: </label>
                            <div className="control">
                                <input type="time" name="time" required className="input"
                                    placeholder="Title"
                                    value={evt.time}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br /><br />
                        <div className="field">
                            <label htmlFor="content" className="label">*event description: </label>
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
                    </form>
                </div>
            </div>


            <div className="container2">
                {
                    venueName !== ""
                        ? <>{venueName}<br /></>
                        : <></>
                }

                <VenueForm venue={venue} setVenue={setVenue} cat={cat} setVenueName={setVenueName} getCategories={getCategories} />

            </div>


            <div className="container3">
                <h3>who</h3>
                {
                    artistForm === false
                        ? <>
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
                            <br />
                            <button onClick={(clickEvent) => {
                                clickEvent.preventDefault()
                                setArtistForm(!artistForm)
                            }}>
                                add performer/artist +</button>
                        </>
                        : <><ArtistForm artistList={artistList} setArtistList={setArtistList} artistForm={artistForm} setArtistForm={setArtistForm} /></>
                }
            </div>
        </div>

        {
            venue.name !== undefined && venue.address !== undefined && evt.name !== undefined && evt.date !== undefined && evt.time !== undefined && evt.description !== undefined
                ?
                <div className="container4">
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={handleSubmit}
                                className="rainbow rainbow-1">
                                save
                            </button>

                        </div>
                    </div>
                </div>
                : <div className="container4">
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                disabled={true}
                                className="rainbow">
                                save
                            </button>

                        </div>
                    </div>
                </div>
        }
    </>
}