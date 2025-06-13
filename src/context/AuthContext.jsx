import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export const AuthController = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [tokenStorage, setTokenStorage] = useState(null)

    useEffect(()=> {
        setLoading(true)
        const token = localStorage.getItem('token')
        try {
            if (token) {
                setTokenStorage(token)
                setIsAuthenticated(true)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }, [])

    return (<AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, tokenStorage}}>
            {!loading && children}
          </AuthContext.Provider>)
}