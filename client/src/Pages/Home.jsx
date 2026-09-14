import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-orange-600"
                    >
                        🍴 Foodie
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-6">

                        <Link
                            to="/"
                            className="text-gray-700 hover:text-orange-600 font-medium"
                        >
                            Home
                        </Link>

                        <Link
                            to="/dashboard"
                            className="text-gray-700 hover:text-orange-600 font-medium"
                        >
                            Menu
                        </Link>

                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-orange-600 font-medium"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition"
                        >
                            Sign Up
                        </Link>

                    </div>
                </div>
            </nav>


            {/* Hero Section */}
            <section className="bg-orange-50">
                <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

                    {/* Hero Content */}
                    <div>

                        <p className="text-orange-600 font-semibold text-lg mb-3">
                            🍔 Delicious Food, Delivered Fast
                        </p>

                        <h2 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
                            Your Favorite Food
                            <span className="text-orange-600">
                                {" "}Anytime, Anywhere
                            </span>
                        </h2>

                        <p className="text-gray-600 text-lg mb-8">
                            Discover delicious meals, fresh ingredients and
                            amazing flavors. Order your favorite food and enjoy
                            a wonderful dining experience.
                        </p>

                        <Link
                            to="/dashboard"
                            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                        >
                            Explore Menu 🍽️
                        </Link>

                    </div>


                    {/* Food Image */}
                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                            alt="Delicious food"
                            className="w-full max-w-lg h-96 object-cover rounded-3xl shadow-xl"
                        />
                    </div>

                </div>
            </section>


            {/* Categories */}
            <section className="max-w-7xl mx-auto px-6 py-16">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Explore Our Menu
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Pizza */}
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-4">
                            🍕
                        </div>

                        <h3 className="text-xl font-bold mb-2">
                            Pizza
                        </h3>

                        <p className="text-gray-600">
                            Cheesy, delicious and freshly prepared pizzas.
                        </p>

                    </div>


                    {/* Burger */}
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-4">
                            🍔
                        </div>

                        <h3 className="text-xl font-bold mb-2">
                            Burgers
                        </h3>

                        <p className="text-gray-600">
                            Juicy burgers made with fresh ingredients.
                        </p>

                    </div>


                    {/* Noodles */}
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-4">
                            🍜
                        </div>

                        <h3 className="text-xl font-bold mb-2">
                            Noodles
                        </h3>

                        <p className="text-gray-600">
                            Hot and tasty noodles packed with flavor.
                        </p>

                    </div>

                </div>
            </section>


            {/* ================= FOOTER ================= */}
            <footer className="bg-gray-900 text-white">

                {/* Footer Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-14">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                        {/* Brand */}
                        <div>

                            <div className="flex items-center gap-2 mb-5">

                                <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center text-2xl">
                                    🍴
                                </div>

                                <h2 className="text-2xl font-bold">
                                    Food<span className="text-orange-500">
                                        ie
                                    </span>
                                </h2>

                            </div>

                            <p className="text-gray-400 leading-7">
                                Delicious food made with fresh ingredients
                                and delivered straight to your doorstep.
                            </p>

                        </div>


                        {/* Quick Links */}
                        <div>

                            <h3 className="text-lg font-bold mb-6">
                                Quick Links
                            </h3>

                            <div className="space-y-4">

                                <Link
                                    to="/"
                                    className="block text-gray-400 hover:text-orange-500 transition"
                                >
                                    Home
                                </Link>

                                <Link
                                    to="/dashboard"
                                    className="block text-gray-400 hover:text-orange-500 transition"
                                >
                                    Menu
                                </Link>

                                <Link
                                    to="/about"
                                    className="block text-gray-400 hover:text-orange-500 transition"
                                >
                                    About Us
                                </Link>

                                <Link
                                    to="/contact"
                                    className="block text-gray-400 hover:text-orange-500 transition"
                                >
                                    Contact
                                </Link>

                            </div>

                        </div>


                        {/* Customer */}
                        <div>

                            <h3 className="text-lg font-bold mb-6">
                                Customer
                            </h3>

                            <div className="space-y-4">

                                <Link
                                    to="/account"
                                    className="block text-gray-400 hover:text-orange-500 transition"
                                >
                                    My Account
                                </Link>

                                <Link
                                    to="/orders"
                                    className="block text-gray-400 hover:text-orange-500 transition"
                                >
                                    My Orders
                                </Link>

                                <Link
                                    to="/cart"
                                    className="block text-gray-400 hover:text-orange-500 transition"
                                >
                                    Cart
                                </Link>

                                <Link
                                    to="/support"
                                    className="block text-gray-400 hover:text-orange-500 transition"
                                >
                                    Help & Support
                                </Link>

                            </div>

                        </div>


                        {/* Contact Us */}
                        <div>

                            <h3 className="text-lg font-bold mb-6">
                                Contact Us
                            </h3>

                            <div className="space-y-5">

                                <p className="text-gray-400 flex items-center gap-4">
                                    <span className="text-pink-500 text-lg">
                                        📍
                                    </span>
                                    Rohtak, Haryana, India
                                </p>

                                <p className="text-gray-400 flex items-center gap-4">
                                    <span className="text-pink-500 text-lg">
                                        📞
                                    </span>
                                    +91 98765 43210
                                </p>

                                <p className="text-gray-400 flex items-center gap-4">
                                    <span className="text-pink-500 text-lg">
                                        ✉️
                                    </span>
                                    support@foodie.com
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Footer Bottom */}
                <div className="border-t border-gray-800">

                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

                        <p className="text-gray-400 text-sm">
                            © 2026 Foodie. All Rights Reserved.
                        </p>

                        <div className="flex gap-8">

                            <Link
                                to="/privacy"
                                className="text-gray-400 hover:text-orange-500 text-sm transition"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms"
                                className="text-gray-400 hover:text-orange-500 text-sm transition"
                            >
                                Terms & Conditions
                            </Link>

                        </div>

                    </div>

                </div>

            </footer>

        </div>
    );
}