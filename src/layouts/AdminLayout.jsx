import { Outlet } from "react-router"
import AdminHeader from "../components/AdminHeader/AdminHeader.jsx"
import Footer from "../components/Footer/Footer.jsx"

const AdminLayout = () => {
    return(
        <>
            <AdminHeader/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default AdminLayout