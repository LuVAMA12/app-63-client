import { useContext } from "react"
import { Navigate } from "react-router"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = ({children}) => {
        const {isAuthenticated} = useContext(AuthContext)

        if(!isAuthenticated) {
                return <Navigate to='/admin/login' replace />
        }
        return children
}

export default ProtectedRoute