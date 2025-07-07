import ReservationList from "./element/ReservationList/ReservationList"

const ReservationsManager = () => {
    return(
        <main id='reservations-manager' className="admin-main">
            <h1>Réservations</h1>
            {/* <Link path='/'></Link> */}
            <section className="reservations-cards">
           <ReservationList/> 
            </section>
        </main>
    )
}

export default ReservationsManager