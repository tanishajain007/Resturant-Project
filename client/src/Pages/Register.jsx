import { useState } from "react";
import { Link } from "react-router-dom";
import AuthStore from "../store/AuthStore";

export default function Register() {
    const { SignUpApi } = AuthStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState({
        text: "",
        type: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await SignUpApi(formData);
        

            if (result.success) {
                setMessage({
                    text: "🎉 Account created successfully!",
                    type: "success",
                });

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                });
            } else {
                setMessage({
                    text: result.message || "❌ Signup failed. Please try again.",
                    type: "error",
                });
            }
        } catch (error) {
            console.error(error);

            setMessage({
                text: "❌ Something went wrong!",
                type: "error",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

                <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
                    Sign Up
                </h2>

                {message.text && (
                    <div
                        className={`mb-4 p-3 rounded-lg text-center font-medium ${
                            message.type === "success"
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-5 text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="ml-2 text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}