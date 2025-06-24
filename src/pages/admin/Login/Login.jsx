import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext.jsx"

const Login = () => {
    const {handleLogin} = useContext(AuthContext)
    const [infoAdmin, setInfoAdmin] = useState({
        email: '',
        password: ''
    })
    return(
        <>
        <h1>Login pages</h1>
        <form action="#" method="POST" onSubmit={e => handleLogin(e, infoAdmin)}>
            <fieldset>
                <legend>Connexion</legend>
                <label htmlFor="email">
                    Email :
                    <input type="email" id="email" autoComplete="email" required onChange={(e) => setInfoAdmin({...infoAdmin, email: e.target.value})} />
                </label>
                <label htmlFor="password">
                    Password :
                    <input type="password" id="password" autoComplete="password" required onChange={(e) => setInfoAdmin({...infoAdmin, password: e.target.value})} />
                </label>
                <button className='button' type="submit">
                    Se connecter
                </button>
            </fieldset>
        </form>
        </>
    )
}

export default Login