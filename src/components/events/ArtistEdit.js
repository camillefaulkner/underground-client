import { useEffect, useState } from "react";
import { getSingleArtist, updateArtist } from "../../managers/ArtistManager";
import { deleteArtist } from "../../managers/EventManager";
import { ArtistForm } from "../requests/ArtistForm";

export const ArtistEdit = ({ artistList, setArtistList, artist, setArtist, artistPreview, setArtistPreview, evtId, fetchCalls }) => {
    const [showArtistForm, setShowArtistForm] = useState(false)
    const [showArtistEdit, setShowArtistEdit] = useState(0)
    const [tempArtist, setTempArtist] = useState({})

    useEffect(
        () => {
            if (showArtistEdit !== 0) {
                getSingleArtist(showArtistEdit).then(setArtist)
            }
        }, [showArtistEdit]
    )


    const createArtistUrlImageString = (event) => {
        getArtistBase64(event.target.files[0], (base64ImageString) => {
            let updateArtist = { ...artist }
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

    const handleArtistChange = (event) => {
        const newArtist = { ...artist }
        newArtist[event.target.name] = event.target.value
        setArtist(newArtist)
    }

    const decideVariable = () => {
        if (showArtistEdit !== 0) {
            return artist
        } else if (tempArtist.length) {
            return tempArtist
        }
    }

    return <>
            {
                artistList.length && showArtistEdit === 0 && showArtistForm === false
                    ? <>
                        <h3>performers:</h3>
                        {artistList.map(al => {
                            return <>
                            <div className="artistlistitem">{al.name}<br /><button onClick={(clickEvent) => {
                                clickEvent.preventDefault()
                                setShowArtistForm(false)
                                if (al.id !== "undefined") {
                                    if (showArtistEdit === 0) {
                                        setShowArtistEdit(al.id)
                                    } else {
                                        setShowArtistEdit(0)
                                    }
                                } else {
                                    setTempArtist(al)
                                }
                            }}>edit</button><button onClick={(clickEvent) => {
                                clickEvent.preventDefault()
                                deleteArtist(evtId, al.id).then(fetchCalls)
                            }}>delete</button></div></>
                        })
                        }
                    </>
                    : <></>
            }
            <br/>
        {
            showArtistEdit === 0 && showArtistForm === false
                ? <button onClick={(clickEvent) => {
                    clickEvent.preventDefault()
                    setShowArtistForm(!showArtistForm)
                }}>add new performer</button>
                : <></>
        }

        {
            showArtistForm === true
                ? <ArtistForm fetchCalls={fetchCalls} setArtistList={setArtistList} artistList={artistList} setArtistForm={setShowArtistForm} evtId={evtId} artistForm={showArtistForm} />
                : <></>
        }

        {
            showArtistEdit !== 0
                ? <>
                    <div className="field">
                        {
                            artistPreview
                                ? <img src={artistPreview} style={{ width: '100px' }} />
                                : <></>
                        }
                        <label htmlFor="title" className="label">name: </label>
                        <div className="control">
                            <input type="text" name="name" required className="input"
                                placeholder="name"
                                value={artist.name}
                                onChange={handleArtistChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="title" className="label">social: </label>
                        <div className="control">
                            <input type="text" name="social" className="input"
                                placeholder="social"
                                value={artist?.social}
                                onChange={handleArtistChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="title" className="label">spotify URI: </label>
                        <div className="control">
                            <input type="text" name="spotify" className="input"
                                placeholder="spotify uri"
                                value={artist?.spotify}
                                onChange={handleArtistChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="image_url" className="label">artist photo: </label>
                        <div className="url-header">
                            <input type="file" id="url_image" onChange={createArtistUrlImageString} />
                            <input type="hidden" name="image" value={artist.image} />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="content" className="label">description: </label>
                        <div className="control">
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    name="description"
                                    value={artist?.description}
                                    onChange={handleArtistChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <button onClick={(clickEvent) => {
                        clickEvent.preventDefault()
                        updateArtist(artist).then(setShowArtistEdit(0))
                    }}>save artist info</button>
                </>
                : <></>
        }

    </>
}