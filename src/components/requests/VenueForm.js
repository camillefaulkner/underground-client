import { useState } from "react"
import { saveNewCategory } from "../../managers/CategoryManager"

export const VenueForm = ({ venue, setVenue, setVenueName }) => {
    // const [evt, setEvt] = useState({})
    // const [hideCate, setHideCate] = useState(false)
    // const [newCat, setNewCate] = useState({})

    const handleVenueChange = (event) => {
        const newVenue = { ...venue }
        newVenue[event.target.name] = event.target.value
        setVenue(newVenue)
    }


    return <>
        <h3>where</h3>
        <div className="venueform">
            <div className="field">
                <label htmlFor="title" className="label">name: </label>
                <div className="control">
                    <input type="text" name="name" required className="input"
                        placeholder="venue name"
                        value={venue.name}
                        onChange={handleVenueChange}
                    />
                </div>
            </div>
            <div className="field">
                <label htmlFor="title" className="label">address (include street, city, state, and zip): </label>
                <div className="control">
                    <input type="text" name="address" required className="venueaddress"
                        placeholder="address"
                        value={venue.address}
                        onChange={handleVenueChange}
                    />
                </div>
            </div>
            <div className="venueprivate" >
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
            <br /><br />
            <button onClick={(clickEvent) => {
                clickEvent.preventDefault()
                // setVenueForm(!venueForm)
                setVenueName(venue.name)
            }}>save</button>
        </div>
    </>
}