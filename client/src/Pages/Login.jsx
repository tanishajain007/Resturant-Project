import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthStore from "../store/AuthStore";

export default function Login() {
    const navigate = useNavigate();
    const { LoginApi } = AuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await LoginApi(formData);

        setMessage(result.message);

        if (result.success) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white w-[430px] p-8 rounded-xl shadow-lg">

                <h1 className="text-4xl text-center font-bold text-blue-600 mb-6">
                    Login
                </h1>

                {message && (
                    <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4 text-center">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-5">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="text-blue-600 font-semibold ml-2"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}