import React, { createContext, useState, useEffect } from 'react'
import {post} from './api'
import { useBeforeunload } from 'react-beforeunload';
import Pusher from 'pusher-js'

export const AppContext = createContext<any>({})

const pusher = new Pusher("922ac30666e5c94d5e7a", {
    cluster: "us2",
});

export const AppContextProvider = (props: {
    children: any
}) => {
    const [username, setUsername] = useState<string>(window.localStorage.getItem("user") || '')
    const [password, setPassword] = useState<string>('')
    const [isActive, setIsActive] = useState(false)

    const login = (username: string, password: string) => {
        window.localStorage.setItem("user", username)
        return post('login', {
            username,
            password
        })
    }

    const logout = (username: string) => {
        return post("logout", {
          username,
        })
    }

    const isUserActive = async (username: string) => {
        const user = await post("is_active", {
            username
        })
        return user.is_active
    }


    const state = {
      username,
      setUsername,
      password,
      setPassword,

      login,
      logout,
      isUserActive,
      isActive,
      setIsActive,
    };

    useEffect(() => {
        isUserActive(username).then(r => {
            setIsActive(r)
        });
    })

    useEffect(() => {
        if (!isUserActive(username)) {
            login(username, password)
        }
        return () => {
            logout(username)
        }
    }, [username, password])

    useEffect(() => {
        const activeUsers = pusher.subscribe("active-users");
        activeUsers.bind("changed-user", (data: any) => {

        })

        return () => pusher.unsubscribe("active-users")
    }, [])

    useBeforeunload(async (e) => {
        const success = await post('logout', {
            username,
        })
        if (success) {
          e.preventDefault();
        }
    })

    return (
        <AppContext.Provider value={state}>
            <div>{props.children}</div>
        </AppContext.Provider>
    )
}