import { create } from "zustand";
import axiosClient from "../libs/axios";

const demo = create((set, get) => ({
    name: "Tanisha",
    age: 19,
    updateName: (newName) => set({ name: newName }),
    callApi: async () => {
        const value = await axiosClient.get("/");
        console.log(value);
    }
}))

export default demo