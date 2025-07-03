import OrderList from "./element/OrderList/OrderList"

const OrdersManager = () => {
    return(
        <main id='orders-manager' className="admin-main">
            <h1>Commandes</h1>
            <section className="orders-cards">
                <OrderList/> 
            </section>
        </main>
    )
}

export default OrdersManager