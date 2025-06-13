import { Outlet } from "react-router"
import Header from "../components/Header/Header.jsx"
import AdminHeader from "../components/AdminHeader/AdminHeader.jsx"

const AdminLayout = () => {
    return(
        <>
            <AdminHeader/>
            <Outlet/>
        </>
    )
}

export default AdminLayout