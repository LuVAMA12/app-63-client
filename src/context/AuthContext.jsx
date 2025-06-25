import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL


export const AuthContext = createContext(null);

export const AuthController = ({ children }) => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tokenStorage, setTokenStorage] = useState(null);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
        if (token) {
            setTokenStorage(token);
            setIsAuthenticated(true);
        }
        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);
        }
    }, []);

    const handleLogin = async (e, infoAdmin) => {
        e.preventDefault();
        try {
        const response = await axios.post(
            `${API_URL}admin/login`,
            infoAdmin
        );
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            setTokenStorage(response.data.token);
            setIsAuthenticated(true);
            navigate("/admin");
        }
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated , tokenStorage, handleLogin }}
        >
        {!loading && children}
        </AuthContext.Provider>
    );
};
