import React, { useContext, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import { TextField, Button } from '@material-ui/core'
import { AppContext } from '../AppContext'

const LoginPage = () => {
    const {username, setUsername, password, setPassword, login} = useContext(AppContext)
    const [redirect, setRedirect] = useState<boolean>()

    if (redirect) {
        return <Redirect to='/'/>
    }

    return (
        <Route path='/login'>
            <Typography variant='h5'>
                Login
            </Typography>
            <div style={{ height: '1rem' }} />
            <FormGroup>
                <TextField onChange={(e) => {
                    setUsername(e.target.value)
                }} value={username} variant='outlined' type='username' placeholder='Username'/>
                <div style={{height: '1rem'}}/>
                <TextField onChange={(e) => {
                    setPassword(e.target.value)
                }} value={password} variant='outlined' type='password' placeholder='Password' />
            </FormGroup>
            <div style={{ height: '1rem' }} />
            <Button onClick={() => {
                if (login(username, password)) {
                    setRedirect(true)
                }
            }} color='primary' variant='contained'>Login</Button>
        </Route>
    )
}

export default LoginPage