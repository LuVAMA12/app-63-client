import axios from "axios";
import { createContext, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export const OrderContext = createContext(null);

export const OrderController = () => {
  const navigate = useNavigate();
  const { tokenStorage } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}api/orders`, {
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

  const getOrderById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}api/orders/${id}`, {
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

  return (
    <OrderContext.Provider
      value={{
        loading,
        getOrders,
        getOrderById,
      }}
    >
      <Outlet />
    </OrderContext.Provider>
  );
};
