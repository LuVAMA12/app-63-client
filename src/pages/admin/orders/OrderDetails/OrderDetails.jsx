import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { OrderContext } from "../../../../context/OrderContext.jsx";

const OrderDetails = () => {
    const { id } = useParams();
    const { getOrderById, loading } = useContext(OrderContext);
    const [order, setOrder] = useState(null);

    const fetchOrder = async () => {
      const data = await getOrderById(id);
      setOrder(data);
    };

    useEffect(() => {
      fetchOrder();
    }, []);

    return (
      <main id="order-details" className="admin-main">
        {loading && (
          <article className="loading-container">
            <div className="loader"></div>
          </article>
        )}
        {!loading && order && (
          <section className="details-card">
            <div className="top">
              <p className="date">
                {new Date(order.TimeSlot.date).toLocaleDateString("fr-FR")}
              </p>
              <p className="time">{order.TimeSlot.time.slice(0, 5)}</p>
            </div>

            <div className="user-info">
              <p>
                <strong>
                  {order.User.firstName} {order.User.lastName}
                </strong>
              </p>
              <a href={`mailto:${order.User.email}`}>{order.User.email}</a>
              <a href={`tel:${order.User.phone}`}>{order.User.phone}</a>
            </div>

            <div className="table-info">
              <p>
                <strong>{order.Table.location}</strong>
              </p>
              <p>Table {order.Table.numberTable}</p>
              <p>{order.numberOfPeople} couverts</p>
            </div>

            <p className={`status ${order.status}`}>
              {order.status === "pending" && "en attente"}
              {order.status === "ready" && "prête"}
              {order.status === "collected" && "récupérée"}
            </p>
          </section>
        )}
      </main>
    );
};
export default OrderDetails;
