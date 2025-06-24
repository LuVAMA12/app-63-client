import { useContext } from "react";
import { useNavigate } from "react-router";
import { ReservationContext } from "../../../context/ReservationsContext.jsx";
const ReservationCard = () => {
    const navigate = useNavigate();
    const { reservations, loading } = useContext(ReservationContext);

    return (
        <>
        {loading && (
            <article className="loading-container">
            <div className="loader"></div>
            </article>
        )}
        {!reservations && (
            <p>Aucune commande trouvé</p>
        )}
        {!loading &&
            reservations &&
            reservations.map((reservation) => (
                <article key={reservation.id} id="reservation-card" onClick={() => navigate(`/admin/reservation/${reservation.id}`)}>
                <div className="left-info">
                    <p>
                    <strong>{reservation.Table.location}</strong>
                    </p>
                    <p>
                    <strong>Table {reservation.Table.numberTable}</strong>
                    </p>
                    <p>
                    {reservation.User.firstName} {reservation.User.lastName}
                    </p>
                    <a href={`mailto:${reservation.User.email}`}>
                    {reservation.User.email}
                    </a>
                    <a href={`tel:${reservation.User.phone}`}>
                    {reservation.User.phone}
                    </a>
                </div>
                <div className="right-info">
                    {reservation.status === "reserved" && (
                    <p className={`status ${reservation.status}`}>réservé</p>
                    )}
                    {reservation.status === "awaiting" && (
                    <p className={`status ${reservation.status}`}>en attente</p>
                    )}
                    {reservation.status === "confirmed" && (
                    <p className={`status ${reservation.status}`}> confirmé </p>
                    )}
                    <p>{reservation.numberOfPeople} pers.</p>
                    <p>
                    {new Date(reservation.TimeSlot.date).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                    </p>
                    <p>{reservation.TimeSlot.time.slice(0, 5)}</p>
                </div>
                </article>
            ))}
        </>
    );
};

export default ReservationCard;
