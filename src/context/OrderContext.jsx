import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const OrderContext = createContext(null);

export const OrderController = ({ children }) => {
    const { tokenStorage } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(null);

    const getOrders = async () => {
        try {
        const response = await axios.get(
            "https://app-63-server.onrender.com/api/orders",
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
        console.log(error);
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
         return console.log(error);
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
        {children}
        </OrderContext.Provider>
    );
};