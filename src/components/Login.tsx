import React, { useContext } from 'react'
import { Route, useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import { TextField, Button } from '@material-ui/core'
import { AppContext } from '../AppContext'

const LoginPage = () => {
    const {
        username, 
        setUsername, 
        password, 
        setPassword, 
        login,  
    } = useContext(AppContext)
    const history = useHistory()

    return (
        <Route exact path='/login'>
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
                    history.replace('/')
                }
            }} color='primary' variant='contained'>Login</Button>
        </Route>
    )
}

export default LoginPage