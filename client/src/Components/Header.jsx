import { Link } from "react-router-dom";
import AuthStore from "../store/AuthStore.js";
import OrderStore from "../store/OrderStore.js";

const Header = () => {

    const { logoutApi, isAdmin } = AuthStore();
    const { cartCount } = OrderStore();

    if (isAdmin == "admin") {
        return (
            <header className="bg-white shadow-md sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-6 py-4">

                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2"
                        >

                            <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-2xl shadow">
                                🍴
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Food<span className="text-orange-500">ie</span>
                                </h1>

                                <p className="text-xs text-gray-500">
                                    Delicious food, delivered with love
                                </p>
                            </div>

                        </Link>


                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-8">

                            <Link
                                to="/admin/order-history"
                                className="text-gray-700 font-medium hover:text-orange-500 transition"
                            >
                                Order
                            </Link>

                            <Link
                                to="/admin/explore"
                                className="text-gray-700 font-medium hover:text-orange-500 transition"
                            >
                                See All Menu
                            </Link>

                            <Link
                                to="/admin/create-menu"
                                className="text-gray-700 font-medium hover:text-orange-500 transition"
                            >
                                Create Menu
                            </Link>

                        </nav>


                        {/* Right Side */}
                        <div className="flex items-center gap-4">

                            {/* Logout */}
                            <button
                                onClick={logoutApi}
                                className="hidden sm:block px-5 py-2 rounded-lg
                            bg-red-500 text-white font-semibold
                            hover:bg-red-600 transition shadow-sm"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </header>
        );
    } else {
        return (
            <header className="bg-white shadow-md sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-6 py-4">

                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2"
                        >

                            <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-2xl shadow">
                                🍴
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Food<span className="text-orange-500">ie</span>
                                </h1>

                                <p className="text-xs text-gray-500">
                                    Delicious food, delivered with love
                                </p>
                            </div>

                        </Link>


                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-8">

                            <Link
                                to="/"
                                className="text-gray-700 font-medium hover:text-orange-500 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/dashboard"
                                className="text-gray-700 font-medium hover:text-orange-500 transition"
                            >
                                Menu
                            </Link>

                            <Link
                                to="/dashboard/order-history"
                                className="text-gray-700 font-medium hover:text-orange-500 transition"
                            >
                                Order History
                            </Link>

                        </nav>


                        {/* Right Side */}
                        <div className="flex items-center gap-4">

                            {/* Cart */}
                            <Link
                                to="/dashboard/cart"
                                className="relative w-11 h-11 rounded-xl bg-orange-50 text-orange-600
                            flex items-center justify-center text-xl
                            hover:bg-orange-100 transition"
                            >

                                🛒

                                <span
                                    className="absolute -top-1 -right-1 bg-orange-500 text-white
                                text-xs w-5 h-5 rounded-full flex items-center justify-center"
                                >
                                    {cartCount}
                                </span>

                            </Link>


                            {/* Logout */}
                            <button
                                onClick={logoutApi}
                                className="hidden sm:block px-5 py-2 rounded-lg
                            bg-red-500 text-white font-semibold
                            hover:bg-red-600 transition shadow-sm"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </header>
        );
    }
};

export default Header;