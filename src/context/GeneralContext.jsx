import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

export const GeneralContext = createContext(null);

export const GeneralController = ({ children }) => {
  const navigate = useNavigate();
  const { tokenStorage } = useContext(AuthContext);

  const getAvailablesSlots = async (data, setLoading) => {
    const { date } = data;
    try {
      const response = await axios.post(
        `${API_URL}api/availablesSlots`,
        { date },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        }
      );
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

  const getAvailableCapacity = async (data, setLoading) => {
    const { date, timeSlotId } = data;
    try {
      const response = await axios.post(
        `${API_URL}api/tables/capacity`,
        { date, timeSlotId },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        }
      );
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

  const getAvailablesLocations = async (data, setLoading) => {
    const { date, timeSlotId, numberOfPeople } = data;

    try {
      const response = await axios.post(
        `${API_URL}api/availablesLocations`,
        { date, timeSlotId, numberOfPeople },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        }
      );
      if (response.status === 200) {
        response.data.message === 'Votre réservation a été ajouté'
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

  const createReservation = async (data, setLoading) => {
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
      const response = await axios.post(
        `${API_URL}api/addReservation`,
        {
          firstName,
          lastName,
          email,
          phone,
          date,
          numberOfPeople,
          capacity,
          location,
          timeSlotId: data.time.id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        }
      );
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
  return (
    <GeneralContext.Provider
      value={{
        getAvailablesSlots,
        getAvailableCapacity,
        getAvailablesLocations,
        createReservation
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
