import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { saveNewEvent } from "../../managers/EventManager"

export const RequestForm = () => {
    const navigate = useNavigate()
    const [preview, setPreview] = useState()
    const [artistPreview, setArtistPreview] = useState()
    const [evt, setEvt] = useState({})
    const [artist, setArtist] = useState({})
    const [artistList, setArtistList] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const [cat, setCat] = useState([])
    const [artistForm, setArtistForm] = useState(false)
    const [venueForm, setVenueForm] = useState(false)
    const [venueName, setVenueName] =useState("")
    const [venue, setVenue] = useState({
        private: false,
        user: currentUserId
    })

    useEffect(
        () => {
            getAllCategories().then((catArray) => { setCat(catArray) })
            setArtistForm(false)
            setVenueForm(false)
        }, []
    )

    const createUrlImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            let updateEvent = {...evt}
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

    const createArtistUrlImageString = (event) => {
        getArtistBase64(event.target.files[0], (base64ImageString) => {
            let updateArtist = {...artist}
            updateArtist.image = base64ImageString
            setArtist(updateArtist)
            setArtistPreview(URL.createObjectURL(event.target.files[0]))
        });
    }

    const getArtistBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const dataToBeSaved = {
            venue: {...venue},
            evt: {...evt},
            artists: [...artistList]
        }
        saveNewEvent(dataToBeSaved)
        navigate("/success-request")
    }

    const handleArtistSubmit = () => {
        const evtData = {
            ...artist
        }
        let artistCopy = [...artistList]
        artistCopy.push(evtData)
        setArtistList(artistCopy)
        setArtistForm(false)
        setArtist({ image: '' })
    }

    const handleChange = (event) => {
        const newEvt = { ...evt }
        newEvt[event.target.name] = event.target.value
        setEvt(newEvt)
    }

    const handleVenueChange = (event) => {
        const newVenue = { ...venue }
        newVenue[event.target.name] = event.target.value
        setVenue(newVenue)
    }

    const handleArtistChange = (event) => {
        const newArtist = { ...artist }
        newArtist[event.target.name] = event.target.value
        setArtist(newArtist)
    }

    return <>
        <h2 className="panel-heading">request event</h2>
        <h3>rules: be cool. give 24 hours for admin to approve.</h3>
        <div className="panel-block">
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
                <br/>
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
                <br/>
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
                <br/>
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
                <br/>
                {
                    venueName !== ""
                    ? <>{venueName}<br/></>
                    :<></>
                }
                <button onClick={(clickEvent) => {
                    clickEvent.preventDefault()
                    setVenueForm(!venueForm)
                }}>venue +</button>
                {
                    venueForm === true
                        ? <><div className="field">
                            <label htmlFor="title" className="label">name: </label>
                            <div className="control">
                                <input type="text" name="name" required className="input"
                                    placeholder="title"
                                    value={venue.name}
                                    onChange={handleVenueChange}
                                />
                            </div>
                        </div>
                            <div className="field">
                                <label htmlFor="title" className="label">address: </label>
                                <div className="control">
                                    <input type="text" name="address" required className="input"
                                        placeholder="title"
                                        value={venue.address}
                                        onChange={handleVenueChange}
                                    />
                                </div>
                            </div>
                            <div className="field" >
                                <div className="control">
                                    <label className="checkbox" htmlFor="private">
                                        <input type="checkbox" name="private"
                                            onChange={() => {
                                                const newVenue = { ...venue }
                                                newVenue.private = !venue.private
                                                setVenue(newVenue)
                                            }} />
                                        dont save this address
                                    </label>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="category_id" className="label">venue type: </label>
                                <div className="control">
                                    <div className="select">
                                        <select name="category"
                                            value={evt.category}
                                            onChange={handleVenueChange}>
                                            <option value="0">Select a category</option>
                                            {
                                                cat.map(c => (
                                                    <option key={c.id} value={c.id}>
                                                        {c.category}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button onClick={(clickEvent) => {
                                clickEvent.preventDefault()
                                setVenueForm(!venueForm)
                                setVenueName(venue.name)
                            }}>save</button><button onClick={(clickEvent) => {
                                clickEvent.preventDefault()
                                setVenueForm(!venueForm)
                            }}>cancel</button>
                        </>
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
                        ? <><div className="field">
                            {
                                preview
                                    ? <img src={artistPreview} style={{ width: '100px' }} />
                                    : <></>
                            }
                            <label htmlFor="title" className="label">name: </label>
                            <div className="control">
                                <input type="text" name="name" required className="input"
                                    placeholder="title"
                                    value={artist.name}
                                    onChange={handleArtistChange}
                                />
                            </div>
                        </div>
                            <div className="field">
                                <label htmlFor="title" className="label">social: </label>
                                <div className="control">
                                    <input type="text" name="social" className="input"
                                        placeholder="title"
                                        value={artist.social}
                                        onChange={handleArtistChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="title" className="label">spotify link: </label>
                                <div className="control">
                                    <input type="text" name="spotify" className="input"
                                        placeholder="title"
                                        value={artist.spotify}
                                        onChange={handleArtistChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="image_url" className="label">artist photo: </label>
                                <div className="url-header">
                                    <input type="file" id="url_image" onChange={createArtistUrlImageString} />
                                    <input type="hidden" name="image" value={evt.id} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="content" className="label">description: </label>
                                <div className="control">
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            name="description"
                                            value={artist.description}
                                            onChange={handleArtistChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <button onClick={(clickEvent) => {
                                clickEvent.preventDefault()
                                handleArtistSubmit()
                                setArtistForm(false)
                            }}>save</button><button onClick={(clickEvent) => {
                                clickEvent.preventDefault()
                                setArtistForm(false)
                            }}>cancel</button></>
                        : <></>
                }
                <br/><br/>
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
                <br/>
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