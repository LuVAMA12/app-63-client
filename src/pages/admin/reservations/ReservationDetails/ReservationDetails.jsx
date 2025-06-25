import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ReservationContext } from "../../../../context/ReservationsContext";

const ReservationDetails = () => {
    const { id } = useParams();
    const { getReservationById, loading } = useContext(ReservationContext);
    const [reservation, setReservation] = useState(null);

    const fetchReservation = async () => {
        const data = await getReservationById(id);
        setReservation(data);
    };

    useEffect(() => {
        fetchReservation();
    }, []);
    
    return (
        <main id="reservation-details" className="admin-main">
        {loading && (
            <article className="loading-container">
            <div className="loader"></div>
            </article>
        )}
        {!loading && reservation && (
            <section className="details-card">
  <div className="top">
    <p className="date">
      {new Date(reservation.TimeSlot.date).toLocaleDateString("fr-FR")}
    </p>
    <p className="time">{reservation.TimeSlot.time.slice(0, 5)}</p>
  </div>

  <div className="user-info">
    <p><strong>{reservation.User.firstName} {reservation.User.lastName}</strong></p>
    <a href={`mailto:${reservation.User.email}`}>{reservation.User.email}</a>
    <a href={`tel:${reservation.User.phone}`}>{reservation.User.phone}</a>
  </div>

  <div className="table-info">
    <p><strong>{reservation.Table.location}</strong></p>
    <p>Table {reservation.Table.numberTable}</p>
    <p>{reservation.numberOfPeople} couverts</p>
  </div>

  <p className={`status ${reservation.status}`}>
    {reservation.status === "reserved" && "Réservé"}
    {reservation.status === "awaiting" && "En attente"}
    {reservation.status === "confirmed" && "Confirmé"}
  </p>
</section>
        )}
        </main>
    );
};
export default ReservationDetails;
