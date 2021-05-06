import React, { useContext } from 'react'
import {Typography, Button, useTheme, Badge, IconButton} from '@material-ui/core'
import { AppContext } from '../AppContext'
import { useHistory } from 'react-router-dom'
// import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import Logo from './Logo3.png'

const Header = () => {
    const theme = useTheme()
    const { username, logout, isActive, setIsActive, activeUsers } = useContext(AppContext)
    const history = useHistory()
    
    return (
        <header>
            <span style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    style={{
                        marginTop: '0.55rem',
                        marginRight: '0.75rem',
                        height: '2rem',
                        width: '2rem',
                    }}
                    src={Logo}
                />
                <Typography component="div" variant="h4">
            Cookie
                    <span style={{ color: theme.palette.primary.main }}>Byte</span>
                </Typography>
                <span style={{ flexGrow: 1 }} />
                <Badge
                    style={{ marginRight: '0.5rem' }}
                    color="primary"
                    overlap="circle"
                    badgeContent={activeUsers.length}
                >
                    <a href='/meetup'>
                        <IconButton>
                            <PeopleAltIcon style={{ fontSize: '1.5rem' }} />
                        </IconButton>
                    </a>
                </Badge>
                <Button
                    onClick={() => {
                        if (!isActive) {
                            history.push('/login')
                        } else {
                            logout(username).then(() => setIsActive(false))
                        }
                    }}
                >
                    {!isActive ? 'Login' : 'Logout'}
                </Button>
            </span>
        </header>
    )
}

export default Header