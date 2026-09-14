import { create } from "zustand";
import axiosClient from "../libs/axios";

const AuthStore = create((set, get) => ({
    userData: null,
    isAdmin: null,

    SignUpApi: async (data) => {
        try {
            const res = await axiosClient.post("/auth/register", data);

            console.log("Signup response:", res.data);

            set({
                userData: res.data.user,
                isAdmin: res.data.user.role,
            });

            return res.data;

        } catch (err) {
            console.log("Signup error:", err.response?.data);

            return {
                success: false,
                message: err.response?.data?.message || "Server Error",
            };
        }
    },

    LoginApi: async (data) => {
        try {
            const res = await axiosClient.post("/auth/login", data);
            set({ userData: res.data.user })
            set({ isAdmin: res.data.user.role })
            return res.data;
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Server Error",
            };
        }
    },

    checkAuthApi: async () => {
        try {
            const { data } = await axiosClient.get("/auth/check");
            console.log(data);
            set({ userData: data.token.id })
            set({ isAdmin: data.token.role })
            // window.location.href = "/dashboard"
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Server Error",
            };
        }
    },

    logoutApi: async () => {
        try {
            let { data } = await axiosClient("/auth/logout");
            console.log(data);

            if (data.success) {
                alert("Logout Successfully");
                window.location.replace("/");
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Server Error",
            };
        }
    }

}));

export default AuthStore;