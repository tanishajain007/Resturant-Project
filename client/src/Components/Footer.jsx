const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">


                    {/* Brand */}
                    <div>

                        <div className="flex items-center gap-2 mb-4">

                            <div className="w-10 h-10 bg-orange-500 rounded-xl 
                                flex items-center justify-center text-xl">
                                🍴
                            </div>

                            <h2 className="text-2xl font-bold">
                                Food<span className="text-orange-500">ie</span>
                            </h2>

                        </div>

                        <p className="text-gray-400 leading-6">
                            Delicious food made with fresh ingredients and
                            delivered straight to your doorstep.
                        </p>

                    </div>


                    {/* Quick Links */}
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>

                        <div className="space-y-3 text-gray-400">

                            <button className="block hover:text-orange-500 transition">
                                Home
                            </button>

                            <button className="block hover:text-orange-500 transition">
                                Menu
                            </button>

                            <button className="block hover:text-orange-500 transition">
                                About Us
                            </button>

                            <button className="block hover:text-orange-500 transition">
                                Contact
                            </button>

                        </div>

                    </div>


                    {/* Customer */}
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Customer
                        </h3>

                        <div className="space-y-3 text-gray-400">

                            <button className="block hover:text-orange-500 transition">
                                My Account
                            </button>

                            <button className="block hover:text-orange-500 transition">
                                My Orders
                            </button>

                            <button className="block hover:text-orange-500 transition">
                                Cart
                            </button>

                            <button className="block hover:text-orange-500 transition">
                                Help & Support
                            </button>

                        </div>

                    </div>


                    {/* Contact */}
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Contact Us
                        </h3>

                        <div className="space-y-4 text-gray-400">

                            <p className="flex gap-3">
                                <span>📍</span>
                                <span>Rohtak, Haryana, India</span>
                            </p>

                            <p className="flex gap-3">
                                <span>📞</span>
                                <span>+91 98765 43210</span>
                            </p>

                            <p className="flex gap-3">
                                <span>✉️</span>
                                <span>support@foodie.com</span>
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Bottom Footer */}
            <div className="border-t border-gray-800">

                <div className="max-w-7xl mx-auto px-6 py-5">

                    <div className="flex flex-col md:flex-row 
                        justify-between items-center gap-3">

                        <p className="text-gray-400 text-sm">
                            © 2026 Foodie. All Rights Reserved.
                        </p>


                        <div className="flex gap-5 text-gray-400">

                            <button className="hover:text-orange-500 transition">
                                Privacy Policy
                            </button>

                            <button className="hover:text-orange-500 transition">
                                Terms & Conditions
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;