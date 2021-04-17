import React, { createContext } from 'react'
import {post} from './api'
// import Pusher from 'pusher-js'

export const AppContext = createContext<any>({})

export const AppContextProvider = (props: {
    children: any
}) => {
    const state = {
    }

    // console.log('provider', state)
    const result = post('login', {
        username: 'Jacob Di Lorenzo',
        password: 'password'
    })
    console.log(result)

    return (
        <AppContext.Provider value={state}>
            <div>{props.children}</div>
        </AppContext.Provider>
    )
}