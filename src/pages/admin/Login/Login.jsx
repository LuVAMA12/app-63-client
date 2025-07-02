import { useContext, useState } from "react";
import FormField from "../../../components/FormField/FormField.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [infoAdmin, setInfoAdmin] = useState({
    email: "",
    password: "",
  });
  return (
    <main id="login" className="admin-main">
      <img
        src="/images/logo.png"
        alt="Logo Le 63 restaurant"
        className="logo"
      />
        <h1>Connexion</h1>
      <form
        action="#"
        method="POST"
        onSubmit={(e) => handleLogin(e, infoAdmin)}
        className="login-form"
      >
        <FormField
          label="Email"
          name="email"
          type="email"
          value={infoAdmin.email}
          onChange={(e) =>
            setInfoAdmin({ ...infoAdmin, email: e.target.value })
          }
        />
        <FormField
          label="Mot de passe"
          name="password"
          type="password"
          value={infoAdmin.password}
          onChange={(e) =>
            setInfoAdmin({ ...infoAdmin, password: e.target.value })
          }
        />

          {console.log(infoAdmin)}
        <button className="button" type="submit">
          Se connecter
        </button>
      </form>
    </main>
  );
};

export default Login;
