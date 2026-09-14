import { create } from "zustand";
import axios from "../libs/axios";

const FoodStore = create((set) => ({
    foodData: [],

    getAllFood: async () => {
        try {
            const { data } = await axios.get("/food/getAllFood");

            console.log("GET ALL FOOD:", data);

            set({
                foodData: data.data || [],
            });

            return data;

        } catch (error) {
            console.error(
                "GET ALL FOOD ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    },

    getOnefood: async (id) => {
        try {
            console.log("GET FOOD ID:", id);

            const { data } = await axios.get(
                `/food/getOneFood/${id}`
            );

            console.log("GET ONE FOOD RESPONSE:", data);

            if (data.success) {
                return data.data;
            }

            return null;

        } catch (error) {
            console.error(
                "GET ONE FOOD ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    },

    createFoodMenu: async (foodData) => {
        try {
            const { data } = await axios.post(
                "/food/create",
                foodData
            );

            console.log("CREATE FOOD RESPONSE:", data);

            if (data.success) {
                alert("Food menu created successfully!");
            }

            return data;

        } catch (error) {
            console.error(
                "CREATE FOOD ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    },

    updateFoodMenu: async (foodData) => {
        try {
            const updatedData = {
                name: foodData.name,
                discription: foodData.discription,
                category: foodData.category,
                price: foodData.price,
                isavailable: foodData.isavailable,
            };

            console.log("UPDATE ID:", foodData.id);
            console.log("UPDATE DATA:", updatedData);

            const { data } = await axios.post(
                `/food/updateFoodData/${foodData.id}`,
                updatedData
            );

            console.log("UPDATE RESPONSE:", data);

            if (data.success) {
                alert("Food menu updated successfully!");
            }

            return data;

        } catch (error) {
            console.error(
                "UPDATE FOOD ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    },

    deleteFoodMenu: async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Do you want to Delete this Menu item?"
            );

            if (!confirmDelete) {
                return null;
            }

            const { data } = await axios.delete(
                `/food/deleteOne/${id}`
            );

            console.log("DELETE RESPONSE:", data);

            if (data.success) {
                alert(data.message);
            }

            return data;

        } catch (error) {
            console.error(
                "DELETE ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    },
}));

export default FoodStore;