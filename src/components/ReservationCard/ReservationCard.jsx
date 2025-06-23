import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
const ReservationCard = () => {
    const { tokenStorage } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState(null);

    const getReservations = async () => {
        try {
        const response = await axios.get(
            "https://app-63-server.onrender.com/api/reservations",
            {
            headers: {
                Authorization: `Bearer ${tokenStorage}`,
            },
            }
        );
        if (response.status === 200) {
            setReservations(response.data);
        }
        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (tokenStorage) {
        getReservations();
        }
    }, []);
    return (
        <>
        {!loading &&
            reservations.map((reservation) => (
            <article key={reservation.id} id="reservation-card">
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
                <a href={`mailto:${reservation.User.email}`}>{reservation.User.email}</a>
                <a href={`tel:${reservation.User.phone}`}>{reservation.User.phone}</a>
                </div>
                <div className="right-info">
                <p className="status">{reservation.status}</p>
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
