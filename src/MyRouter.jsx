import { Route, Routes } from 'react-router';
import ProtectedRoute from '../utils/ProtectedRoute.jsx';
import App from './App.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminHome from './pages/admin/AdminHome/AdminHome.jsx';
import Login from './pages/admin/Login/Login.jsx';
import ReservationDetails from './pages/admin/ReservationDetails/ReservationDetails.jsx';
import ReservationsManager from './pages/admin/ReservationsManager/ReservationsManager.jsx';
import NotFound from './pages/NotFound.jsx';

const MyRouter = () => {
    return (
        <>
        <Routes>
            <Route element={<PublicLayout/>}>
                <Route path='/' element={<App/>}/>
            </Route>
                <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout/>
                    </ProtectedRoute>
                }
            >
                <Route path='' element={<AdminHome />} />
                <Route path="reservations" element={<ReservationsManager />} />
                <Route path="reservation/:id" element={<ReservationDetails />} />
            </Route>
                <Route path='/admin/login' element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        </>
    ); 
}

export default MyRouter