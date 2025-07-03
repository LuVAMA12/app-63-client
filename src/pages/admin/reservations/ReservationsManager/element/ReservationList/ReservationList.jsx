import { useContext } from "react";
import { useNavigate } from "react-router";
import ListWithLoading from "../../../../../../components/admin/ListWithLoading.jsx";
import { ReservationContext } from "../../../../../../context/ReservationsContext.jsx";


const ReservationList = () => {
  const navigate = useNavigate();
  const { reservations, loading } = useContext(ReservationContext);

  return (
    <ListWithLoading
      loading={loading}
      items={reservations}
      emptyMessage="Aucune réservation trouvée"
      renderItem={(reservation) => (
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
            <p>
              {new Date(reservation.date).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </article>
      )}
    />
  );
};

export default ReservationList