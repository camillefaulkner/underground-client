import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EventContainer } from "../components/events/EventContainer"
import { EventDetails } from "../components/events/EventDetails"
import { EventEdit } from "../components/events/EventEdit"
import { EventList } from "../components/events/EventList"
import { Itinerary } from "../components/itinerary/Itinerary"
import { Map } from "../components/map/Map"
import { WebSocketDemo } from "../components/message/Message"
import { RequestForm } from "../components/requests/RequestForm"
import { RequestList } from "../components/requests/RequestList"
import { RequestSubmitted } from "../components/requests/RequestSubmitted"
import { UserList } from "../components/users/UserList"
import { Authorized } from "./Authorized"



export const ApplicationViews = ({ token, setToken, setUserId, userId }) => {
  return <Routes>
    <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
    <Route exact path="/" element={<Login setToken={setToken} setUserId={setUserId} />} />
    <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
    <Route element={<Authorized token={token} />}>
    <Route path="/map" element={<Map />} />
      <Route path="/events" element={<EventContainer />} />
      <Route path="/events/:evtId" element={<EventDetails />} />
      <Route path="/event-edit/:evtId" element={<EventEdit />} />
      <Route path="/create-request" element={< RequestForm />} />
      <Route path="/success-request" element={< RequestSubmitted />} />
      <Route path="/view-requests" element={< RequestList />} />
      <Route path="itinerary" element={< Itinerary />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/chat" element={<WebSocketDemo />} />
    </Route>
  </Routes>
}