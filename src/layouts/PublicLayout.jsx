import { Outlet } from "react-router"
import Header from "../components/Header/Header.jsx"

const PublicLayout = () => {
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default PublicLayout