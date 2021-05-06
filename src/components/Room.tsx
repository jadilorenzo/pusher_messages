import React from 'react'
import Typography from '@material-ui/core/Typography'

const RoomPage = (room: {id: number}) => {
    return (
        <div>
            <Typography>Meeting Room #{room.id}</Typography>
        </div>
    )
}

export default RoomPage