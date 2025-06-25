import { useContext } from "react";
import { useNavigate } from "react-router";
import { OrderContext } from "../../../../../../context/OrderContext";
const OrderCard = () => {
    const navigate = useNavigate();
    const { orders, loading } = useContext(OrderContext);


    return (
        <>
        {loading && (
            <article className="loading-container">
            <div className="loader"></div>
            </article>
        )}
        {(!orders || orders.length === 0) && (
            <p>Aucune commande trouvé</p>
        )}
        {!loading &&
            orders &&
            orders.length >= 1 &&
            orders.map((order) => (
                <article key={order.id} id="order-card" onClick={() => navigate(`/admin/commandes/${order.id}`)}>
                <div className="left-info">
                    <p>
                    <strong>{order.Table.location}</strong>
                    </p>
                    <p>
                    <strong>Table {order.Table.numberTable}</strong>
                    </p>
                    <p>
                    {order.User.firstName} {order.User.lastName}
                    </p>
                    <a href={`mailto:${order.User.email}`}>
                    {order.User.email}
                    </a>
                    <a href={`tel:${order.User.phone}`}>
                    {order.User.phone}
                    </a>
                </div>
                <div className="right-info">
                    {order.status === "reserved" && (
                    <p className={`status ${order.status}`}>réservé</p>
                    )}
                    {order.status === "awaiting" && (
                    <p className={`status ${order.status}`}>en attente</p>
                    )}
                    {order.status === "confirmed" && (
                    <p className={`status ${order.status}`}> confirmé </p>
                    )}
                    <p>{order.numberOfPeople} pers.</p>
                    <p>
                    {new Date(order.TimeSlot.date).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                    </p>
                    <p>{order.TimeSlot.time.slice(0, 5)}</p>
                </div>
                </article>
            ))}
        </>
    );
};

export default OrderCard;
