import { create } from "zustand";
import axios from "../libs/axios";

const OrderStore = create((set, get) => ({
    CartItemData: [],
    cartCount: 0,
    orderData: [],

    addToCart: (food) => {
        set((state) => {
            const existingItem = state.CartItemData.find(
                (item) => item._id === food._id
            );

            // Item already exists
            if (existingItem) {
                return {
                    cartCount: state.cartCount + 1,

                    CartItemData: state.CartItemData.map((item) =>
                        item._id === food._id
                            ? {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                            : item
                    ),
                };
            }

            // New item
            return {
                cartCount: state.cartCount + 1,

                CartItemData: [
                    ...state.CartItemData,
                    {
                        _id: food._id,
                        name: food.name,
                        price: food.price,

                        // Works with both structures
                        image:
                            food.image ||
                            food.images?.[0] ||
                            "",

                        quantity: 1,
                    },
                ],
            };
        });
    },

    removeToCart: (id) => {
        set((state) => {
            const existingItem = state.CartItemData.find(
                (item) => item._id === id
            );

            if (!existingItem) {
                return state;
            }

            // If only one item exists,
            // remove it completely
            if (existingItem.quantity <= 1) {
                return {
                    CartItemData: state.CartItemData.filter(
                        (item) => item._id !== id
                    ),

                    cartCount: Math.max(
                        0,
                        state.cartCount - 1
                    ),
                };
            }

            // Otherwise decrease quantity
            return {
                CartItemData: state.CartItemData.map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                ),

                cartCount: Math.max(
                    0,
                    state.cartCount - 1
                ),
            };
        });
    },

    removeItemFromCart: (id) => {
        set((state) => {
            const existingItem = state.CartItemData.find(
                (item) => item._id === id
            );

            if (!existingItem) {
                return state;
            }

            return {
                CartItemData: state.CartItemData.filter(
                    (item) => item._id !== id
                ),

                cartCount: Math.max(
                    0,
                    state.cartCount -
                    existingItem.quantity
                ),
            };
        });
    },

    clearCart: () => {
        set({
            CartItemData: [],
            cartCount: 0,
        });
    },

    CreateOrder: async () => {
        try {
            const cartItem = get().CartItemData;

            if (cartItem.length === 0) {
                alert("Your cart is empty");
                return;
            }

            const { data } = await axios.post(
                "/order/create",
                {
                    cartItem: cartItem,
                }
            );

            console.log(
                "Create Order Response:",
                data
            );

            if (data.success) {
                alert(
                    "Order created successfully!"
                );

                set({
                    CartItemData: [],
                    cartCount: 0,
                });
            } else {
                alert(
                    data.message ||
                    "Order could not be created"
                );
            }
        } catch (error) {
            console.log(
                "Create Order Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to create order"
            );
        }
    },

    // =========================
    // FETCH USER ORDERS
    // =========================
    fetchUserOrder: async () => {
        try {
            const { data } = await axios.get(
                "/order/getAllOrderUser"
            );

            console.log(
                "User Orders:",
                data
            );

            if (data.success) {
                set({
                    orderData:
                        data.orderData || [],
                });
            } else {
                console.log(
                    data.message ||
                    "Unable to fetch orders"
                );
            }
        } catch (error) {
            console.log(
                "Fetch User Order Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to fetch orders"
            );
        }
    },

    // =========================
    // FETCH ADMIN ORDERS
    // =========================
    fetchAdminOrder: async () => {
        try {
            const { data } = await axios.get(
                "/order/getAllOrderAdmin"
            );

            console.log(
                "Admin Orders:",
                data
            );

            if (data.success) {
                set({
                    orderData:
                        data.orderData || [],
                });
            } else {
                console.log(
                    data.message ||
                    "Unable to fetch admin orders"
                );
            }
        } catch (error) {
            console.log(
                "Fetch Admin Order Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to fetch admin orders"
            );
        }
    },

    // =========================
    // CHANGE ORDER STATUS
    // =========================
    OrderStatusChange: async (
        orderid,
        OrderStatus
    ) => {
        try {
            const { data } = await axios.post(
                `/order/changeStatus/${orderid}`,
                {
                    status: OrderStatus,
                }
            );

            console.log(
                "Status Change Response:",
                data
            );

            if (data.success) {
                alert(
                    data.message ||
                    "Order status updated"
                );

                await get().fetchAdminOrder();
            } else {
                alert(
                    data.message ||
                    "Unable to change order status"
                );
            }
        } catch (error) {
            console.log(
                "Order Status Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to change order status"
            );
        }
    },
}));

export default OrderStore;