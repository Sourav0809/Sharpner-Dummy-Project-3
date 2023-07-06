import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext(
    {
        isLoggedIn: false,
        onLogOut: () => { },
        onLogin: (email, password) => {

        }
    }
)

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState()

    const logoutHandler = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("auth")
    }
    const loginHandler = () => {
        localStorage.setItem("auth", 1)
        setIsLoggedIn(true)
    }

    useEffect(() => {
        if ((localStorage.getItem("auth")) === "1") {

            setIsLoggedIn(true)
        }

    }, [])
    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogOut: logoutHandler, onLogin: loginHandler }}>{props.children}</AuthContext.Provider>
}

export default AuthContext