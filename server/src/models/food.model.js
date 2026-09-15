import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    price: {
        type: Number,
        required: true,
        default: 0,
    },

    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 200,
    },

    category: {
        type: String,
        default: "all",
        enum: {
            values: [
                "all",
                "breakfast",
                "lunch",
                "dinner",
                "snacks",
                "dessert",
                "beverages"
            ],
            message: "{VALUE} is not supported",
        },
    },

    discription: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 500,
    },

    images: {
        type: [String],
    },

    isavailable: {
        type: Boolean,
        default: false,
    },

});

const Food =
    mongoose.models.Food ||
    mongoose.model("Food", foodSchema);

export default Food;