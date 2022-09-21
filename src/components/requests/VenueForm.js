import { saveNewCategory } from "../../managers/CategoryManager"
import { getAllVenues, getVenuesBySearch } from "../../managers/VenueManager"
import { useEffect, useState } from "react"
import * as React from 'react';


export const VenueForm = ({ venue, setVenue, setVenueName }) => {
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredVenues, setFiltered] = useState([])
    const [venueForm, setVenueForm] = useState(false)
    const [chosenVenue, setChosenVenue] = useState()
    // const [evt, setEvt] = useState({})
    // const [hideCate, setHideCate] = useState(false)
    // const [newCat, setNewCate] = useState({})
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(
        () => {
            getAllVenues().then((evtArray) => { setOptions(evtArray) })
        }, []
    )

    useEffect(
        () => {
            if (searchTerms !== "") {
                getVenuesBySearch(searchTerms).then(data => setFiltered(data))
            }
            else {
                setFiltered(options)
            }
        },
        [searchTerms, options]
    )

    const handleVenueChange = (event) => {
        const newVenue = { ...venue }
        newVenue[event.target.name] = event.target.value
        setVenue(newVenue)
    }



    return <>
        <h3>where</h3>
        {
            chosenVenue || venueForm === true
                ? <></>
                : <>
                    <div>
                        <input
                            className="searchBar"
                            type="text"
                            placeholder="search to see if we already have your venue ..."
                            onChange={
                                (changeEvent) => {
                                    let search = changeEvent.target.value
                                    setSearchTerms(search)
                                }
                            }
                        />
                    </div>
                    {
                        searchTerms.length
                            ? <>{
                                filteredVenues.map(f => {
                                    return <li>{f.name} - {f.address} <button onClick={(clickEvent) => {
                                        clickEvent.preventDefault()
                                        setVenue(f)
                                        setChosenVenue(f)
                                    }}>select</button></li>
                                })
                            } </>
                            : <></>
                    }
                    <br />
                    or
                    <button className="button-8" onClick={(clickEvent) => {
                        clickEvent.preventDefault()
                        setVenueForm(!venueForm)
                    }}>submit a new venue</button>
                </>
        }
        {
            venueForm === true
                ?
                <div className="venueform">
                    <div className="field">
                        <label htmlFor="title" className="label">*name: </label>
                        <div className="control">
                            <input type="text" name="name" required className="input"
                                placeholder="venue name"
                                value={venue.name}
                                onChange={handleVenueChange}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="field">
                        <label htmlFor="title" className="label">*address (include street, city, state, and zip): </label>
                        <div className="control">
                            <input type="text" name="address" required className="venueaddress"
                                placeholder="address"
                                value={venue.address}
                                onChange={handleVenueChange}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="venueprivate" >
                        <div className="control">
                            <label className="checkbox" htmlFor="private">
                                <input type="checkbox" name="private"
                                    onChange={() => {
                                        const newVenue = { ...venue }
                                        newVenue.private = !venue.private
                                        setVenue(newVenue)
                                    }} />
                                add this location to our database for future shows
                            </label>
                        </div>
                    </div>
                    <br /><br />
                </div>
                : <></>
        }
        {
            chosenVenue
                ? <div className="venueform">
                    <>{chosenVenue.name}</> <br />
                    <>{chosenVenue.address}</>
                </div>
                : <></>
        }
    </>
}