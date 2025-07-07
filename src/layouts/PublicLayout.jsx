import { Outlet } from "react-router"
import Footer from "../components/Footer/Footer.jsx"
import Header from "../components/Header/Header.jsx"

const PublicLayout = () => {
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default PublicLayout