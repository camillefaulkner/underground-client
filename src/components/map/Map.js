import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import * as L from "leaflet";
import { useEffect, useState } from "react"
// import { getAllDates, fetchLatandLong, coffeeAPI } from "../ApiManager"
import "./Map.css"
import { ConvertDate } from "../events/ConvertDate"
import { getApprovedEvents } from '../../managers/EventManager'
import { fetchLatandLong } from "../../managers/APIManager"

export const Map = ({ adminUser, selections, saveNewSelection, currentUserId, setSelectionState, setSelections, getAllSelectionsByUser }) => {
    const [locations, setLocations] = useState([])
    const [dataForViz, setDataForViz] = useState([])

    useEffect(
        () => {
            getApprovedEvents().then((dateArray) => { setLocations(dateArray) })
        },
        []
    )

    useEffect(
        () => {
            if (locations.length) {
                let newDataState = []
                let allDataFetches = locations.map(location => {
                    return fetchLatandLong(location.venue?.address)
                })
                Promise.all(allDataFetches)
                    .then((LatLongResponses) => {
                        for (const response of LatLongResponses) {
                            newDataState.push(response.locations[0])
                        }
                        setDataForViz(newDataState)
                    })
            }
        },
        [locations]
    )

    let greenIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
    });

    let blueIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
    });


    return <div className="map">
        <h3>map</h3>
        {dataForViz.length
            ? <MapContainer center={[36.17, -86.75]} zoom={11} scrollWheelZoom={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {dataForViz.map(data => {
                    let foundLocation = locations.find((location) => {
                        return location.venue.address.includes(data?.address.houseNumber)
                    })
                    return <Marker icon={ greenIcon }
                        position={[data?.referencePosition?.latitude, data?.referencePosition?.longitude]}>
                        <Popup>
                            {ConvertDate(foundLocation?.date)} <br />
                            {foundLocation?.name} <br />
                            {foundLocation?.venue.name} <br /> {foundLocation?.venue.address}
                            {
                                adminUser === "false"
                                    ? <>
                                        {
                                            selections.length === 0 || selections.filter(s => s.event.id === foundLocation.id).length === 0
                                                ? <><br /><button onClick={(clickEvent) => {
                                                    clickEvent.preventDefault()
                                                    saveNewSelection({
                                                        event: foundLocation.id,
                                                        user: currentUserId
                                                    }).then(() => getAllSelectionsByUser(currentUserId).then((selectionArray) => { setSelections(selectionArray) }).then(() => setSelectionState(selections)))
                                                }}>add to itinerary</button></>
                                                : <>
                                                </>
                                        }
                                    </>
                                    : <></>
                            }
                        </Popup>
                    </Marker>
                })
                } */
            </MapContainer>
            : <></>
        }
    </div>
}