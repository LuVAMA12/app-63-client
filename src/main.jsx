import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import MyRouter from "./MyRouter.jsx";
import { AuthController } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthController>
          <MyRouter />
    </AuthController>
  </BrowserRouter>
);
