import { Route, Routes } from 'react-router';
import App from './App.jsx';
import NotFound from './pages/NotFound.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ManageReservations from './pages/admin/ManageReservations/ManageReservations.jsx';
import Login from './pages/admin/Login/Login.jsx';
import ProtectedRoute from '../utils/ProtectedRoute.jsx';

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
                <Route path="reservations" element={<ManageReservations />} />
            </Route>
                <Route path='/admin/login' element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        </>
    ); 
}

export default MyRouter