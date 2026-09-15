import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        CartItem: [
            {
                foodId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],

        totalCartValue: {
            type: Number,
            required: true
        },

        deliveryFee: {
            type: Number,
            default: 40
        },

        status: {
            type: String,
            enum: [
                "pending",
                "preparing",
                "outOfDelivery",
                "delivered",
                "cancelled"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const OrderModel =
    mongoose.models.Order ||
    mongoose.model("Order", OrderSchema);

export default OrderModel;