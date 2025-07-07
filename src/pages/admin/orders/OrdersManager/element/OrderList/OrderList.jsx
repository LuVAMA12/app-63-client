import { useContext } from "react";
import { useNavigate } from "react-router";
import ListWithLoading from "../../../../../../components/admin/ListWithLoading";
import { OrderContext } from "../../../../../../context/OrderContext";

const OrderList = () => {
  const navigate = useNavigate();
  const { orders, loading } = useContext(OrderContext);

  return (
    <ListWithLoading
      loading={loading}
      items={orders}
      emptyMessage="Aucune commande trouvée"
      renderItem={(order) => (
        <article
          key={order.id}
          id="order-card"
          onClick={() => navigate(`/admin/commandes/${order.id}`)}
        >
          <article className="flex top">
            <p>
              <strong> #{order.orderNumber} </strong>- {order.User.firstName}{" "}
              {order.User.lastName}
            </p>
            {order.status === "ready" && <p className="status green">prête</p>}
            {order.status === "pending" && (
              <p className="status orange">en attente</p>
            )}
            {order.status === "collected" && (
              <p className="status grey">collectée</p>
            )}
          </article>
          <article className="items">
            {order.Items &&
              order.Items.map((item, index) => (
                <p key={index}>
                  {item.OrderItem.quantity} x {item.title}
                </p>
              ))}
          </article>
          <article className="created-at">
              <p>{order.createdAt.slice(11, 16)}</p>
            <p>
              {new Date(order.createdAt).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </article>
        </article>
      )}
    />
  );
};

export default OrderList