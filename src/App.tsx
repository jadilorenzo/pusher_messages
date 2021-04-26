import React from 'react'
import LoginPage from './components/Login'
import { Route } from 'react-router-dom'
// import { useContext } from 'react'
// import { AppContext } from './AppContext'


const App = () => {
    // const context = useContext(AppContext)    
    return (
        <div>
            <LoginPage />
            <Route exact path="/">
            App Page
            </Route>
        </div>
    );
}

export default App
