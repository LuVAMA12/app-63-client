import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL

export const OrderContext = createContext(null);

export const OrderController = () => {
    const navigate = useNavigate()
    const { tokenStorage } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(null);
    
    const getOrders = async () => {
        try {
        const response = await axios.get(
            `${API_URL}api/orders`,
            {
            headers: {
                Authorization: `Bearer ${tokenStorage}`,
            },
            }
        );
        if (response.status === 200) {
            setOrders(response.data);
        }
        } catch (error) {
            if (error.response.status === 403){
        localStorage.removeItem('token')
        navigate('/admin/login')
      }
         console.log(error)
        } finally {
        setLoading(false);
        }
    };

    const getOrderById = async (id) => {
        try {
        const response = await axios.get(
            `https://app-63-server.onrender.com/api/order/${id}`,
            {
            headers: {
                Authorization: `Bearer ${tokenStorage}`,
            },
            }
        );
        if (response.status === 200) {
            return response.data
        }
        } catch (error) {
            if (error.response.status === 403){
        localStorage.removeItem('token')
        navigate('/admin/login')
      }
            console.log(error)
        } finally {
        setLoading(false);
        }
       
    };

    useEffect(() => {
        if (tokenStorage) {
        getOrders();
        }
    }, []);

    return (
        <OrderContext.Provider
        value={{ orders, loading, getOrderById}}
        >
        <Outlet/>
        </OrderContext.Provider>
    );
};