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
    try {
      const response = await axios.post(`${API_URL}api/availablesSlots`, {date : data}, {
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
    } finally{
        setLoading(false)
    }
  };


  return (
    <GeneralContext.Provider value={{ getAvailablesSlots }}>
      {children}
    </GeneralContext.Provider>
  );
};
