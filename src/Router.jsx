import './Styles.css'
import React from 'react'
import { BrowserRouter, Switch} from 'react-router-dom'
import { AppContextProvider } from './AppContext'
import { ThemeProvider, createMuiTheme, useMediaQuery, CssBaseline, Card, Container } from '@material-ui/core'
import { blue /* green */ } from '@material-ui/core/colors'

import Header from './components/Header'
import App from './App'

const Router = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const theme = createMuiTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: blue,
            secondary: {
                main: blue[900],
            },
        },
        props: {
            MuiTypography: {
                style: {
                    fontFamily: 'Assistant',
                    fontWeight: 375
                }
            },
            MuiButtonBase: {
                disableTouchRipple: true,
                style: {
                    fontFamily: 'Unica One',
                    fontSize: '1.1rem'
                }
            },
            MuiContainer: {
                maxWidth: 'md',
            },
            MuiCard: {
                style: {
                    background: prefersDarkMode ? '#303030' : 'fafafa',
                    padding: '0.5rem',
                    maxHeight: '51vh',
                    overflow: 'scroll',
                    borderRadius: '0.5rem',
                },
                variant: 'outlined',
            },
        },
    })

    theme.shadows = [
        'none',
        'rgba(0, 0, 0, 0.2) 0.1rem 0.1rem',
        'rgba(0, 0, 0, 0.1) 0.2rem 0.2rem',
    ]


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Header />
                <Switch>
                    <AppContextProvider>
                        <Container><Card><App /></Card></Container>
                    </AppContextProvider>
                   Hello 
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default Router