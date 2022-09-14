import { Button, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { saveNewArtist, saveNewArtistConnection } from "../../managers/ArtistManager";

export const ArtistForm = ({ fetchCalls, artistList, setArtistList, artistForm, setArtistForm, evtId = 0 }) => {
    const [preview, setPreview] = useState()
    const [evt, setEvt] = useState({})
    const [artistPreview, setArtistPreview] = useState()
    const [artist, setArtist] = useState({})
    const [open, setOpen] = useState(false)

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

    const handleArtistSubmit = () => {
        if (evtId === 0) {
            const evtData = {
                ...artist
            }
            let artistCopy = [...artistList]
            artistCopy.push(evtData)
            setArtistList(artistCopy)
            setArtistForm(false)
            setArtist({ image: '' })
        } else {
            saveNewArtist(artist).then((data) => {
                saveNewArtistConnection({
                    artist: data.id,
                    event: evtId
                })
            }).then(fetchCalls)
        }
    }


    const handleArtistChange = (event) => {
        const newArtist = { ...artist }
        newArtist[event.target.name] = event.target.value
        setArtist(newArtist)
    }

    return <>
        <div className="artistform">
            <div className="field">
                {
                    artistPreview
                        ? <><img src={artistPreview} style={{ width: '100px' }} /><br /></>
                        : <></>
                }
                <div className="field">
                    <label htmlFor="image_url" className="label">artist photo: </label>
                    <div className="url-header">
                        <input type="file" id="url_image" onChange={createArtistUrlImageString} />
                        <input type="hidden" name="image" value={evt.id} />
                    </div>
                </div>
                <br />
                <label htmlFor="title" className="label">name: </label>
                <div className="control">
                    <input type="text" name="name" required className="input"
                        placeholder="title"
                        value={artist.name}
                        onChange={handleArtistChange}
                    />
                </div>
            </div>
            <br />
            <div className="field">
                <label htmlFor="title" className="label">instagram handle (no @ symbol): </label>
                <div className="control">
                    <input type="text" name="social" className="input"
                        placeholder="insta_handle"
                        value={artist.social}
                        onChange={handleArtistChange}
                    />
                </div>
            </div>
            <br />
            <div className="field">
                <label htmlFor="title" className="label">spotify uri: </label>
                <button onClick={(clickEvent) => {
                    clickEvent.preventDefault()
                    window.alert(`this field allows users to preview a clip of your stuff (as long as it exists on spotify)! this isn't a required field but is a fun one. \n\nhow to find your uri:\n1. go to spotify (on your computer) and find the absolute banger you'd like to share\n2. hover over the track and click those three dots ... all the way to the right\n3. click Share, then Embed Track\n4. you'll get a pop-up (i promise we're almost done),\n click Show Code at the bottom\n5. within all that mumbojumbo find src= and copy everything within the quotation marks ""\n6. slap that link in the form!\nyour uri should start with 'https' and end with 'generator'`)
                }}>whats this?</button>
                <div className="control">
                    <input type="text" name="spotify" className="input"
                        placeholder="uri link"
                        value={artist.spotify}
                        onChange={handleArtistChange}
                    />
                </div>
            </div>
            <br />
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
            <button className="button-8" onClick={(clickEvent) => {
                clickEvent.preventDefault()
                handleArtistSubmit()
                setArtistForm(false)
            }}>add</button><button className="button-9" onClick={(clickEvent) => {
                clickEvent.preventDefault()
                setArtistForm(false)
            }}>cancel</button>
        </div>
    </>
}