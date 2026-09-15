import { useEffect } from "react";
import OrderHistory from "../../Components/OrderHistory.jsx";
import OrderStore from "../../store/OrderStore.js";

const Orders = () => {

    const {
        fetchUserOrder,
        orderData
    } = OrderStore();

    useEffect(() => {
        fetchUserOrder();
    }, []);

    return (
        <div className="w-full px-4 py-6">

            <div className="max-w-5xl mx-auto">

                <OrderHistory
                    orderData={orderData}
                />

            </div>

        </div>
    );
};

export default Orders;