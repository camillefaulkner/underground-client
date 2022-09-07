import { useState } from "react"
import { saveNewCategory } from "../../managers/CategoryManager"

export const VenueForm = ({ venue, setVenue, cat, setVenueName, venueForm, setVenueForm, getCategories }) => {
    const [evt, setEvt] = useState({})
    const [allVenueNames, setAllVenueName] = useState(["venueone", "venuetwo"])
    const [hideCate, setHideCate] = useState(false)
    const [newCat, setNewCate] = useState({})

    const handleVenueChange = (event) => {
        const newVenue = { ...venue }
        newVenue[event.target.name] = event.target.value
        setVenue(newVenue)
    }

    // const handleNewCate = (event) => {
    //     const newCat = { ...venue }
    //     newCat[event.target.name] = event.target.value
    //     setNewCate(newCat)
    // }

    return <>
        <div className="venueform">
            <div className="field">
                <label htmlFor="title" className="label">name: </label>
                <div className="control">
                    <input type="text" name="name" required className="input"
                        placeholder="name"
                        value={venue.name}
                        onChange={handleVenueChange}
                    />
                </div>
                {/* <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    name="name"
                                    options={allVenueNames}
                                    onChange={handleVenueChange}
                                    value={venue.name}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="name" />}
                                /> */}
            </div>
            <div className="field">
                <label htmlFor="title" className="label">address (include street, city, state, and zip): </label>
                <div className="control">
                    <input type="text" name="address" required className="input"
                        placeholder="address"
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
                    {
                        hideCate === false
                            ? < div className="select">
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
                            : <></>
                    }
                    <button onClick={(clickEvent) => {
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
                                            placeholder="name"
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
                                        saveNewCategory(newCat).then(()=> getCategories())
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
            <br /><br />
            <button onClick={(clickEvent) => {
                clickEvent.preventDefault()
                setVenueForm(!venueForm)
                setVenueName(venue.name)
            }}>save</button><button onClick={(clickEvent) => {
                clickEvent.preventDefault()
                setVenueForm(!venueForm)
            }}>cancel</button>
        </div>
    </>
}