import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'

const Loader = () => {
    return (
        <Grid container direction="row" justify="center" alignItems="center" style={{height: '100vh'}}>
            <CircularProgress />
        </Grid>
    )
}

export default Loader