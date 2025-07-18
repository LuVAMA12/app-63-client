import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DetailsLayout from "../../../../components/admin/DetailsLayout";
import { ReservationContext } from "../../../../context/ReservationContext";
import EditReservationForm from "./element/EditReservationForm/EditReservationForm";
const ReservationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReservationById, loading, deleteReservationByID } = useContext(ReservationContext);
  const [reservation, setReservation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchReservation = async () => {
    const data = await getReservationById(id);
    setReservation(data);
  };
const deleteReservation = async () => {
  const deletedReservation = await deleteReservationByID(id);
}
  useEffect(() => {
    fetchReservation();
  }, [isEditing]);


const handleDelete= () => {
deleteReservation()
alert('Reservation supprimé')
navigate('/admin/reservations')
}
  return (
    <DetailsLayout
      loading={loading}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      onToggleEdit={() => setIsEditing(!isEditing)}
      onDelete={handleDelete}
      FormComponent={EditReservationForm}
      data={reservation} mainId='reservation-details'
    > {reservation && (
      <>
        <section className="flex border-bottom top">
          <p className="date">
            {new Date(reservation.date).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <p className="time">{reservation.TimeSlot.startTime.slice(0, 5)}</p>
          {reservation.status === "reserved" && (
            <p className="status green">réservé</p>
          )}
          {reservation.status === "awaiting" && (
            <p className="status orange">en attente</p>
          )}
          {reservation.status === "confirmed" && (
            <p className="status grey">confirmé</p>
          )}
        </section>

        <section className="flex border-bottom user-info">
          <p>
            <strong>
              {reservation.User.firstName} {reservation.User.lastName}
            </strong>
          </p>
          <div className="right">
            <a href={`mailto:${reservation.User.email}`}>
              {reservation.User.email}
            </a>
            <a href={`tel:${reservation.User.phone}`}>
              {reservation.User.phone}
            </a>
          </div>
        </section>

        <section className="flex table-info">
          <div className="left">
            <p>
              <strong>{reservation.Table.location}</strong>
            </p>
            <p>Table {reservation.Table.numberTable}</p>
          </div>
          <p>{reservation.numberOfPeople} pers.</p>
        </section>
      
      </>
    )}
    </DetailsLayout>
  );
};

export default ReservationDetails;
