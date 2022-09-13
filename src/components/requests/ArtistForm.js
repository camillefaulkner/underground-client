import { useState } from "react";
import { saveNewArtist, saveNewArtistConnection } from "../../managers/ArtistManager";

export const ArtistForm = ({ fetchCalls, artistList, setArtistList, artistForm, setArtistForm, evtId = 0 }) => {
    const [preview, setPreview] = useState()
    const [evt, setEvt] = useState({})
    const [artistPreview, setArtistPreview] = useState()
    const [artist, setArtist] = useState({})

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
                <label htmlFor="title" className="label">instagram handle (no@): </label>
                <div className="control">
                    <input type="text" name="social" className="input"
                        placeholder="insta_handle"
                        value={artist.social}
                        onChange={handleArtistChange}
                    />
                </div>
            </div>
            <div className="field">
                <label htmlFor="title" className="label">spotify uri: </label>
                <div className="control">
                    <input type="text" name="spotify" className="input"
                        placeholder="uri link"
                        value={artist.spotify}
                        onChange={handleArtistChange}
                    />
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
            }}>cancel</button>
        </div>
    </>
}