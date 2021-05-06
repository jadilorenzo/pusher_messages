import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import LoginPage from './components/Login'
import MeetupPage from './components/Meetup'
import SignupPage from './components/Signup'
import RoomPage from './components/Room'
import { AppContext } from './AppContext'

const App = () => {
    const {rooms} = useContext(AppContext)
    return (
        <div>
            <Route exact path="/">Landing Page</Route>
            <LoginPage />
            <MeetupPage />
            <SignupPage />
            {rooms.map((room: {id: number}) => {
                return (
                    <div key='id'><Route path={`/room/${room.id}`}><RoomPage {...room}/></Route></div>
                )
            })}
        </div>
    )
}

export default App
