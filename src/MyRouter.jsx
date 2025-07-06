import { Route, Routes } from 'react-router';
import ProtectedRoute from '../utils/ProtectedRoute.jsx';
import App from './App.jsx';
import { OrderController } from './context/OrderContext.jsx';
import { ReservationController } from './context/ReservationContext.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminHome from './pages/admin/AdminHome/AdminHome.jsx';
import Login from './pages/admin/Login/Login.jsx';
import OrderDetails from './pages/admin/orders/OrderDetails/OrderDetails.jsx';
import OrdersManager from './pages/admin/orders/OrdersManager/OrdersManager.jsx';
import ReservationDetails from './pages/admin/reservations/ReservationDetails/ReservationDetails.jsx';
import ReservationsManager from './pages/admin/reservations/ReservationsManager/ReservationsManager.jsx';
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

                <Route path='commandes' element={<OrderController/>}>
                    <Route path="" element={<OrdersManager />} />
                    <Route path=":id" element={<OrderDetails />} />
                </Route>
                

                <Route path='reservations' element={<ReservationController/>}>
                <Route path="" element={<ReservationsManager />} />
                <Route path=":id" element={<ReservationDetails />} />
                </Route>

            </Route>
                <Route path='/admin/login' element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        </>
    ); 
}

export default MyRouter