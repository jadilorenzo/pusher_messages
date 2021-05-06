import React, { useContext } from 'react'
import { Paper, Avatar, Grid, Badge, Typography, Button } from '@material-ui/core'
import { AppContext } from '../AppContext'
import RefreshIcon from '@material-ui/icons/Refresh'
import { Route, useHistory } from 'react-router-dom'

const MeetupPage = () => {
    const { activeUsers, username, roomConnection, rooms } = useContext(AppContext)

    const noActiveUsers = activeUsers.length === 0
    const history = useHistory()

    return (
        <Route exact path="/meetup">
            <Typography variant="h5">Active Users</Typography>
            <div style={{ height: '1rem' }} />
            {!noActiveUsers ? (
                activeUsers.map(({user, id}: {user:string, id:number}) => {
                    return (
                        <div onClick={() => {
                            if (user !== username) {
                                const currentId = (activeUsers.filter((u: any) => u.username === username)[0] || {id: undefined}).id
                                console.log([id, currentId])
                                const existingRoom = rooms.filter((room: any) => (
                                    room.user_ids.includes(id) && 
                                    room.user_ids.includes(currentId) 
                                ))
                                if (existingRoom.length === 0) {
                                    roomConnection.create({ user_ids: [id, currentId] }).then((r: string) => history.replace(`/room/${r}`))
                                } else {
                                    history.replace(`/room/${existingRoom[0].id}`)
                                }
                                
                            }
                        }} key={user}>
                            <Paper >
                                <Grid
                                    container
                                    alignItems="center"
                                    spacing={1}
                                    style={{ padding: '0.5rem' }}
                                >
                                    <Grid item>
                                        <Badge
                                            overlap="circle"
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            variant="dot"
                                            color="primary"
                                        >
                                            <Avatar>{user[0] || ''}</Avatar>
                                        </Badge>
                                    </Grid>
                                    <Grid item>{user} {(user === username) && '(You)'}</Grid>
                                </Grid>
                            </Paper>
                            <div style={{ height: '1rem' }} />
                        </div>
                    )
                })
            ) : (
                <div>
                    <Typography>No active users at this time.</Typography>
                    <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                    >
              Refresh
                    </Button>
                </div>
            )}
        </Route>
    )
}

export default MeetupPage