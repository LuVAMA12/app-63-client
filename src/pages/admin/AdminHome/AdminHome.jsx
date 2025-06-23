import { Link } from "react-router"

const AdminHome = () => {
    return(
        <main id="admin-home" className='admin-main'>
            <Link to='/admin/commandes' className="orders">Commandes</Link>
            <Link to='/admin/reservations' className="reservations">Réservations</Link>
            <Link to='/admin/menu' className="menu">Menu</Link>
            <Link to='/admin/tables' className="tables">Tables</Link>
            <Link to='/admin/horaires' className="time-slots">Créneaux Horaires</Link>
        </main>
    )
}

export default AdminHome