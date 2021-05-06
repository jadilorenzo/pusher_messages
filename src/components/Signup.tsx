import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import { Typography, TextField, FormGroup, Button } from '@material-ui/core'
import { Route, useHistory } from 'react-router-dom'

const SignupPage = () => {
    const { username, setUsername, password, setPassword, signup } = useContext(
        AppContext
    )
    const history = useHistory()

    return (
        <Route path='/signup'>
            <Typography variant="h5">Signup</Typography>
            <div style={{ height: '1rem' }} />
            <FormGroup>
                <TextField
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    value={username}
                    type="username"
                    variant="outlined"
                    placeholder="Username"
                />
                <div style={{ height: '1rem' }} />
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                    type="password"
                    variant="outlined"
                    placeholder="Password"
                />
                <div style={{ height: '1rem' }} />
            </FormGroup>
            <Button onClick={() => {
                signup(username, password).then(() => {
                    history.replace('/meetup')
                })
            }} variant="contained" color="primary">
                Signup
            </Button>
        </Route>
    )
}

export default SignupPage 