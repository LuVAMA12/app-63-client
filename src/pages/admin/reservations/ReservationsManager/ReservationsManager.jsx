import ReservationCard from "./element/ReservationCard/ReservationCard"

const ReservationsManager = () => {
    return(
        <main id='reservations-manager' className="admin-main">
            <h1>Réservations</h1>
            {/* <Link path='/'></Link> */}
            <section className="reservations-cards">
           <ReservationCard/> 
            </section>
        </main>
    )
}

export default ReservationsManager