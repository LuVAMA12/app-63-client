import { Route, Routes } from 'react-router';
import App from './App.jsx';
import NotFound from './pages/NotFound.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ManageReservations from './pages/admin/ManageReservations/ManageReservations.jsx';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Login from './pages/admin/Login/Login.jsx';

const MyRouter = () => {
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <>
        <Routes>
            <Route element={<PublicLayout/>}>
                <Route path='/' element={<App/>}/>
            </Route>
            {isAuthenticated ? (

                <Route path='/admin' element={<AdminLayout/>}>
                    <Route path='/admin/reservations' element={<ManageReservations/>}/>
                </Route>
                ): (
                    <Route path='/admin' element={<Login/>}/>
                )
            }
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        </>
    ); 
}

export default MyRouter