import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "./AuthContext.jsx";
const API_URL = import.meta.env.VITE_API_URL

export const ReservationContext = createContext(null);

export const ReservationController = () => {
  const { tokenStorage } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState(null);

  const getReservations = async () => {
    try {
      const response = await axios.get(`${API_URL}api/reservations`, {
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      });
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
      const response = await axios.get(`${API_URL}api/reservation/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
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
      value={{ reservations, loading, getReservationById }}
    >
      <Outlet />
    </ReservationContext.Provider>
  );
};
