import { useEffect } from "react";
import OrderStore from "../../store/OrderStore.js";
import OrderHistory from "./OrderHistory.jsx";

const OrdersPage = () => {

    const {
        orderData,
        fetchAdminOrder,
        OrderStatusChange
    } = OrderStore();

    useEffect(() => {
        fetchAdminOrder();
    }, []);

    return (
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-5xl">

                <OrderHistory
                    orderData={orderData}
                    onStatusChange={OrderStatusChange}
                />

            </div>

        </div>
    );
};

export default OrdersPage;