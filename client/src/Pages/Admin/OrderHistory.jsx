import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    User,
    Mail,
    CalendarDays,
    Package,
    Clock3,
    CookingPot,
    Truck,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const ORDER_STATUSES = [
    "pending",
    "preparing",
    "outOfDelivery",
    "delivered",
    "cancelled",
];

const getStatusConfig = (status) => {
    const config = {
        pending: {
            label: "Pending",
            icon: Clock3,
            className:
                "bg-yellow-50 text-yellow-700 border-yellow-200",
        },

        preparing: {
            label: "Preparing",
            icon: CookingPot,
            className:
                "bg-blue-50 text-blue-700 border-blue-200",
        },

        outOfDelivery: {
            label: "Out for Delivery",
            icon: Truck,
            className:
                "bg-purple-50 text-purple-700 border-purple-200",
        },

        delivered: {
            label: "Delivered",
            icon: CheckCircle2,
            className:
                "bg-green-50 text-green-700 border-green-200",
        },

        cancelled: {
            label: "Cancelled",
            icon: XCircle,
            className:
                "bg-red-50 text-red-700 border-red-200",
        },
    };

    return (
        config[status] || {
            label: status || "Unknown",
            icon: Clock3,
            className:
                "bg-gray-100 text-gray-600 border-gray-200",
        }
    );
};

const formatDate = (date) => {
    if (!date) {
        return "N/A";
    }

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const OrderHistory = ({
    orders = [],
    onStatusChange,
}) => {
    const [openOrder, setOpenOrder] = useState(null);

    const toggleOrder = (id) => {
        setOpenOrder((prev) =>
            prev === id ? null : id
        );
    };

    return (
        <div className="w-full">

            {/* PAGE TITLE */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Order History
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    View and manage customer orders
                </p>
            </div>

            {/* EMPTY ORDERS */}
            {orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

                    <Package
                        size={40}
                        className="mx-auto mb-3 text-gray-400"
                    />

                    <h3 className="font-semibold text-gray-800">
                        No orders found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Customer orders will appear here.
                    </p>

                </div>
            ) : (
                <div className="space-y-4">

                    {orders.map((order) => {
                        const isOpen =
                            openOrder === order._id;

                        const status =
                            getStatusConfig(
                                order.status
                            );

                        const StatusIcon =
                            status.icon;

                        const totalQuantity =
                            order.CartItem?.reduce(
                                (sum, item) =>
                                    sum +
                                    Number(
                                        item.quantity || 0
                                    ),
                                0
                            ) || 0;

                        return (
                            <div
                                key={order._id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                            >

                                {/* =========================
                                    ORDER HEADER
                                ========================= */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleOrder(
                                            order._id
                                        )
                                    }
                                    className="w-full px-4 py-4 text-left sm:px-5"
                                >

                                    <div className="flex items-center gap-3">

                                        {/* ICON */}
                                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 sm:flex">
                                            <Package
                                                size={20}
                                                className="text-gray-500"
                                            />
                                        </div>

                                        {/* ORDER INFO */}
                                        <div className="min-w-0 flex-1">

                                            <div className="flex flex-wrap items-center gap-2">

                                                <h3 className="font-semibold text-gray-900">
                                                    Order #
                                                    {order._id?.slice(
                                                        -8
                                                    )}
                                                </h3>

                                                <span
                                                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                                                >
                                                    {
                                                        status.label
                                                    }
                                                </span>

                                            </div>

                                            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">

                                                <span className="flex items-center gap-1">
                                                    <CalendarDays
                                                        size={13}
                                                    />

                                                    {formatDate(
                                                        order.createdAt
                                                    )}
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    {
                                                        totalQuantity
                                                    }{" "}
                                                    {totalQuantity ===
                                                        1
                                                        ? "item"
                                                        : "items"}
                                                </span>

                                            </div>

                                        </div>

                                        {/* TOTAL */}
                                        <div className="text-right">

                                            <p className="text-xs text-gray-400">
                                                Total
                                            </p>

                                            <p className="text-lg font-bold text-gray-900">
                                                ₹
                                                {Number(
                                                    order.totalCartValue ||
                                                    0
                                                )}
                                            </p>

                                        </div>

                                        {/* ARROW */}
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">

                                            {isOpen ? (
                                                <ChevronUp
                                                    size={18}
                                                />
                                            ) : (
                                                <ChevronDown
                                                    size={18}
                                                />
                                            )}

                                        </div>

                                    </div>

                                </button>

                                {/* =========================
                                    ORDER DETAILS
                                ========================= */}
                                {isOpen && (
                                    <div className="border-t border-gray-100">

                                        {/* CUSTOMER */}
                                        <div className="grid grid-cols-1 gap-4 bg-gray-50 px-4 py-4 sm:grid-cols-2 sm:px-5">

                                            {/* NAME */}
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                                                    <User
                                                        size={17}
                                                        className="text-gray-500"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Customer
                                                    </p>

                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {order.customerId
                                                            ?.name ||
                                                            "Unknown Customer"}
                                                    </p>
                                                </div>

                                            </div>

                                            {/* EMAIL */}
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                                                    <Mail
                                                        size={17}
                                                        className="text-gray-500"
                                                    />
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="text-xs text-gray-400">
                                                        Email
                                                    </p>

                                                    <p className="truncate text-sm font-medium text-gray-700">
                                                        {order.customerId
                                                            ?.email ||
                                                            "No email"}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        {/* =========================
                                            ITEMS
                                        ========================= */}
                                        <div className="px-4 py-5 sm:px-5">

                                            <div className="mb-3 flex items-center justify-between">

                                                <h4 className="font-bold text-gray-800">
                                                    Order Items
                                                </h4>

                                                <span className="text-xs text-gray-400">
                                                    {
                                                        totalQuantity
                                                    }{" "}
                                                    items
                                                </span>

                                            </div>

                                            <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">

                                                {order.CartItem?.map(
                                                    (item) => {

                                                        const food =
                                                            item.foodId;

                                                        const price =
                                                            Number(
                                                                food?.price ||
                                                                0
                                                            );

                                                        const quantity =
                                                            Number(
                                                                item.quantity ||
                                                                0
                                                            );

                                                        const itemTotal =
                                                            price *
                                                            quantity;

                                                        return (
                                                            <div
                                                                key={
                                                                    item._id
                                                                }
                                                                className="flex items-center gap-3 p-3 sm:p-4"
                                                            >

                                                                {/* IMAGE */}
                                                                {food?.images?.[0] ? (
                                                                    <img
                                                                        src={
                                                                            food
                                                                                .images[0]
                                                                        }
                                                                        alt={
                                                                            food?.name ||
                                                                            "Food"
                                                                        }
                                                                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                                                        No Image
                                                                    </div>
                                                                )}

                                                                {/* FOOD DETAILS */}
                                                                <div className="min-w-0 flex-1">

                                                                    <p className="truncate text-sm font-semibold text-gray-800">
                                                                        {food?.name ||
                                                                            "Unknown Item"}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                        ₹
                                                                        {
                                                                            price
                                                                        }{" "}
                                                                        ×{" "}
                                                                        {
                                                                            quantity
                                                                        }
                                                                    </p>

                                                                </div>

                                                                {/* ITEM TOTAL */}
                                                                <p className="text-sm font-bold text-gray-900">
                                                                    ₹
                                                                    {
                                                                        itemTotal
                                                                    }
                                                                </p>

                                                            </div>
                                                        );
                                                    }
                                                )}

                                            </div>

                                        </div>

                                        {/* =========================
                                            STATUS + TOTAL
                                        ========================= */}
                                        <div className="flex flex-col gap-5 border-t border-gray-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                                            {/* STATUS */}
                                            <div className="flex items-center gap-3">

                                                <StatusIcon
                                                    size={20}
                                                    className="text-gray-600"
                                                />

                                                <div>

                                                    <p className="text-xs text-gray-400">
                                                        Order Status
                                                    </p>

                                                    {onStatusChange ? (
                                                        <select
                                                            value={
                                                                order.status ||
                                                                "pending"
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                onStatusChange(
                                                                    order._id,
                                                                    e
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            onClick={(
                                                                e
                                                            ) =>
                                                                e.stopPropagation()
                                                            }
                                                            className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-orange-500"
                                                        >

                                                            {ORDER_STATUSES.map(
                                                                (
                                                                    statusValue
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            statusValue
                                                                        }
                                                                        value={
                                                                            statusValue
                                                                        }
                                                                    >
                                                                        {
                                                                            getStatusConfig(
                                                                                statusValue
                                                                            )
                                                                                .label
                                                                        }
                                                                    </option>
                                                                )
                                                            )}

                                                        </select>
                                                    ) : (
                                                        <span
                                                            className={`mt-1 inline-block rounded-lg border px-3 py-1.5 text-sm font-medium ${status.className}`}
                                                        >
                                                            {
                                                                status.label
                                                            }
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                            {/* TOTAL */}
                                            <div className="text-left sm:text-right">

                                                <p className="text-xs text-gray-400">
                                                    Total Amount
                                                </p>

                                                <p className="text-2xl font-bold text-orange-500">
                                                    ₹
                                                    {Number(
                                                        order.totalCartValue ||
                                                        0
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                    </div>
                                )}

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
};

export default OrderHistory;