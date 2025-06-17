import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null)

export const AuthController = ({ children }) => {
    const navigate = useNavigate()
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

    const handleLogin = async(e, infoAdmin) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:9000/admin/login', infoAdmin)
            // const response = await axios.post('https://app-63-server.onrender.com/admin/login', infoAdmin)
            if(response.status === 200) {
                localStorage.setItem('token', response.data.token)
                setTokenStorage(response.data.token)
                setIsAuthenticated(true)
                alert(response.data.message)
                navigate('/admin')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (<AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, tokenStorage, handleLogin}}>
            {!loading && children}
          </AuthContext.Provider>)
}