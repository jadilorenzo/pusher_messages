import React, { createContext, useState, useEffect } from 'react'
import {post} from './api'
import { useBeforeunload } from 'react-beforeunload'
import Connection from './components/Connection'
import { useHistory } from 'react-router-dom'

export const AppContext = createContext<any>({})

export const AppContextProvider = (props: {
    children: any
}) => {
    const [username, setUsername] = useState<string>(window.localStorage.getItem('user') || '')
    const [password, setPassword] = useState<string>('')
    const [isActive, setIsActive] = useState(false)
    const [activeUsers, setActiveUsers] = useState<any[]>([])
    const [roomConnection, setRoomConnection] = useState<any>()
    const [rooms, setRooms] = useState<any[]>([])
    const history = useHistory()

    const login = (username: string, password: string) => {
        window.localStorage.setItem('user', username)
        return post('login_user', {
            username,
            password
        })
    }

    const logout = (username: string) => {
        return post('logout_user', {
            username,
        })
    }

    const isUserActive = async (username: string) => {
        const user = await post('is_active', {
            username
        })
        return (user || { 'is_active': false }).is_active
    }

    const signup = (username: string, password: string) => {
        return post('create_user', {
            username,
            password
        })
    }

    const state = {
        username,
        setUsername,
        password,
        setPassword,

        login,
        logout,
        isUserActive,
        signup,

        isActive,
        setIsActive,
        activeUsers,

        roomConnection,
        rooms
    }

    useEffect(() => {
        isUserActive(username).then(r => {
            setIsActive(r)
        })
    }, [])

    useEffect(() => {
        if (isActive){
            login(username, password)
        }
        return () => {
            logout(username)
        }
    }, [history.location])

    useEffect(() => {
        const usersApi = new Connection('users', 'update', (data:any) => {
            setActiveUsers(
                data.filter((user: any) => user.is_active)
                    .map((user:any) => ({...user, user: user.username}))
            )
        })
        usersApi.get('user').then((r: any) => {
            setActiveUsers(
                r.filter((user: any) => user.is_active)
                    .map((user: any) => ({ ...user, user: user.username }))
            )
        })

        const roomApi = new Connection('room', 'update', (r: any) => {
            setRoomConnection(r)
        })
        roomApi.get('room').then(setRooms)
        setRoomConnection(roomApi)
    }, [])

    useBeforeunload(async (e) => {
        const success = await post('logout', {
            username,
        })
        if (success) {
            e.preventDefault()
        }
    })

    return (
        <AppContext.Provider value={state}>
            <div>{props.children}</div>
        </AppContext.Provider>
    )
}