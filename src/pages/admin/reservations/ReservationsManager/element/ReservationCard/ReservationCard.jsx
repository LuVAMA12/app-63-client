import { useContext } from "react";
import { useNavigate } from "react-router";
import { ReservationContext } from "../../../../../../context/ReservationsContext.jsx";
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
      {!loading &&
        reservations &&
        reservations.map((reservation) => (
          <article
            key={reservation.id}
            id="reservation-card"
            onClick={() => navigate(`/admin/reservations/${reservation.id}`)}
          >
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
                <p className="status green">réservé</p>
              )}
              {reservation.status === "awaiting" && (
                <p className="status orange">en attente</p>
              )}
              {reservation.status === "confirmed" && (
                <p className="status grey">confirmé</p>
              )}
              <p>{reservation.numberOfPeople} pers.</p>
              <p>{reservation.TimeSlot.startTime.slice(0, 5)}</p>
            </div>
          </article>
        ))}
      {!reservations && <p>Aucune réservation trouvé</p>}
    </>
  );
};

export default ReservationCard;
