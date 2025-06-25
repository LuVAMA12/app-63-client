import OrderCard from "./element/OrderCard/OrderCard"

const OrdersManager = () => {
    return(
        <main id='orders-manager' className="admin-main">
            <h1>Réservations</h1>
            <section className="orders-cards">
                <OrderCard/> 
            </section>
        </main>
    )
}

export default OrdersManager