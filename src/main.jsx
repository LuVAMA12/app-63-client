import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import MyRouter from "./MyRouter.jsx";
import { AuthController } from "./context/AuthContext.jsx";
import { GeneralController } from "./context/GeneralContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthController>
      <GeneralController>
          <MyRouter />
      </GeneralController>
    </AuthController>
  </BrowserRouter>
);
