import { verifyToken } from "../libs/token.js";
import OrderModel from "../models/order.model.js";

export const CreateOrder = async (req, res) => {

    try {

        const {
            cartItem,
            deliveryFee = 40,
        } = req.body;

        const { jwt } = req.cookies;

        if (!jwt) {

            return res.status(401).json({
                message: "You are not logged in",
                success: false,
            });

        }

        if (
            !Array.isArray(cartItem) ||
            cartItem.length === 0
        ) {

            return res.status(400).json({
                message: "Cart is empty",
                success: false,
            });

        }

        const subtotal = cartItem.reduce(
            (total, item) =>
                total +
                Number(item.price) *
                Number(item.quantity),
            0
        );

        const totalCartValue =
            subtotal + Number(deliveryFee);

        const CartItem = cartItem.map((item) => {

            return {
                foodId: item._id,
                quantity: Number(item.quantity),
            };

        });

        const userData = await verifyToken(jwt);

        console.log(
            "User Data:",
            userData
        );

        const newOrder = new OrderModel({

            totalCartValue,

            customerId: userData.id,

            CartItem,

            status: "pending",

        });


        await newOrder.save();

        return res.status(201).json({

            message: "Order Created Successfully",

            orderDetails: newOrder,

            success: true,

        });

    } catch (error) {

        console.log(
            "Found Error at Order Creation:",
            error.message
        );

        return res.status(500).json({

            message:
                error.message ||
                "Error at Server",

            success: false,

        });

    }
};

export const GetAllOrderAdmin = async (req, res) => {

    try {

        const orderData = await OrderModel
            .find()
            .populate("customerId", "name email")
            .populate("CartItem.foodId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orderData
        });

    } catch (error) {

        console.log(
            "Get All Orders Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch orders"
        });
    }
};

export const UpdateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const statuses = [
            "pending",
            "preparing",
            "outOfDelivery",
            "delivered",
            "cancelled",
        ];


        if (!statuses.includes(status)) {

            return res.status(400).json({

                message: "Invalid order status",
                success: false,

            });

        }


        const updateOrder =
            await OrderModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );


        if (!updateOrder) {

            return res.status(404).json({

                message: "Order not found",
                success: false,

            });

        }


        return res.status(200).json({

            message: "Order Status Updated",

            success: true,

            updatedOrder: updateOrder,

        });

    } catch (error) {

        console.log(
            "Found Error at Order Status Update:",
            error.message
        );

        return res.status(500).json({

            message: "Error at Server",
            success: false,

        });

    }
};

export const GetUserOrder = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login"
            });
        }

        const decoded = await verifyToken(token);

        const orderData = await OrderModel
            .find({
                customerId: decoded.id
            })
            .populate("CartItem.foodId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orderData
        });

    } catch (error) {
        console.log("Get User Orders Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};