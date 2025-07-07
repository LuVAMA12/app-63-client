import { useContext } from "react"
import { AuthContext } from "../src/context/AuthContext.jsx"
import { Navigate } from "react-router"

const ProtectedRoute = ({children}) => {
        const {isAuthenticated} = useContext(AuthContext)

        if(!isAuthenticated) {
                return <Navigate to='/admin/login' replace />
        }
        return children
}

export default ProtectedRoute