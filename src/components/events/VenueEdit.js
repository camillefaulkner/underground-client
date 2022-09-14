export const VenueEdit = ({ venue, setVenue, cat, setCat, venueForm, setVenueForm }) => {

    const handleVenueChange = (event) => {
        const newVenue = { ...venue }
        newVenue[event.target.name] = event.target.value
        setVenue(newVenue)
    }

    return <>
        <div><div className="field">
            <label htmlFor="title" className="label">name: </label>
            <div className="control">
                <input type="text" name="name" required className="input"
                    placeholder="title"
                    value={venue.name}
                    onChange={handleVenueChange}
                />
            </div>
        </div>
        <br/>
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
            <br/>
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
            <br/>
            <div className="field">
                <label htmlFor="category_id" className="label">venue type: </label>
                <div className="control">
                    <div className="select">
                        <select name="category"
                            value={venue.category}
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
        </div>
    </>
}