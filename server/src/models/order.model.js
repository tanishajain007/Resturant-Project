import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        totalCartValue: {
            type: Number,
            required: true,
        },

        CartItem: [
            {
                foodId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "food",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],

        status: {
            type: String,

            enum: {
                values: [
                    "pending",
                    "preparing",
                    "outOfDelivery",
                    "delivered",
                    "cancelled",
                ],

                message: "{VALUE} is not supported",
            },

            default: "pending",
            required: true,
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },

    {
        timestamps: true,
    }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;