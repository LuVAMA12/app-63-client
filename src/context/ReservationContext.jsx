import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export const ReservationContext = createContext(null);

export const ReservationController = () => {
  const navigate = useNavigate();
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
      console.log(response);

      if (response.status === 200) {
        console.log(response);
        setReservations(response.data);
      }
    } catch (error) {
      console.log(error);

      if (error.response.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getReservationById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const updateReservationById = async (id, data, setLoading) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      date,
      numberOfPeople,
      capacity,
      location,
    } = data;

    try {
      const response = await axios.patch(
        `${API_URL}api/reservations/${id}`,
        {
          firstName,
          lastName,
          email,
          phone,
          date,
          timeSlotId: data.time.id,
          numberOfPeople,
          capacity,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        }
      );
      console.log(response);
      if (response.status === 202) {
        response.data.message = "Votre réservation a été mise à jour";
        console;
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReservationByID = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }
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
      value={{
        reservations,
        loading,
        getReservationById,
        updateReservationById,
        deleteReservationByID,
      }}
    >
      <Outlet />
    </ReservationContext.Provider>
  );
};
