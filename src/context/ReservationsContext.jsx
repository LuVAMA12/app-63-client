import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const ReservationContext = createContext(null);

export const ReservationController = ({ children }) => {
    const { tokenStorage } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState(null);

    const getReservations = async () => {
        try {
        const response = await axios.get(
            "https://app-63-server.onrender.com/api/reservations",
            {
            headers: {
                Authorization: `Bearer ${tokenStorage}`,
            },
            }
        );
        if (response.status === 200) {
            setReservations(response.data);
        }
        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);
        }
    };

    const getReservationById = async (id) => {
        try {
        const response = await axios.get(
            `https://app-63-server.onrender.com/api/reservation/${id}`,
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
        getReservations();
        }
    }, []);

    return (
        <ReservationContext.Provider
        value={{ reservations, loading, getReservationById}}
        >
        {children}
        </ReservationContext.Provider>
    );
};