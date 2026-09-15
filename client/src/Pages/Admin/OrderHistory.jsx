const OrderHistory = ({
    orderData = [],
    onStatusChange,
}) => {

    return (
        <div className="max-w-5xl mx-auto p-6">

            <div className="mb-6">

                <h2 className="text-3xl font-bold text-gray-800">
                    Order History
                </h2>

                <p className="text-gray-500 mt-1">
                    View and manage customer orders
                </p>

            </div>


            {orderData.length === 0 ? (

                <div className="border border-dashed border-gray-300 rounded-2xl py-12 text-center">

                    <div className="text-5xl mb-4">
                        📦
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800">
                        No orders found
                    </h3>

                    <p className="text-gray-500 mt-1">
                        Customer orders will appear here.
                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {orderData.map((order) => (

                        <div
                            key={order._id}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                        >

                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 mb-5">

                                <div>

                                    <p className="text-xs text-gray-500">
                                        Order ID
                                    </p>

                                    <p className="font-bold text-gray-800">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-gray-500 mb-1">
                                        Customer
                                    </p>

                                    <p className="font-semibold">
                                        {order.customerId?.name || "Customer"}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {order.customerId?.email || ""}
                                    </p>

                                </div>


                                {/* Status */}
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        onStatusChange(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                    className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                                >

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="preparing">
                                        Preparing
                                    </option>

                                    <option value="outOfDelivery">
                                        Out Of Delivery
                                    </option>

                                    <option value="delivered">
                                        Delivered
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>

                                </select>

                            </div>


                            {/* Food Items */}
                            <div className="space-y-4">

                                {order.CartItem?.map((item) => (

                                    <div
                                        key={item._id}
                                        className="flex items-center gap-4"
                                    >

                                        {item.foodId?.images?.length > 0 ? (

                                            <img
                                                src={item.foodId.images[0]}
                                                alt={item.foodId.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />

                                        ) : (

                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                                                No Image
                                            </div>

                                        )}


                                        <div className="flex-1">

                                            <h3 className="font-semibold">
                                                {item.foodId?.name || "Food Item"}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                ₹{item.foodId?.price || 0} × {item.quantity}
                                            </p>

                                        </div>


                                        <p className="font-semibold">
                                            ₹
                                            {(item.foodId?.price || 0) *
                                                item.quantity}
                                        </p>

                                    </div>

                                ))}

                            </div>


                            {/* Total */}
                            <div className="flex justify-between items-center border-t mt-5 pt-4">

                                <p className="text-gray-500">
                                    {order.CartItem?.length || 0} items
                                </p>

                                <div className="text-right">

                                    <p className="text-sm text-gray-500">
                                        Total
                                    </p>

                                    <p className="text-2xl font-bold text-orange-500">
                                        ₹{order.totalCartValue}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default OrderHistory;