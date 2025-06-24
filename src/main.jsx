import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import MyRouter from "./MyRouter.jsx";
import "./assets/styles/normalize.css";
import { AuthController } from "./context/AuthContext.jsx";
import { OrderController } from "./context/OrderContext.jsx";
import { ReservationController } from "./context/ReservationsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthController>
      <ReservationController>
        <OrderController>
          <MyRouter />
        </OrderController>
      </ReservationController>
    </AuthController>
  </BrowserRouter>
);
