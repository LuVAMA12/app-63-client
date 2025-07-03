import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailsLayout from "../../../../components/admin/DetailsLayout";
import { OrderContext } from "../../../../context/OrderContext.jsx";
import EditReservationForm from "../../reservations/ReservationDetails/element/EditReservationForm/EditReservationForm.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const OrderDetails = () => {
  const { id } = useParams();
  const { getOrderById, loading } = useContext(OrderContext);
  const [order, setOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchOrder = async () => {
    const data = await getOrderById(id);
    setOrder(data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <DetailsLayout
      loading={loading}
      isEditing={isEditing}
      onToggleEdit={() => setIsEditing(!isEditing)}
      onDelete={() => console.log("Supprimer commande")}
      FormComponent={EditReservationForm}
      data={order}
      mainId="order-details"
    >
      {order && (
        <>
          <section className="flex border-bottom top">
            <p className="date">
              {new Date(order.createdAt).toLocaleDateString("fr-FR")}
            </p>
            <p className="time">{order.createdAt.slice(11, 16)}</p>
            {order.status === "ready" && <p className="status green">prête</p>}
            {order.status === "pending" && (
              <p className="status orange">en attente</p>
            )}
            {order.status === "collected" && (
              <p className="status grey">collectée</p>
            )}
          </section>

          <section className="flex border-bottom user-info">
            <p>
              <strong>
                {order.User.firstName} {order.User.lastName}
              </strong>
            </p>
            <div className="right">
              <a href={`mailto:${order.User.email}`}>{order.User.email}</a>
              <a href={`tel:${order.User.phone}`}>{order.User.phone}</a>
            </div>
          </section>

          <section className="flex items">
            {order.Items?.map((item, index) => (
              <figure key={index}>
                <img src={`${API_URL}${item.image}`} alt={item.title} />
                <figcaption>
                  <span>
                    {item.OrderItem.quantity} x {item.title}
                  </span>
                  <span>{item.price}€</span>
                </figcaption>
              </figure>
            ))}
          </section>
        </>
      )}
    </DetailsLayout>
  );
};

export default OrderDetails;
