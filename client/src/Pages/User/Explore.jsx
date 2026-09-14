import { useEffect } from "react";
import FoodStore from "../../store/FoodStore.js";
import FoodCard from "../../Components/FoodCard.jsx";
import Header from "../../Components/Header.jsx";
import Footer from "../../Components/Footer.jsx";
import OrderStore from "../../store/OrderStore.js";

const Explore = () => {
    const { foodData, getAllFood } = FoodStore();
    const { addToCart } = OrderStore();

    useEffect(() => {
        getAllFood();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Main Content */}
            <main className="flex-1 w-full">

                <div className="max-w-7xl mx-auto px-6 py-12">

                    {/* Page Heading */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Explore Food Menu
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Discover delicious food and choose your favorite meal.
                        </p>
                    </div>

                    {/* Food Cards */}
                    {foodData && foodData.length > 0 ? (
                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            gap-8
                        ">
                            {foodData.map((food) => (
                                <FoodCard
                                    onClick={() => {
                                        addToCart(food)
                                    }}
                                    key={food._id}
                                    food={food}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">
                                No food available at the moment.
                            </p>
                        </div>
                    )}

                </div>

            </main>

        </div>
    );
};

export default Explore;